import { ScreenShareManager } from './webrtc-screen-share.js';

let screenShareManager = null;

export function startApp(firebaseServices) {
        
    const {
        db, auth, doc, getDoc, setDoc, updateDoc, collection, arrayUnion, serverTimestamp, onSnapshot,
        CLASS_COLLECTION_PATH
    } = firebaseServices;

    // --- FUNGSI MODAL KUSTOM (PENGGANTI ALERT/CONFIRM) ---
    
    const modalBackdrop = document.getElementById('custom-modal-backdrop');
    const modalBox = document.getElementById('custom-modal-box');
    const modalTitle = document.getElementById('custom-modal-title');
    const modalMessage = document.getElementById('custom-modal-message');
    const modalButtons = document.getElementById('custom-modal-buttons');
    const modalCancelBtn = document.getElementById('custom-modal-cancel-btn');
    const modalConfirmBtn = document.getElementById('custom-modal-confirm-btn');

    let onConfirmCallback = null;

    function showCustomAlert(message, title = "Pemberitahuan") {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modalCancelBtn.classList.add('hidden');
        modalConfirmBtn.textContent = 'OK';
        modalConfirmBtn.className = 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-all';
        modalBackdrop.classList.remove('hidden');
        onConfirmCallback = null;
    }

    function showCustomConfirm(message, title, callback, confirmText = "OK", confirmBgColor = "bg-blue-600") {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modalCancelBtn.classList.remove('hidden');
        modalConfirmBtn.textContent = confirmText;
        modalConfirmBtn.className = `${confirmBgColor} hover:opacity-90 text-white font-bold py-2 px-5 rounded-lg transition-all`;
        modalBackdrop.classList.remove('hidden');
        onConfirmCallback = callback;
    }

    function closeModal() {
        modalBackdrop.classList.add('hidden');
    }

    modalConfirmBtn.addEventListener('click', () => {
        if (onConfirmCallback) {
            onConfirmCallback();
        }
        closeModal();
    });
    modalCancelBtn.addEventListener('click', closeModal);

    // --- KONSTANTA & STATE GLOBAL ---
    const QUESTION_TIME = 20;
    const CIRCUMFERENCE = 2 * Math.PI * 45;

    // Konstanta Poin Baru
    const POINTS_CORRECT = 10;
    const POINTS_WRONG = -5;
    const POINTS_UNANSWERED = -10;
    // Poin Kecepatan Berdasarkan Urutan
    const SPEED_POINTS = [3, 2, 1]; // Poin untuk penjawab ke-1, ke-2, ke-3

    let currentClassCode = null;
    let currentUser = null; 
    let questionTimer = null;
    let timeLeft = 0;
    let globalLeaveHandler = null; 
    let unsubscribeFromSession = null; 
    let originalPresentationContent = null;
    // Tambahkan flag untuk melacak penjawab urutan ke berapa (hanya untuk klien yang menjawab)
    let answerRank = 0; 
    // Menyimpan ID jawaban yang sudah masuk (untuk mencegah perhitungan ulang urutan)
    let currentAnswersReceived = {};


    // --- MANAJEMEN DATABASE (FIRESTORE) ---

    async function getClassData(code) {
        try {
            const docRef = doc(db, CLASS_COLLECTION_PATH, code);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("Dokumen tidak ditemukan:", code);
                return null;
            }
        } catch (e) {
            console.error("Gagal mengambil data kelas:", e);
            return null;
        }
    }

    async function updateClassData(code, data) {
        try {
            const docRef = doc(db, CLASS_COLLECTION_PATH, code);
            await setDoc(docRef, data, { merge: true });
        } catch (e) {
            console.error("Gagal memperbarui data kelas:", e);
        }
    }

    async function updateSessionState(code, newState) {
        try {
            const docRef = doc(db, CLASS_COLLECTION_PATH, code);
            const updates = {};
            for (const key in newState) {
                updates[`sessionState.${key}`] = newState[key];
            }
            await updateDoc(docRef, updates);
        } catch (e) {
            console.error("Gagal memperbarui state sesi:", e);
        }
    }

    function getSessionState(classData) {
        return classData ? classData.sessionState : null;
    }

    // --- UTILITAS ---

    function generateClassCode() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let code = '';
        for (let i = 0; i < 5; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `QUIZ-${code}`;
    }

    function showToast(message, bgColor) {
        const toast = document.getElementById('result-toast');
        if (!toast) return;

        toast.textContent = message;
        toast.className = toast.className.replace(/bg-\S+-\d+/g, ''); // Hapus semua kelas bg-
        toast.classList.add(bgColor);
        toast.classList.remove('hidden', 'opacity-0', '-translate-y-10');
        
        // Pindahkan timeout ke luar agar notif kedua bisa tampil
        setTimeout(() => {
            toast.classList.add('opacity-0', '-translate-y-10');
            setTimeout(() => toast.classList.add('hidden'), 300);
        }, 2500); // Tampilkan sedikit lebih lama
    }
    
    // Fungsi bantuan untuk menampilkan notif kedua dengan penundaan
    function showDelayedToast(message, bgColor, delay = 500) {
        setTimeout(() => {
            showToast(message, bgColor);
        }, delay);
    }

    // --- HALAMAN 1: HOME (BUAT/GABUNG) ---

    async function renderHomePage() {
        currentClassCode = null;
        currentUser = null;
        
        document.getElementById('modal-container').innerHTML = '';
        
        document.getElementById('app-router-outlet').innerHTML = `
            <div class="min-h-full flex items-center justify-center p-4">
                <div class="w-full max-w-md">
                    <div class="text-center mb-8">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 20v-6M6 20v-4M18 20v-8M10 20h4M6 12H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2M6 6h.01M10 6h.01M14 6h.01"/>
                            </svg>
                        </div>
                        <h1 class="text-3xl font-bold text-white">Meet Quiz</h1>
                        <p class="text-gray-400 mt-2">Buat sesi atau gabung ke sesi yang sudah ada.</p>
                    </div>

                    <div class="bg-gray-800 rounded-xl p-6 mb-6">
                        <h2 class="text-lg font-semibold text-white mb-4">Admin</h2>
                        <button id="create-btn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all">
                            Buat Sesi Baru
                        </button>
                    </div>

                    <div class="bg-gray-800 rounded-xl p-6">
                        <h2 class="text-lg font-semibold text-white mb-4">Peserta</h2>
                        <form id="join-form" class="space-y-4">
                            <div>
                                <label for="class-code" class="block text-sm font-medium text-gray-300 mb-2">Kode Sesi</label>
                                <input type="text" id="class-code" placeholder="e.g., QUIZ-AB3X9" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 code-input" required maxlength="10">
                            </div>
                            <div>
                                <label for="user-name" class="block text-sm font-medium text-gray-300 mb-2">Nama Anda</label>
                                <input type="text" id="user-name" placeholder="Masukkan nama Anda" class="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400" required maxlength="30">
                            </div>
                            <button type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all">
                            Gabung Sesi
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        // --- Event Listeners untuk Halaman Home ---
        const userId = firebaseServices.currentUserId;
        if (!userId) {
            showCustomAlert("Gagal mengautentikasi pengguna. Silakan segarkan halaman.", "Auth Error");
            return;
        }

        document.getElementById('create-btn').addEventListener('click', async () => {
            const code = generateClassCode();
            const presenterId = firebaseServices.currentUserId;
            if (!presenterId) return showCustomAlert("Auth tidak siap.", "Error");

            const newClassData = {
                code: code,
                createdAt: serverTimestamp(),
                quizList: [
                    { id: 1, q: "1 + 1 =", options: ["1", "2", "3", "4"], correct: 1 },
                    { id: 2, q: "1 x 1 =", options: ["1", "2", "3", "4"], correct: 0 }
                ],
                participantList: [
                    { id: presenterId, name: "Admin", isPresenter: true, score: 0, streak: 0, isOnline: true }
                ],
                sessionState: {
                    state: 'WAITING',
                    currentQuestionId: null,
                    quizStartTime: null,
                    totalQuestions: 0,
                    currentAnswers: {},
                    screenShareActive: false,
                    screenShareOffer: null,
                    screenShareAnswers: {},
                    screenShareIceCandidates: null
                },
                engagementStats: {
                    [presenterId]: { totalAnswered: 0, correctAnswers: 0, totalResponseTime: 0, totalSpeedScore: 0 }
                },
                quizSessionHistory: [],
            };

            try {
                const docRef = doc(db, CLASS_COLLECTION_PATH, code);
                await setDoc(docRef, newClassData);
                
                const user = { id: presenterId, name: "Presenter", isPresenter: true };
                currentUser = user;

                window.location.hash = `#meet?class=${encodeURIComponent(code)}`;

            } catch (e) {
                console.error("Gagal membuat sesi:", e);
                showCustomAlert("Gagal membuat sesi di database.", "Database Error");
            }
        });

        document.getElementById('join-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const classCode = document.getElementById('class-code').value.trim().toUpperCase();
            const userName = document.getElementById('user-name').value.trim();
            
            if (!classCode || !userName) return;

            const userId = firebaseServices.currentUserId;
            if (!userId) return showCustomAlert("Auth tidak siap.", "Error");

            const classData = await getClassData(classCode);
            if (!classData) {
                showCustomAlert("Sesi tidak ditemukan. Periksa kembali kodenya.", "Gagal Bergabung");
                return;
            }

            if (classData.sessionState.state === 'ENDED') {
                showCustomAlert("Sesi ini telah berakhir.", "Sesi Berakhir");
                return;
            }

            // PERBAIKAN VALIDASI: Cek duplikasi berdasarkan ID DAN Nama
            const isParticipantAlreadyRegistered = classData.participantList.some(p => 
                p.id === userId && p.name === userName
            );
            
            const newUser = { id: userId, name: userName, isPresenter: false, score: 0, streak: 0, isOnline: true };
            
            try {
                const docRef = doc(db, CLASS_COLLECTION_PATH, classCode);
                
                if (isParticipantAlreadyRegistered) {
                    // Jika ID dan Nama sudah ada, hanya perbarui status online
                    const updatedList = classData.participantList.map(p => 
                        p.id === userId && p.name === userName ? { ...p, isOnline: true } : p
                    );
                    await updateDoc(docRef, { participantList: updatedList });

                } else {
                    // Jika kombinasi ID dan Nama unik, tambahkan sebagai peserta baru
                    await updateDoc(docRef, {
                        participantList: arrayUnion(newUser),
                        [`engagementStats.${userId}`]: { totalAnswered: 0, correctAnswers: 0, totalResponseTime: 0, totalSpeedScore: 0 }
                    });
                }


                const user = { id: userId, name: userName, isPresenter: false };
                currentUser = user; 

                window.location.hash = `#meet?class=${encodeURIComponent(classCode)}`;

            } catch (e) {
                console.error("Gagal bergabung dengan sesi:", e);
                showCustomAlert("Gagal memperbarui sesi di database.", "Database Error");
            }
        });
    }


    // --- HALAMAN 2: MEET (SESI AKTIF) ---

    async function renderMeetPage() {
        const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
        currentClassCode = params.get('class');
        
        const userId = firebaseServices.currentUserId;

        if (!currentClassCode || !userId) {
            console.warn("Sesi tidak valid (kode atau user ID tidak ada), kembali ke home.");
            window.location.hash = '#home';
            return;
        }
        
        const classData = await getClassData(currentClassCode);
        if (!classData) {
            showCustomAlert("Sesi tidak ditemukan. Kembali ke home.", "Sesi Tidak Ditemukan");
            window.location.hash = '#home';
            return;
        }

        // KARENA currentUser tidak persisten di antara navigasi, kita cari lagi
        const userRecord = classData.participantList.find(p => p.id === userId);
        if (!userRecord) {
            showCustomAlert("Anda tidak terdaftar di sesi ini.", "Gagal Bergabung");
            window.location.hash = '#home';
            return;
        }
        currentUser = userRecord; 

        if (classData.sessionState.state === 'ENDED' && !currentUser.isPresenter) {
            showCustomAlert("Sesi ini telah berakhir.", "Sesi Berakhir");
            window.location.hash = '#home';
            return;
        }

        const isPresenter = currentUser.isPresenter;

        // Render UI Utama
        document.getElementById('app-router-outlet').innerHTML = `
            <div class="flex-1 flex overflow-hidden">
                <main class="flex-1 flex flex-col bg-black relative">
                    <div class="flex-1 flex items-center justify-center p-4">
                        <div id="presentation-area" class="w-full h-full bg-gray-800 rounded-lg flex flex-col items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            <span class="mt-4 text-lg font-medium">Layar Presentasi</span>
                        </div>
                    </div>

                    ${isPresenter ? `
                    <div id="presenter-controls-header" class="absolute top-4 left-4 z-10 flex space-x-2">
                        <button id="quiz-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all flex items-center disabled:opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M12 20v-6M6 20v-4M18 20v-8M10 20h4M6 12H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2M6 6h.01M10 6h.01M14 6h.01"/>
                            Kuis
                        </button>
                        <button id="show-results-btn" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all flex items-center disabled:opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            Tampilkan Hasil
                        </button>
                    </div>
                    ` : ''}
                    
                    <button id="quiz-indicator-btn" class="absolute top-4 right-4 z-10 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-200 flex items-center hidden animate-pulse">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M12 20v-6M6 20v-4M18 20v-8M10 20h4M6 12H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2M6 6h.01M10 6h.01M14 6h.01"/></svg>
                        Kuis Baru
                        <span id="indicator-timer-text" class="ml-2 bg-white bg-opacity-20 px-2 py-0.5 rounded-full text-sm">20</span>
                    </button>
                </main>

                <aside id="sidebar" class="w-full md:w-80 bg-white text-gray-800 flex flex-col shadow-lg z-10 transition-all duration-300 md:translate-x-0 absolute md:relative right-0 h-full transform translate-x-full">
                    <div class="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 class="text-xl font-bold text-gray-900">Leaderboard</h2>
                        <button class="md:hidden" id="close-sidebar-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <ul id="leaderboard-list" class="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3"></ul>
                    <div class="p-4 border-t border-gray-200">
                        <h3 class="text-lg font-bold text-gray-900 mb-3">Peserta (<span id="participant-count">0</span>)</h3>
                        <div id="participant-list-container" class="grid grid-cols-5 gap-3"></div>
                    </div>
                </aside>
            </div>

            <footer class="h-20 bg-gray-800 flex items-center justify-between px-4 md:px-8">
                <div class="text-sm font-medium text-gray-300">Sesi: <span class="font-mono">${currentClassCode}</span></div>
                
                <div class="flex items-center space-x-4">
                    <button id="back-to-home-btn" title="Kembali ke Home" class="bg-red-600 w-16 h-12 rounded-full flex items-center justify-center hover:bg-red-700 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <button class="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-600 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                    </button>
                    <button class="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-600 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                    </button>
                    
                    <button id="share-screen-btn" title="Bagikan Layar" class="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-600 transition-all">
                        <svg id="share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"/><path d="M7 2v4"/><path d="M17 2v4"/><rect width="20" height="4" x="2" y="16"/><path d="M17 22l5-5-5-5"/><path d="M22 17H10"/></svg>
                        <svg id="stop-share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect></svg>
                    </button>

                    ${isPresenter ? `
                    <button id="reset-session-btn" title="Reset Sesi" class="bg-gray-700 w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-600 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    </button>
                    ` : ''}
                </div>

                <div class="flex items-center space-x-4">
                    <button class="md:hidden" id="open-sidebar-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </button>
                </div>
            </footer>
        `;

        // Render UI Modal
        document.getElementById('modal-container').innerHTML = `
            <div id="result-toast" class="fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-lg text-white font-semibold shadow-2xl transition-all duration-300 opacity-0 -translate-y-10 hidden">
                <span id="toast-message"></span>
            </div>

            <div id="quiz-modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40 hidden">
                <div class="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-lg mx-4 text-gray-900">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-blue-600">Kuis Cepat!</h3>
                        <div class="relative w-16 h-16">
                            <svg class="w-full h-full" viewBox="0 0 100 100">
                                <circle class="text-gray-200" stroke-width="8" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                                <circle id="timer-circle" class="text-blue-600 timer-circle-progress" stroke-width="8" stroke-dasharray="${CIRCUMFERENCE}" stroke-dashoffset="${CIRCUMFERENCE}" stroke-linecap="round" stroke="currentColor" fill="transparent" r="45" cx="50" cy="50" />
                            </svg>
                            <span id="timer-text" class="absolute inset-0 flex items-center justify-center text-xl font-bold">${QUESTION_TIME}</span>
                        </div>
                    </div>
                    <p id="question-text" class="text-xl font-medium mb-6">Ini adalah contoh pertanyaan?</p>
                    <div id="options-container" class="space-y-3"></div>
                </div>
            </div>

            <div id="summary-modal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-90 z-50 hidden">
                <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full max-w-2xl mx-4 text-gray-900">
                    <h2 class="text-3xl font-bold text-center text-blue-600 mb-8">Rekap Keterlibatan</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg shadow-sm">
                            <div class="text-sm font-medium text-blue-800 mb-1">Skor Akhir</div>
                            <div id="summary-score" class="text-4xl font-bold text-blue-600">0</div>
                        </div>
                        <div class="bg-gray-50 border-l-4 border-gray-500 p-6 rounded-lg shadow-sm">
                            <div class="text-sm font-medium text-gray-800 mb-1">Peringkat Anda</div>
                            <div id="summary-rank" class="text-4xl font-bold text-gray-600">#0 / 0</div>
                        </div>
                        <div class="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-sm">
                            <div class="text-sm font-medium text-green-800 mb-1">Akurasi</div>
                            <div id="summary-accuracy" class="text-4xl font-bold text-green-600">0%</div>
                        </div>
                        <div class="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-sm">
                            <div class="text-sm font-medium text-yellow-800 mb-1">Kecepatan Rata-rata</div>
                            <div id="summary-speed" class="text-4xl font-bold text-yellow-600">0s</div>
                        </div>
                    </div>
                    <p class="text-center text-gray-600 mb-8">Kerja bagus hari ini! Anda menjawab <span id="summary-answered" class="font-bold">0</span> dari <span id="summary-total-q" class="font-bold">0</span> pertanyaan.</p>
                    <div class="text-center">
                        <button id="close-summary-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all">
                            Tutup
                        </button>
                    </div>
                </div>
            </div>

            <div id="quiz-management-modal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40 hidden">
                <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 text-gray-900 flex flex-col" style="height: 70vh;">
                    <div class="p-5 border-b border-gray-200 flex justify-between items-center">
                        <h2 id="quiz-modal-title" class="text-2xl font-bold text-gray-900">Manajemen Kuis</h2>
                        <button id="close-quiz-mgmt-btn" class="text-gray-400 hover:text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <div class="flex-1 overflow-y-auto custom-scrollbar">
                        <div id="quiz-list-view" class="p-6">
                            <div class="flex justify-between items-center mb-4">
                                <h3 class="text-xl font-semibold">Kuis Anda</h3>
                                <button id="create-new-quiz-btn" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg shadow-md transition-all">
                                    Buat Baru
                                </button>
                            </div>
                            <ul id="quiz-list-container" class="space-y-3"></ul>
                        </div>
                        <div id="create-quiz-view" class="p-6 hidden">
                            <button id="back-to-quiz-list-btn" class="mb-4 text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1"><path d="m15 18-6-6 6-6"/></svg>
                                Kembali ke daftar
                            </button>
                            <form id="create-quiz-form">
                                <div class="mb-4">
                                    <label for="quiz-question-input" class="block text-sm font-medium text-gray-700 mb-1">Pertanyaan</label>
                                    <textarea id="quiz-question-input" rows="3" class="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" placeholder="Ketik pertanyaan Anda..."></textarea>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">Opsi Jawaban (Pilih jawaban yang benar)</label>
                                    <div id="create-options-container" class="space-y-3"></div>
                                </div>
                                <div class="flex justify-between items-center mt-6">
                                    <button id="add-option-btn" type="button" class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-all">
                                        Tambah Opsi
                                    </button>
                                    <button id="save-quiz-btn" type="submit" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all">
                                        Simpan Kuis
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Jalankan logika aplikasi utama
        initializeAppLogic(isPresenter, classData);
    }

    // --- LOGIKA APLIKASI INTI (HALAMAN MEET) ---

    function initializeAppLogic(isPresenter, initialClassData) {
        
        // --- STATE LOGIKA APLIKASI ---
        let classData = initialClassData;

        // Cari record peserta yang sesuai (hanya berdasarkan ID, karena currentUser non-persistent)
        const selfRecord = classData.participantList.find(p => p.id === currentUser.id);
        if (selfRecord && !selfRecord.isOnline) {
            selfRecord.isOnline = true;
            updateDoc(doc(db, CLASS_COLLECTION_PATH, currentClassCode), {
                participantList: classData.participantList
            });
        }
        // Perbarui currentUser lokal dari data yang dimuat
        if (selfRecord) {
            currentUser = selfRecord;
        }

        let sessionState = initialClassData.sessionState;
        let editingQuizId = null;
        let hasAnsweredThisRound = false;
        let isLeaving = false; 

        // --- PILIH ELEMEN DOM ---
        const quizBtn = document.getElementById('quiz-btn');
        const showResultsBtn = document.getElementById('show-results-btn');
        const resetSessionBtn = document.getElementById('reset-session-btn');
        const quizIndicatorBtn = document.getElementById('quiz-indicator-btn');
        const indicatorTimerText = document.getElementById('indicator-timer-text');
        const resultToast = document.getElementById('result-toast');
        const sidebar = document.getElementById('sidebar');
        const leaderboardList = document.getElementById('leaderboard-list');
        const participantListContainer = document.getElementById('participant-list-container');
        const participantCount = document.getElementById('participant-count');
        const closeSidebarBtn = document.getElementById('close-sidebar-btn');
        const openSidebarBtn = document.getElementById('open-sidebar-btn');
        const quizModal = document.getElementById('quiz-modal');
        const questionText = document.getElementById('question-text');
        const optionsContainer = document.getElementById('options-container');
        const timerText = document.getElementById('timer-text');
        const timerCircle = document.getElementById('timer-circle');
        const quizMgmtModal = document.getElementById('quiz-management-modal');
        const closeQuizMgmtBtn = document.getElementById('close-quiz-mgmt-btn');
        const quizModalTitle = document.getElementById('quiz-modal-title');
        const quizListView = document.getElementById('quiz-list-view');
        const createQuizView = document.getElementById('create-quiz-view');
        const quizListContainer = document.getElementById('quiz-list-container');
        const createNewQuizBtn = document.getElementById('create-new-quiz-btn');
        const backToQuizListBtn = document.getElementById('back-to-quiz-list-btn');
        const createQuizForm = document.getElementById('create-quiz-form');
        const quizQuestionInput = document.getElementById('quiz-question-input');
        const createOptionsContainer = document.getElementById('create-options-container');
        const addOptionBtn = document.getElementById('add-option-btn');
        const saveQuizBtn = document.getElementById('save-quiz-btn');
        const summaryModal = document.getElementById('summary-modal');
        const closeSummaryBtn = document.getElementById('close-summary-btn');
        const summaryScore = document.getElementById('summary-score');
        const summaryRank = document.getElementById('summary-rank');
        const summaryAccuracy = document.getElementById('summary-accuracy');
        const summarySpeed = document.getElementById('summary-speed');
        const summaryAnswered = document.getElementById('summary-answered');
        const summaryTotalQ = document.getElementById('summary-total-q');
        const backToHomeBtn = document.getElementById('back-to-home-btn');
        const shareScreenBtn = document.getElementById('share-screen-btn');
        const presentationArea = document.getElementById('presentation-area');
        
        if (presentationArea) {
            originalPresentationContent = presentationArea.innerHTML;
        }

        // Initialize WebRTC Screen Share Manager
        screenShareManager = new ScreenShareManager(
            firebaseServices,
            currentClassCode,
            currentUser.id,
            isPresenter
        );

        screenShareManager.updateClassData(initialClassData);

        // Set callback for receiving remote stream (participants only)
        if (!isPresenter) {
            screenShareManager.onRemoteStream = (stream) => {
                console.log("Displaying remote screen share stream");
                if (presentationArea) {
                    presentationArea.innerHTML = '';
                    const video = document.createElement('video');
                    video.id = 'remote-screen-share-video';
                    video.srcObject = stream;
                    video.autoplay = true;
                    video.muted = true;
                    video.playsInline = true;
                    video.style.width = '100%';
                    video.style.height = '100%';
                    video.style.objectFit = 'contain';
                    presentationArea.appendChild(video);

                    video.play().catch(e => console.warn("Autoplay was prevented:", e));
                }
            };
        }

        // --- FUNGSI RENDER UI ---

        function renderLeaderboard() {
            if (!leaderboardList) return;
            
            const sortedParticipants = [...classData.participantList]
                .filter(p => !p.isPresenter)
                .sort((a, b) => b.score - a.score);

            leaderboardList.innerHTML = '';
            if (sortedParticipants.length === 0) {
                leaderboardList.innerHTML = '<p class="text-gray-500 text-sm p-3">Belum ada peserta yang bergabung.</p>';
            }

            sortedParticipants.forEach((user, index) => {
                const rank = index + 1;
                let rankColor = "text-gray-500";
                if (rank === 1) rankColor = "text-yellow-500";
                if (rank === 2) rankColor = "text-gray-400";
                if (rank === 3) rankColor = "text-yellow-700";
                
                const isYou = user.id === currentUser.id;
                
                // Ambil statistik engagement untuk user ini
                const stats = classData.engagementStats[user.id] || { totalAnswered: 0, totalSpeedScore: 0 };
                const avgSpeedScore = stats.totalAnswered > 0 ? (stats.totalSpeedScore / stats.totalAnswered).toFixed(1) : 0;


                const userHtml = `
                    <li class="flex items-center justify-between p-3 rounded-lg ${isYou ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'}">
                        <div class="flex items-center">
                            <span class="text-lg font-bold w-8 ${rankColor}">#${rank}</span>
                            <div class="ml-2 flex flex-col">
                                <span class="font-semibold text-gray-800">${user.name}${isYou ? ' (Anda)' : ''}</span>
                                <div class="text-xs text-gray-500 mt-0.5 flex items-center space-x-2">
                                    ${user.streak >= 3 ? `<span class="text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">🔥 ${user.streak} Rentetan</span>` : ''}
                                    <span title="Rata-rata Poin Kecepatan per Jawaban">${avgSpeedScore} Poin Kecepatan</span>
                                </div>
                            </div>
                        </div>
                        <span class="text-xl font-bold text-blue-600">${user.score}</span>
                    </li>
                `;
                leaderboardList.innerHTML += userHtml;
            });
        }

        function renderParticipantList() {
            if (!participantListContainer) return;

            const onlineParticipants = classData.participantList.filter(p => p.isOnline === true);

            participantListContainer.innerHTML = '';
            participantCount.textContent = onlineParticipants.length;

            onlineParticipants.forEach(user => {
                const isYou = user.id === currentUser.id;
                const initials = user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                const userHtml = `
                    <div class="flex flex-col items-center" title="${user.name}${isYou ? ' (Anda)' : ''}">
                        <div class="w-10 h-10 rounded-full ${isYou ? 'bg-blue-600' : 'bg-gray-700'} flex items-center justify-center text-white font-semibold text-sm ring-2 ${isYou ? 'ring-blue-400' : 'ring-gray-600'}">
                            ${initials}
                        </div>
                        <span class="text-xs mt-1 text-gray-600 truncate w-full text-center">${user.name}${isYou ? ' (Anda)' : ''}</span>
                    </div>
                `;
                participantListContainer.innerHTML += userHtml;
            });
        }

        function toggleSidebar(forceOpen = null) {
            if (forceOpen === true) {
                sidebar.classList.remove('translate-x-full');
            } else if (forceOpen === false) {
                sidebar.classList.add('translate-x-full');
            } else {
                sidebar.classList.toggle('translate-x-full');
            }
        }

        // --- FUNGSI MANAJEMEN KUIS (PRESENTER) ---

        function openQuizManagementModal() {
            quizMgmtModal.classList.remove('hidden');
            renderQuizList();
            showQuizListView();
        }

        function closeQuizManagementModal() {
            quizMgmtModal.classList.add('hidden');
            editingQuizId = null;
        }

        function renderQuizList() {
            quizListContainer.innerHTML = '';
            if (classData.quizList.length === 0) {
                quizListContainer.innerHTML = '<p class="text-gray-500">Belum ada kuis yang dibuat.</p>';
                return;
            }

            classData.quizList.forEach(quiz => {
                const quizItemHtml = `
                    <li class="bg-gray-50 p-4 rounded-lg shadow-sm flex justify-between items-center border border-gray-200">
                        <span class="text-gray-800 font-medium truncate w-3/5" title="${quiz.q}">${quiz.q}</span>
                        <div class="flex space-x-2">
                            <button class="quiz-edit-btn bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-all text-sm" data-id="${quiz.id}">
                                Edit
                            </button>
                            <button class="quiz-start-btn bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-all text-sm" data-id="${quiz.id}">
                                Mulai
                            </button>
                        </div>
                    </li>
                `;
                quizListContainer.innerHTML += quizItemHtml;
            });

            document.querySelectorAll('.quiz-edit-btn').forEach(btn => {
                btn.addEventListener('click', () => editQuiz(parseInt(btn.dataset.id)));
            });
            document.querySelectorAll('.quiz-start-btn').forEach(btn => {
                btn.addEventListener('click', () => startQuiz(parseInt(btn.dataset.id)));
            });
        }

        function showCreateQuizView() {
            quizModalTitle.textContent = 'Buat Kuis Baru';
            quizListView.classList.add('hidden');
            createQuizView.classList.remove('hidden');
            saveQuizBtn.textContent = 'Simpan Kuis';
            resetCreateQuizForm();
            addQuizOptionInput();
            addQuizOptionInput();
        }

        function showQuizListView() {
            quizModalTitle.textContent = 'Manajemen Kuis';
            createQuizView.classList.add('hidden');
            quizListView.classList.remove('hidden');
        }

        function resetCreateQuizForm() {
            quizQuestionInput.value = '';
            createOptionsContainer.innerHTML = '';
        }

        function addQuizOptionInput(value = '', isCorrect = false) {
            const optionIndex = createOptionsContainer.children.length;
            const optionHtml = `
                <div class="flex items-center space-x-2 quiz-option-input border border-gray-300 rounded-md p-2">
                    <input id="option-radio-${optionIndex}" type="radio" name="correct-answer" class="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500" ${isCorrect ? 'checked' : ''}>
                    <input type="text" class="option-text-input w-full border-0 focus:ring-0 p-1" placeholder="Ketik opsi jawaban..." value="${value}">
                    <button type="button" class="remove-option-btn text-gray-400 hover:text-red-500" title="Hapus opsi">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            `;
            createOptionsContainer.insertAdjacentHTML('beforeend', optionHtml);
            
            createOptionsContainer.lastElementChild.querySelector('.remove-option-btn').addEventListener('click', (e) => {
                if (createOptionsContainer.children.length > 2) {
                    e.target.closest('.quiz-option-input').remove();
                }
            });
        }

        async function handleSaveQuiz(e) {
            e.preventDefault();
            const question = quizQuestionInput.value.trim();
            if (!question) return showCustomAlert('Silakan masukkan pertanyaan.', 'Input Tidak Valid');
            
            const optionsElements = createOptionsContainer.querySelectorAll('.quiz-option-input');
            const options = [];
            let correctIndex = -1;

            optionsElements.forEach((el, index) => {
                const text = el.querySelector('.option-text-input').value.trim();
                const isChecked = el.querySelector('input[type="radio"]').checked;
                if (text) {
                    options.push(text);
                    if (isChecked) correctIndex = options.length - 1;
                }
            });

            if (options.length < 2) return showCustomAlert('Harap berikan setidaknya 2 opsi jawaban yang valid.', 'Input Tidak Valid');
            if (correctIndex === -1) return showCustomAlert('Silakan pilih jawaban yang benar.', 'Input Tidak Valid');

            if (editingQuizId) {
                const quiz = classData.quizList.find(q => q.id === editingQuizId);
                quiz.q = question;
                quiz.options = options;
                quiz.correct = correctIndex;
            } else {
                const newQuiz = {
                    id: classData.quizList.length > 0 ? Math.max(...classData.quizList.map(q => q.id)) + 1 : 1,
                    q: question,
                    options: options,
                    correct: correctIndex
                };
                classData.quizList.push(newQuiz);
            }
            
            await updateDoc(doc(db, CLASS_COLLECTION_PATH, currentClassCode), {
                quizList: classData.quizList
            });

            showQuizListView();
            editingQuizId = null;
        }

        function editQuiz(quizId) {
            const quiz = classData.quizList.find(q => q.id === quizId);
            if (!quiz) return;

            editingQuizId = quizId;
            showCreateQuizView();
            
            quizModalTitle.textContent = 'Edit Kuis';
            saveQuizBtn.textContent = 'Perbarui Kuis';
            quizQuestionInput.value = quiz.q;
            
            quiz.options.forEach((option, index) => {
                addQuizOptionInput(option, index === quiz.correct);
            });
        }


        // --- FUNGSI EKSEKUSI KUIS ---

        function startQuiz(quizId) {
            const quiz = classData.quizList.find(q => q.id === quizId);
            if (!quiz) return console.error("Kuis tidak ditemukan!");

            // Reset currentAnswers di Firestore dan state lokal
            updateDoc(doc(db, CLASS_COLLECTION_PATH, currentClassCode), {
                "sessionState.currentAnswers": {} 
            });
            currentAnswersReceived = {}; // Reset local answers tracking
            
            updateSessionState(currentClassCode, {
                state: 'QUIZ_ACTIVE',
                currentQuestionId: quizId,
                quizStartTime: Date.now(), 
                totalQuestions: classData.sessionState.totalQuestions + 1
            });
            
            closeQuizManagementModal();
        }

        function populateQuizModal(quiz) {
            if (!quizModal || !questionText || !optionsContainer) return;

            questionText.textContent = quiz.q;
            optionsContainer.innerHTML = '';
            
            quiz.options.forEach((option, index) => {
                const optionHtml = `
                    <button class="option-btn w-full text-left p-4 bg-gray-100 hover:bg-gray-200 rounded-lg text-lg font-medium transition-all duration-200 border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" data-index="${index}">
                        ${option}
                    </button>
                `;
                optionsContainer.innerHTML += optionHtml;
            });
            
            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.addEventListener('click', () => handleAnswerClick(parseInt(btn.dataset.index)));
            });
        }

        function updateMasterTimer() {
            if (sessionState.state !== 'QUIZ_ACTIVE' || !sessionState.quizStartTime) {
                if (questionTimer) clearInterval(questionTimer);
                questionTimer = null;
                return;
            }

            const elapsed = Math.floor((Date.now() - sessionState.quizStartTime) / 1000);
            timeLeft = QUESTION_TIME - elapsed;

            if (timeLeft <= 0) {
                timeLeft = 0; 
                if (questionTimer) {
                    clearInterval(questionTimer);
                    questionTimer = null; 
                }
                
                timerText.textContent = timeLeft;
                indicatorTimerText.textContent = timeLeft;
                const progress = 0;
                timerCircle.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);

                if (isPresenter) {
                    if (classData.sessionState.state === 'QUIZ_ACTIVE') {
                        // Presenter memindahkan state untuk memicu perhitungan skor terpusat
                        updateSessionState(currentClassCode, { state: 'AWAITING_RESULTS' });
                    }
                }
                return; 
            }

            timerText.textContent = timeLeft;
            indicatorTimerText.textContent = timeLeft;
            
            let progress = Math.max(0, timeLeft / QUESTION_TIME);
            timerCircle.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
        }

        // Fungsi baru untuk menghitung poin kecepatan berdasarkan peringkat
        function getSpeedPoints(rank) {
            if (rank === 1) return SPEED_POINTS[0]; // 3
            if (rank === 2) return SPEED_POINTS[1]; // 2
            if (rank === 3) return SPEED_POINTS[2]; // 1
            return 0;
        }

        // MODIFIKASI: Peserta hanya mengirim jawaban mentah, Presenter yang hitung skor
        async function handleAnswerClick(selectedIndex) {
            if (hasAnsweredThisRound) return;
            
            const responseTime = QUESTION_TIME - timeLeft;
            hasAnsweredThisRound = true;

            const quiz = classData.quizList.find(q => q.id === sessionState.currentQuestionId);
            const isCorrect = selectedIndex === quiz.correct;
            
            try {
                const docRef = doc(db, CLASS_COLLECTION_PATH, currentClassCode);
                
                await updateDoc(docRef, {
                    [`sessionState.currentAnswers.${currentUser.id}`]: { 
                        selectedIndex, 
                        isCorrect, 
                        timeSubmitted: Date.now() 
                    }
                });
                
                // --- Notifikasi Klien ---
                if (isCorrect) {
                    showToast(`Jawaban Terkirim: Benar. Menunggu hasil dari Presenter.`, "bg-green-600");
                } else {
                    showToast(`Jawaban Terkirim: Salah. Menunggu hasil dari Presenter.`, "bg-red-600");
                }

            } catch (e) {
                console.error("Gagal menyimpan jawaban:", e);
                showToast("Gagal menyimpan jawaban ke server.", "bg-red-800");
            }

            document.querySelectorAll('.option-btn').forEach((btn, index) => {
                btn.disabled = true;
                if (index === selectedIndex) {
                    btn.classList.add('ring-2', 'ring-offset-2', 'ring-blue-600');
                }
                if (index === quiz.correct) {
                    btn.classList.remove('bg-gray-100', 'hover:bg-gray-200');
                    btn.classList.add('bg-green-100', 'border-green-400');
                } else if (index === selectedIndex) {
                    btn.classList.remove('bg-gray-100', 'hover:bg-gray-200');
                    btn.classList.add('bg-red-100', 'border-red-400');
                }
            });

            setTimeout(() => {
                quizModal.classList.add('hidden');
            }, 3000); 
        }

        async function handleUnanswered() {
            if (hasAnsweredThisRound) return; 
            
            hasAnsweredThisRound = true; 

            if (!currentUser || currentUser.isPresenter) return;
            
            showToast(`Waktu habis! Menunggu hasil...`, "bg-gray-600");

            try {
                const docRef = doc(db, CLASS_COLLECTION_PATH, currentClassCode);
                
                // Simpan entri "tidak menjawab" dengan ID peserta
                await updateDoc(docRef, {
                    [`sessionState.currentAnswers.${currentUser.id}`]: { 
                        selectedIndex: -1, // Indeks jawaban -1 berarti tidak ada jawaban
                        isCorrect: false, 
                        timeSubmitted: Date.now() 
                    }
                });
            } catch (e) {
                console.error("Gagal menyimpan jawaban (waktu habis):", e);
            }
        }


        // --- FUNGSI RINGKASAN & SESI (Termasuk LOGIKA PERHITUNGAN PRESENTER BARU) ---
        
        // FUNGSI BARU: HANYA DIJALANKAN OLEH PRESENTASI UNTUK MENGHITUNG SKOR AKHIR KUIS
        async function calculateAndPublishResults(currentClassData) {
            // Pastikan ini hanya berjalan sekali per kuis
            if (currentClassData.sessionState.state !== 'AWAITING_RESULTS') return;

            const quiz = currentClassData.quizList.find(q => q.id === currentClassData.sessionState.currentQuestionId);
            if (!quiz) return;

            const currentAnswers = currentClassData.sessionState.currentAnswers || {};
            let participantListUpdates = [...currentClassData.participantList];
            let engagementStatsUpdates = { ...currentClassData.engagementStats };
            let finalAnswers = {}; 
            
            // 1. Urutkan Jawaban yang Benar Berdasarkan Waktu Submisi (untuk menentukan peringkat kecepatan)
            const correctSubmissions = Object.entries(currentAnswers)
                .filter(([, answer]) => answer.isCorrect)
                .sort(([, a], [, b]) => a.timeSubmitted - b.timeSubmitted);

            // 2. Loop Melalui SEMUA Peserta untuk Menghitung Poin per ID Peserta
            for (let i = 0; i < participantListUpdates.length; i++) {
                const participant = participantListUpdates[i];
                if (participant.isPresenter) continue;

                const userId = participant.id;
                const answer = currentAnswers[userId];
                const hasAnswered = !!answer;
                
                let totalPoints = 0;
                let accuracyPoints = 0;
                let speedPoints = 0;
                let newStreak = participant.streak || 0;
                let currentRank = 0;
                let responseTime = QUESTION_TIME; // Default untuk tidak menjawab

                if (hasAnswered) {
                    // Hitung waktu terpakai
                    responseTime = (answer.timeSubmitted - currentClassData.sessionState.quizStartTime) / 1000;
                    responseTime = Math.min(QUESTION_TIME, Math.max(0, responseTime));
                    
                    if (answer.isCorrect) {
                        accuracyPoints = POINTS_CORRECT; 
                        newStreak += 1;
                        
                        // Cari peringkat speed berdasarkan ID di array yang sudah diurutkan
                        currentRank = correctSubmissions.findIndex(([id]) => id === userId) + 1;
                        speedPoints = getSpeedPoints(currentRank);

                    } else {
                        accuracyPoints = POINTS_WRONG; 
                        newStreak = 0; 
                    }
                    totalPoints = accuracyPoints + speedPoints;

                } else {
                    // Tidak menjawab (Waktu Habis)
                    totalPoints = POINTS_UNANSWERED; 
                    accuracyPoints = POINTS_UNANSWERED;
                    newStreak = 0;
                }

                // 3. Perbarui Data Peserta di participantListUpdates (skor kumulatif per ID)
                participantListUpdates[i].score = Math.max(0, (participant.score || 0) + totalPoints);
                participantListUpdates[i].streak = newStreak;

                // 4. Perbarui Engagement Stats (Statistik total)
                const currentStats = engagementStatsUpdates[userId] || { totalAnswered: 0, correctAnswers: 0, totalResponseTime: 0, totalSpeedScore: 0 };
                
                engagementStatsUpdates[userId] = {
                    totalAnswered: currentStats.totalAnswered + 1,
                    correctAnswers: currentStats.correctAnswers + (answer?.isCorrect ? 1 : 0),
                    // responseTime hanya ditambahkan jika menjawab (waktu < QUESTION_TIME)
                    totalResponseTime: currentStats.totalResponseTime + (hasAnswered ? responseTime : 0), 
                    totalSpeedScore: currentStats.totalSpeedScore + speedPoints
                };
                
                // 5. Siapkan Jawaban Akhir untuk dimasukkan ke History
                // Kunci tetap ID Firebase, karena engagementStats dikunci oleh ID
                finalAnswers[userId] = {
                    selectedIndex: answer?.selectedIndex ?? -1,
                    isCorrect: answer?.isCorrect ?? false,
                    responseTime: responseTime,
                    speedRank: currentRank,
                    accuracyPoints: accuracyPoints,
                    speedPoints: speedPoints,
                    totalPoints: totalPoints,
                    timeSubmitted: answer?.timeSubmitted ?? null
                };
            }
            
            // 6. Buat Entri Riwayat Kuis Baru
            const quizHistoryEntry = {
                quizId: quiz.id,
                question: quiz.q,
                correctIndex: quiz.correct,
                answers: finalAnswers
            };
            
            // 7. Terapkan Semua Pembaruan ke Firestore (Atomic Update)
            const docRef = doc(db, CLASS_COLLECTION_PATH, currentClassCode);
            
            try {
                await updateDoc(docRef, {
                    participantList: participantListUpdates, 
                    engagementStats: engagementStatsUpdates, 
                    "sessionState.currentAnswers": {}, // Kosongkan jawaban kuis saat ini
                    quizSessionHistory: arrayUnion(quizHistoryEntry) // Tambahkan ke riwayat
                });

                console.log("Perhitungan skor selesai dan dipublikasikan.");
                // Pindahkan ke state WAITING setelah perhitungan
                await updateSessionState(currentClassCode, { state: 'WAITING' });
                
            } catch (e) {
                console.error("Gagal memperbarui skor dan riwayat kuis:", e);
            }
        }
        
        function showFinalResults() {
            if (!isPresenter) return;
            updateSessionState(currentClassCode, { state: 'RESULTS_PUBLISHED' });
        }

        function calculateAndShowSummary() {
            if (isPresenter) return; 

            const userRecord = classData.participantList.find(p => p.id === currentUser.id);
            const stats = classData.engagementStats[currentUser.id];
            if (!userRecord || !stats) return;

            summaryScore.textContent = userRecord.score;
            
            const sortedScores = [...classData.participantList]
                .filter(p => !p.isPresenter)
                .sort((a, b) => b.score - a.score);
            
            const userRank = sortedScores.findIndex(u => u.id === currentUser.id) + 1;
            const totalParticipants = sortedScores.length > 0 ? sortedScores.length : 1;
            summaryRank.textContent = `#${userRank} / ${totalParticipants}`;

            const accuracy = stats.totalAnswered > 0 ? Math.round((stats.correctAnswers / stats.totalAnswered) * 100) : 0;
            summaryAccuracy.textContent = `${accuracy}%`;

            // Rata-rata waktu respons (waktu terpakai)
            const avgTimeSpent = stats.totalAnswered > 0 ? (stats.totalResponseTime / stats.totalAnswered).toFixed(1) : 0;
            summarySpeed.textContent = `${avgTimeSpent}s`;

            summaryAnswered.textContent = stats.totalAnswered;
            summaryTotalQ.textContent = sessionState.totalQuestions;

            summaryModal.classList.remove('hidden');
        }

        function resetSession() {
            if (!isPresenter) return;

            const currentClassData = classData; 
            
            const newParticipantList = currentClassData.participantList.map(p => ({
                ...p,
                score: 0,
                streak: 0
            }));
            
            const newEngagementStats = {};
            Object.keys(currentClassData.engagementStats).forEach(key => {
                // Tambahkan totalSpeedScore ke inisialisasi reset
                newEngagementStats[key] = { totalAnswered: 0, correctAnswers: 0, totalResponseTime: 0, totalSpeedScore: 0 };
            });

            const newSessionState = {
                state: 'WAITING',
                currentQuestionId: null,
                quizStartTime: null,
                totalQuestions: 0,
                currentAnswers: {},
                screenShareActive: false,
                screenShareOffer: null,
                screenShareAnswers: {},
                screenShareIceCandidates: null
            };

            updateDoc(doc(db, CLASS_COLLECTION_PATH, currentClassCode), {
                participantList: newParticipantList,
                engagementStats: newEngagementStats,
                sessionState: newSessionState,
                quizSessionHistory: [] // Reset juga riwayat sesi
            });
        }

        // --- LOGIKA BERBAGI LAYAR DENGAN WEBRTC ---

        async function startScreenShare() {
            if (!screenShareManager) return;

            try {
                if (isPresenter) {
                    // Presenter starts screen share
                    const stream = await screenShareManager.startScreenShare();
                    
                    // Display locally for presenter
                    if (presentationArea) {
                        presentationArea.innerHTML = '';
                        const video = document.createElement('video');
                        video.id = 'local-screen-share-video';
                        video.srcObject = stream;
                        video.autoplay = true;
                        video.muted = true;
                        video.playsInline = true;
                        video.style.width = '100%';
                        video.style.height = '100%';
                        video.style.objectFit = 'contain';
                        presentationArea.appendChild(video);
                    }

                    // Update button UI
                    if (shareScreenBtn) {
                        shareScreenBtn.title = "Hentikan Berbagi";
                        shareScreenBtn.classList.remove('bg-gray-700', 'hover:bg-gray-600');
                        shareScreenBtn.classList.add('bg-red-600', 'hover:bg-red-700');
                        document.getElementById('share-icon').classList.add('hidden');
                        document.getElementById('stop-share-icon').classList.remove('hidden');
                    }

                    showToast("Berbagi layar dimulai", "bg-green-600");
                }
            } catch (error) {
                console.error("Error starting screen share:", error);
                if (error.name === 'NotAllowedError') {
                    showCustomAlert("Anda membatalkan izin berbagi layar.", "Dibatalkan");
                } else {
                    showCustomAlert("Gagal memulai berbagi layar. Pastikan browser Anda mendukung fitur ini.", "Berbagi Layar Gagal");
                }
            }
        }

        async function stopScreenShare() {
            if (!screenShareManager) return;

            try {
                if (isPresenter) {
                    await screenShareManager.stopScreenShare();
                    
                    // Restore original content
                    if (presentationArea && originalPresentationContent) {
                        presentationArea.innerHTML = originalPresentationContent;
                    }

                    // Update button UI
                    if (shareScreenBtn) {
                        shareScreenBtn.title = "Bagikan Layar";
                        shareScreenBtn.classList.remove('bg-red-600', 'hover:bg-red-700');
                        shareScreenBtn.classList.add('bg-gray-700', 'hover:bg-gray-600');
                        document.getElementById('share-icon').classList.remove('hidden');
                        document.getElementById('stop-share-icon').classList.add('hidden');
                    }

                    showToast("Berbagi layar dihentikan", "bg-gray-600");
                } else {
                    await screenShareManager.leaveScreenShare();
                    
                    // Restore original content for participants
                    if (presentationArea && originalPresentationContent) {
                        presentationArea.innerHTML = originalPresentationContent;
                    }
                }
            } catch (error) {
                console.error("Error stopping screen share:", error);
            }
        }

        // --- FUNGSI SINKRONISASI STATE & KELUAR ---

        async function handleSessionLeave() {
            if (screenShareManager) {
                await stopScreenShare();
            }

            if (isLeaving || !currentClassCode || !currentUser) return;
            isLeaving = true; 

            const currentClassData = await getClassData(currentClassCode);
            if (!currentClassData) return;

            if (isPresenter) {
                console.log("Presenter meninggalkan sesi, mengakhiri sesi...");
                await updateSessionState(currentClassCode, { state: 'ENDED' });
            } else {
                console.log("Peserta meninggalkan sesi, set 'isOnline = false'");
                // Cari peserta berdasarkan ID
                const userRecordIndex = currentClassData.participantList.findIndex(p => p.id === currentUser.id);
                
                if (userRecordIndex !== -1) {
                    currentClassData.participantList[userRecordIndex].isOnline = false;
                    await updateDoc(doc(db, CLASS_COLLECTION_PATH, currentClassCode), {
                        participantList: currentClassData.participantList
                    });
                }
            }
        }
        
        // Memastikan `answerRank` lokal diatur ulang saat kuis baru dimulai
        function resetLocalQuizState() {
             hasAnsweredThisRound = false; 
             answerRank = 0; 
             currentAnswersReceived = {};
        }

        function handleStateUpdate(newClassData) {
            if (!newClassData) {
                if (unsubscribeFromSession) unsubscribeFromSession();
                if (globalLeaveHandler) {
                    window.removeEventListener('beforeunload', globalLeaveHandler);
                    globalLeaveHandler = null;
                }
                showCustomAlert("Sesi telah berakhir atau tidak ada.", "Sesi Berakhir");
                window.location.hash = '#home';
                return;
            }

            const oldState = sessionState?.state; 
            
            classData = newClassData;

            if (screenShareManager) { 
                screenShareManager.updateClassData(newClassData);
            }

            // UPDATE: Perbarui currentUser dari data Firestore (ID tetap kunci utama)
            currentUser = classData.participantList.find(p => p.id === currentUser.id) || currentUser;
            sessionState = classData.sessionState;
            
            // Handle WebRTC Screen Share for participants
            if (!isPresenter && sessionState.screenShareActive && sessionState.screenShareOffer) {
                // Participant joins screen share if not already joined
                if (screenShareManager && !screenShareManager.peerConnection) {
                    screenShareManager.joinScreenShare(sessionState.screenShareOffer)
                        .catch(err => console.error("Failed to join screen share:", err));
                }
            } else if (!isPresenter && !sessionState.screenShareActive) {
                // Screen share stopped, restore original content
                if (presentationArea && originalPresentationContent) {
                    const currentContent = presentationArea.innerHTML;
                    if (currentContent.includes('remote-screen-share-video')) {
                        presentationArea.innerHTML = originalPresentationContent;
                    }
                }
                if (screenShareManager && screenShareManager.peerConnection) {
                    screenShareManager.leaveScreenShare();
                }
            }

            const newState = sessionState.state;
            
            if (newState === 'ENDED' && !isPresenter) {
                if (unsubscribeFromSession) unsubscribeFromSession();
                if (globalLeaveHandler) {
                    window.removeEventListener('beforeunload', globalLeaveHandler);
                    globalLeaveHandler = null;
                }
                showCustomAlert("Presenter telah mengakhiri sesi.", "Sesi Berakhir");
                window.location.hash = '#home';
                return;
            }
            
            if (oldState !== 'QUIZ_ACTIVE' && newState === 'QUIZ_ACTIVE') {
                resetLocalQuizState(); // Reset state lokal di sini
                timeLeft = QUESTION_TIME; 
                
                if (questionTimer) clearInterval(questionTimer); 
                updateMasterTimer(); 
                questionTimer = setInterval(updateMasterTimer, 1000);
            }

            renderLeaderboard();
            renderParticipantList();

            if (isPresenter) {
                quizBtn.disabled = sessionState.state === 'QUIZ_ACTIVE';
                showResultsBtn.disabled = sessionState.state === 'QUIZ_ACTIVE' || sessionState.totalQuestions === 0;
            }

            switch (sessionState.state) {
                
                case 'WAITING':
                    if (questionTimer) clearInterval(questionTimer);
                    quizIndicatorBtn.classList.add('hidden');
                    quizModal.classList.add('hidden');
                    summaryModal.classList.add('hidden');
                    break;
                
                case 'QUIZ_ACTIVE':
                    // Reset answerRank, karena ini hanya untuk tracking lokal yang tidak relevan lagi
                    answerRank = 0; 
                    currentAnswersReceived = {};

                    if (!isPresenter && !hasAnsweredThisRound) {
                        quizIndicatorBtn.classList.remove('hidden');
                        quizModal.classList.remove('hidden'); 
                        const quiz = classData.quizList.find(q => q.id === sessionState.currentQuestionId);
                        if (quiz) {
                            populateQuizModal(quiz);
                        }
                    }
                    break;

                case 'AWAITING_RESULTS':
                    if (questionTimer) {
                        clearInterval(questionTimer);
                        questionTimer = null;
                    }
                    quizIndicatorBtn.classList.add('hidden');
                    quizModal.classList.add('hidden');
                    
                    if (!isPresenter && !hasAnsweredThisRound) {
                        handleUnanswered(); // Klien mencatat "tidak menjawab"
                    }
                    
                    toggleSidebar(true);

                    if (isPresenter) {
                        // PRESENTATION LOGIC: HITUNG SKOR SECARA OTOMATIS
                        if (oldState === 'QUIZ_ACTIVE') {
                            // Presenter memanggil fungsi perhitungan terpusat
                            calculateAndPublishResults(classData); 
                        }
                        // Fungsi calculateAndPublishResults akan memindahkan state ke WAITING
                    }
                    break;

                case 'RESULTS_PUBLISHED':
                    if (questionTimer) clearInterval(questionTimer);
                    quizIndicatorBtn.classList.add('hidden');
                    quizModal.classList.add('hidden');
                    if (!isPresenter) {
                        calculateAndShowSummary();
                    }
                    break;
                
                case 'ENDED':
                    if (questionTimer) clearInterval(questionTimer);
                    quizIndicatorBtn.classList.add('hidden');
                    quizModal.classList.add('hidden');
                    if (isPresenter) {
                        quizBtn.disabled = true;
                        showResultsBtn.disabled = true;
                    }
                    break;
            }
        }

        // --- EVENT LISTENERS (HALAMAN MEET) ---

        backToHomeBtn.addEventListener('click', () => {
            showCustomConfirm(
                "Apakah Anda yakin ingin meninggalkan sesi?", 
                "Tinggalkan Sesi", 
                async () => { 
                    await handleSessionLeave(); 
                    window.location.hash = '#home'; 
                },
                "Tinggalkan",
                "bg-red-600"
            );
        });

        if (shareScreenBtn) {
            shareScreenBtn.addEventListener('click', async () => {
                if (sessionState.screenShareActive && isPresenter) {
                    await stopScreenShare();
                } else {
                    await startScreenShare();
                }
            });
        }

        openSidebarBtn.addEventListener('click', () => toggleSidebar(true));
        closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));

        closeSummaryBtn.addEventListener('click', () => {
            summaryModal.classList.add('hidden');
        });

        if (isPresenter) {
            if (quizBtn) quizBtn.addEventListener('click', openQuizManagementModal);
            if (showResultsBtn) showResultsBtn.addEventListener('click', showFinalResults);
            
            if (resetSessionBtn) {
                 resetSessionBtn.addEventListener('click', () => {
                    showCustomConfirm(
                        "Apakah Anda yakin ingin mereset semua skor untuk sesi ini?",
                        "Reset Sesi",
                        () => { 
                            resetSession();
                        },
                        "Reset",
                        "bg-red-600"
                    );
                });
            }

            if (closeQuizMgmtBtn) closeQuizMgmtBtn.addEventListener('click', closeQuizManagementModal);
            
            if (createNewQuizBtn) {
                 createNewQuizBtn.addEventListener('click', () => {
                    editingQuizId = null; 
                    showCreateQuizView();
                });
            }

            if (backToQuizListBtn) backToQuizListBtn.addEventListener('click', showQuizListView);
            if (addOptionBtn) addOptionBtn.addEventListener('click', () => addQuizOptionInput());
            if (createQuizForm) createQuizForm.addEventListener('submit', handleSaveQuiz);
        }

        if (!isPresenter) {
            if (quizIndicatorBtn) {
                quizIndicatorBtn.addEventListener('click', () => {
                    quizModal.classList.remove('hidden');
                });
            }
        }

        // --- SINKRONISASI REAL-TIME (onSnapshot) ---
        
        const docRef = doc(db, CLASS_COLLECTION_PATH, currentClassCode);
        unsubscribeFromSession = onSnapshot(docRef, (docSnap) => {
            console.log("Menerima pembaruan data dari Firestore...");
            if (docSnap.exists()) {
                handleStateUpdate(docSnap.data());
            } else {
                handleStateUpdate(null);
            }
        }, (error) => {
            console.error("Error mendengarkan onSnapshot:", error);
            showCustomAlert("Koneksi ke sesi terputus.", "Koneksi Error");
        });


        globalLeaveHandler = handleSessionLeave; 
        window.addEventListener('beforeunload', globalLeaveHandler);

        window.screenShareManager = screenShareManager;

        // Inisialisasi awal
        handleStateUpdate(initialClassData);
    }


    // --- ROUTER UTAMA ---

    function navigate() {
        const hash = window.location.hash || '#home';
        
        if (questionTimer) {
            clearInterval(questionTimer);
            questionTimer = null;
        }

        if (globalLeaveHandler) {
            window.removeEventListener('beforeunload', globalLeaveHandler);
            globalLeaveHandler = null; 
        }
        
        if (unsubscribeFromSession) {
            console.log("Berhenti mendengarkan sesi sebelumnya...");
            unsubscribeFromSession();
            unsubscribeFromSession = null;
        }

        if (screenShareManager) {
            if (screenShareManager.localStream || screenShareManager.peerConnection) {
                if (screenShareManager.isPresenter) {
                    screenShareManager.stopScreenShare();
                } else {
                    screenShareManager.leaveScreenShare();
                }
            }
            screenShareManager = null;
        }

        if (hash.startsWith('#meet')) {
            renderMeetPage();
        } else {
            renderHomePage();
        }
    }

    // Mulai navigasi saat halaman dimuat dan saat hash berubah
    window.addEventListener('hashchange', navigate);
    // Panggil sekali untuk memuat halaman awal
    navigate(); 
}