// WebRTC Screen Sharing Module
// Handles peer-to-peer screen sharing using Firebase Firestore for signaling

export class ScreenShareManager {
    constructor(firebaseServices, classCode, userId, isPresenter) {
        this.db = firebaseServices.db;
        this.doc = firebaseServices.doc;
        this.getDoc = firebaseServices.getDoc;
        this.updateDoc = firebaseServices.updateDoc;
        this.onSnapshot = firebaseServices.onSnapshot;
        this.CLASS_COLLECTION_PATH = firebaseServices.CLASS_COLLECTION_PATH;
        
        this.classCode = classCode;
        this.userId = userId;
        this.isPresenter = isPresenter;

        this.classData = null;
        
        this.localStream = null;
        
        // PERBAIKAN: Presenter menggunakan Map untuk menyimpan peer connection per participant
        // Participant tetap menggunakan satu peer connection
        if (isPresenter) {
            this.peerConnections = {}; // { [participantId]: RTCPeerConnection }
        } else {
            this.peerConnection = null; // Participant hanya punya satu connection ke presenter
        }
        
        this.signalingUnsubscribe = null;
        
        // WebRTC configuration with public STUN servers
        this.rtcConfig = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' },
                { urls: 'stun:stun2.l.google.com:19302' },

                // --- TURN SERVER (UDP) ---
                {
                    urls: 'turn:relay1.expressturn.com:3480?transport=udp',
                    username: '00000002079503648', 
                    credential: 'R0TBdLBNcsSyrioMyVk5bJebG16I=' 
                },
                
                // --- TURN SERVER (TCP) ---
                {
                    urls: 'turn:relay1.expressturn.com:3480?transport=tcp',
                    username: '00000002079503648', 
                    credential: 'R0TBdLBNcsSyrioMyVk5bJebG16I=' 
                }
            ]
        };
    }

    updateClassData(data) {
        this.classData = data;
    }

    // Presenter: Start screen sharing
    async startScreenShare() {
        if (!this.isPresenter) {
            throw new Error("Only presenter can start screen sharing");
        }

        try {
            // Capture screen
            this.localStream = await navigator.mediaDevices.getDisplayMedia({
                video: { 
                    cursor: "always",
                    displaySurface: "monitor"
                },
                audio: false
            });

            // Get list of online participants (excluding presenter)
            const onlineParticipants = this.classData.participantList.filter(
                p => !p.isPresenter && p.isOnline
            );

            console.log(`Creating peer connections for ${onlineParticipants.length} participants`);

            // Create peer connection for each participant
            for (const participant of onlineParticipants) {
                await this.createPeerConnectionForParticipant(participant.id);
            }

            // Store offer in Firestore
            const docRef = this.doc(this.db, this.CLASS_COLLECTION_PATH, this.classCode);
            
            await this.updateDoc(docRef, {
                'sessionState.screenShareActive': true,
                'sessionState.screenShareOffer': {
                    type: 'offer',
                    sdp: 'placeholder' // Will be replaced by actual offers per participant
                },
                'sessionState.screenShareIceCandidates': {
                    presenter: [],
                    participants: {}
                }
            });

            // Listen for answers from participants
            this.startSignalingListener();

            // Handle stream end
            this.localStream.getVideoTracks()[0].onended = () => {
                this.stopScreenShare();
            };

            return this.localStream;

        } catch (error) {
            console.error("Error starting screen share:", error);
            throw error;
        }
    }

    // FUNGSI BARU: Presenter membuat peer connection untuk satu participant
    async createPeerConnectionForParticipant(participantId) {
        console.log(`Creating peer connection for participant: ${participantId}`);
        
        // Create new peer connection
        const pc = new RTCPeerConnection(this.rtcConfig);
        
        // Add tracks to peer connection
        this.localStream.getTracks().forEach(track => {
            pc.addTrack(track, this.localStream);
        });

        // Handle ICE candidates
        pc.onicecandidate = async (event) => {
            if (event.candidate) {
                await this.addIceCandidate('presenter', event.candidate, participantId);
            }
        };

        // Handle connection state changes
        pc.onconnectionstatechange = () => {
            console.log(`Connection state for ${participantId}: ${pc.connectionState}`);
        };

        // Create offer
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        // Store peer connection
        this.peerConnections[participantId] = pc;

        // Store offer in Firestore for this specific participant
        const docRef = this.doc(this.db, this.CLASS_COLLECTION_PATH, this.classCode);
        await this.updateDoc(docRef, {
            [`sessionState.screenShareOffers.${participantId}`]: {
                type: offer.type,
                sdp: offer.sdp
            }
        });

        console.log(`Offer created and stored for participant: ${participantId}`);
    }

    // Presenter: Stop screen sharing
    async stopScreenShare() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }

        // Close all peer connections for presenter
        if (this.isPresenter && this.peerConnections) {
            Object.values(this.peerConnections).forEach(pc => {
                if (pc) pc.close();
            });
            this.peerConnections = {};
        }

        if (this.signalingUnsubscribe) {
            this.signalingUnsubscribe();
            this.signalingUnsubscribe = null;
        }

        // Clear Firestore signaling data
        const docRef = this.doc(this.db, this.CLASS_COLLECTION_PATH, this.classCode);
        await this.updateDoc(docRef, {
            'sessionState.screenShareActive': false,
            'sessionState.screenShareOffer': null,
            'sessionState.screenShareOffers': null,
            'sessionState.screenShareAnswers': null,
            'sessionState.screenShareIceCandidates': null
        });
    }

    // Participant: Join screen share
    async joinScreenShare(participantId) {
        if (this.isPresenter) {
            return; // Presenter doesn't need to join
        }

        try {
            // Get offer for this specific participant
            const docRef = this.doc(this.db, this.CLASS_COLLECTION_PATH, this.classCode);
            const docSnap = await this.getDoc(docRef);
            const data = docSnap.data();
            
            const offer = data?.sessionState?.screenShareOffers?.[this.userId];
            
            if (!offer) {
                console.log("No offer available yet for this participant");
                return;
            }

            // Create peer connection
            this.peerConnection = new RTCPeerConnection(this.rtcConfig);

            // Handle incoming tracks
            this.peerConnection.ontrack = (event) => {
                console.log("Received remote track");
                if (event.streams && event.streams[0]) {
                    this.onRemoteStream(event.streams[0]);
                }
            };

            // Handle ICE candidates
            this.peerConnection.onicecandidate = async (event) => {
                if (event.candidate) {
                    await this.addIceCandidate(this.userId, event.candidate);
                }
            };

            // Handle connection state changes
            this.peerConnection.onconnectionstatechange = () => {
                console.log(`Participant connection state: ${this.peerConnection.connectionState}`);
            };

            // Set remote description (offer)
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

            // Create answer
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);

            // Send answer to Firestore
            await this.updateDoc(docRef, {
                [`sessionState.screenShareAnswers.${this.userId}`]: {
                    type: answer.type,
                    sdp: answer.sdp
                }
            });

            console.log("Answer sent to presenter");

            // Listen for ICE candidates from presenter
            this.startSignalingListener();

        } catch (error) {
            console.error("Error joining screen share:", error);
            throw error;
        }
    }

    // Leave screen share (for participants)
    async leaveScreenShare() {
        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }

        if (this.signalingUnsubscribe) {
            this.signalingUnsubscribe();
            this.signalingUnsubscribe = null;
        }
    }

    // Add ICE candidate to Firestore
    async addIceCandidate(source, candidate, targetParticipantId = null) {
        try {
            const docRef = this.doc(this.db, this.CLASS_COLLECTION_PATH, this.classCode);
            
            // Get current candidates
            const docSnap = await this.getDoc(docRef);
            const data = docSnap.data();
            const iceCandidates = data?.sessionState?.screenShareIceCandidates || { presenter: {}, participants: {} };

            if (source === 'presenter') {
                // Presenter mengirim ICE candidate ke participant tertentu
                if (!iceCandidates.presenter[targetParticipantId]) {
                    iceCandidates.presenter[targetParticipantId] = [];
                }
                iceCandidates.presenter[targetParticipantId].push({
                    candidate: candidate.candidate,
                    sdpMLineIndex: candidate.sdpMLineIndex,
                    sdpMid: candidate.sdpMid
                });
            } else {
                // Participant mengirim ICE candidate ke presenter
                if (!iceCandidates.participants[source]) {
                    iceCandidates.participants[source] = [];
                }
                iceCandidates.participants[source].push({
                    candidate: candidate.candidate,
                    sdpMLineIndex: candidate.sdpMLineIndex,
                    sdpMid: candidate.sdpMid
                });
            }

            await this.updateDoc(docRef, {
                'sessionState.screenShareIceCandidates': iceCandidates
            });
        } catch (error) {
            console.error("Error adding ICE candidate:", error);
        }
    }

    // Listen for signaling updates
    startSignalingListener() {
        const docRef = this.doc(this.db, this.CLASS_COLLECTION_PATH, this.classCode);
        
        let lastProcessedCandidates = { presenter: {}, participants: {} };

        this.signalingUnsubscribe = this.onSnapshot(docRef, async (docSnap) => {
            if (!docSnap.exists()) return;

            const data = docSnap.data();
            const sessionState = data.sessionState;

            if (this.isPresenter) {
                // Presenter: Process answers from participants
                const answers = sessionState.screenShareAnswers || {};
                
                for (const [participantId, answer] of Object.entries(answers)) {
                    const pc = this.peerConnections[participantId];
                    
                    if (!pc) {
                        // Participant baru bergabung, buat peer connection
                        console.log(`New participant detected: ${participantId}, creating connection`);
                        await this.createPeerConnectionForParticipant(participantId);
                        continue;
                    }
                    
                    if (answer && pc.remoteDescription === null) {
                        try {
                            await pc.setRemoteDescription(new RTCSessionDescription(answer));
                            console.log(`Set remote description from participant ${participantId}`);
                        } catch (error) {
                            console.error(`Error setting remote description for ${participantId}:`, error);
                        }
                    }
                }

                // Process ICE candidates from participants
                const iceCandidates = sessionState.screenShareIceCandidates?.participants || {};
                for (const [participantId, candidates] of Object.entries(iceCandidates)) {
                    const pc = this.peerConnections[participantId];
                    if (!pc) continue;
                    
                    const lastProcessed = lastProcessedCandidates.participants[participantId] || 0;
                    const newCandidates = candidates.slice(lastProcessed);
                    
                    for (const candidateData of newCandidates) {
                        try {
                            await pc.addIceCandidate(new RTCIceCandidate(candidateData));
                        } catch (error) {
                            console.error(`Error adding ICE candidate for ${participantId}:`, error);
                        }
                    }
                    lastProcessedCandidates.participants[participantId] = candidates.length;
                }

            } else {
                // Participant: Check if offer is available
                const offers = sessionState.screenShareOffers || {};
                const myOffer = offers[this.userId];
                
                if (myOffer && !this.peerConnection) {
                    // Offer tersedia, join screen share
                    await this.joinScreenShare(this.userId);
                }
                
                if (!this.peerConnection) return;
                
                // Process ICE candidates from presenter for this participant
                const presenterCandidates = sessionState.screenShareIceCandidates?.presenter?.[this.userId] || [];
                const lastProcessed = lastProcessedCandidates.presenter[this.userId] || 0;
                const newCandidates = presenterCandidates.slice(lastProcessed);

                for (const candidateData of newCandidates) {
                    try {
                        if (this.peerConnection.remoteDescription) {
                            await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidateData));
                        }
                    } catch (error) {
                        console.error("Error adding ICE candidate:", error);
                    }
                }
                lastProcessedCandidates.presenter[this.userId] = presenterCandidates.length;
            }
        });
    }

    // Callback for when remote stream is received (to be set by app)
    onRemoteStream(stream) {
        console.log("Remote stream received, callback not set");
    }
}