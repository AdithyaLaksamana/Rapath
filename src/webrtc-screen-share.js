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
        this.peerConnection = null;
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

            // Create peer connection
            this.peerConnection = new RTCPeerConnection(this.rtcConfig);

            // Add tracks to peer connection
            this.localStream.getTracks().forEach(track => {
                this.peerConnection.addTrack(track, this.localStream);
            });

            // Handle ICE candidates
            this.peerConnection.onicecandidate = async (event) => {
                if (event.candidate) {
                    await this.addIceCandidate('presenter', event.candidate);
                }
            };

            // Create offer
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);

            // Store offer in Firestore
            const docRef = this.doc(this.db, this.CLASS_COLLECTION_PATH, this.classCode);
            
            await this.updateDoc(docRef, {
                'sessionState.screenShareActive': true,
                'sessionState.screenShareOffer': {
                    type: offer.type,
                    sdp: offer.sdp
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

    // Presenter: Stop screen sharing
    async stopScreenShare() {
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }

        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
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
            'sessionState.screenShareIceCandidates': null
        });
    }

    // Participant: Join screen share
    async joinScreenShare(offer) {
        if (this.isPresenter) {
            return; // Presenter doesn't need to join
        }

        try {
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

            // Set remote description (offer)
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

            // Create answer
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);

            // Send answer to Firestore
            const docRef = this.doc(this.db, this.CLASS_COLLECTION_PATH, this.classCode);
            await this.updateDoc(docRef, {
                [`sessionState.screenShareAnswers.${this.userId}`]: {
                    type: answer.type,
                    sdp: answer.sdp
                }
            });

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
    async addIceCandidate(source, candidate) {
        try {
            const docRef = this.doc(this.db, this.CLASS_COLLECTION_PATH, this.classCode);
            
            // Get current candidates
            const docSnap = await this.getDoc(docRef);
            const data = docSnap.data();
            const iceCandidates = data?.sessionState?.screenShareIceCandidates || { presenter: [], participants: {} };

            if (source === 'presenter') {
                iceCandidates.presenter.push({
                    candidate: candidate.candidate,
                    sdpMLineIndex: candidate.sdpMLineIndex,
                    sdpMid: candidate.sdpMid
                });
            } else {
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
        
        let lastProcessedCandidates = { presenter: 0, participants: {} };

        this.signalingUnsubscribe = this.onSnapshot(docRef, async (docSnap) => {
            if (!docSnap.exists() || !this.peerConnection) return;

            const data = docSnap.data();
            const sessionState = data.sessionState;

            if (this.isPresenter) {
                // Presenter: Process answers from participants
                const answers = sessionState.screenShareAnswers || {};
                
                for (const [participantId, answer] of Object.entries(answers)) {
                    if (answer && this.peerConnection.remoteDescription === null) {
                        try {
                            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
                            console.log(`Set remote description from participant ${participantId}`);
                        } catch (error) {
                            console.error("Error setting remote description:", error);
                        }
                    }
                }

                // Process ICE candidates from participants
                const iceCandidates = sessionState.screenShareIceCandidates?.participants || {};
                for (const [participantId, candidates] of Object.entries(iceCandidates)) {
                    const lastProcessed = lastProcessedCandidates.participants[participantId] || 0;
                    const newCandidates = candidates.slice(lastProcessed);
                    
                    for (const candidateData of newCandidates) {
                        try {
                            await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidateData));
                        } catch (error) {
                            console.error("Error adding ICE candidate:", error);
                        }
                    }
                    lastProcessedCandidates.participants[participantId] = candidates.length;
                }

            } else {
                // Participant: Process ICE candidates from presenter
                const presenterCandidates = sessionState.screenShareIceCandidates?.presenter || [];
                const lastProcessed = lastProcessedCandidates.presenter || 0;
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
                lastProcessedCandidates.presenter = presenterCandidates.length;
            }
        });
    }

    // Callback for when remote stream is received (to be set by app)
    onRemoteStream(stream) {
        console.log("Remote stream received, callback not set");
    }
}