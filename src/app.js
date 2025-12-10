// fileName: app.js

import { ScreenShareManager } from './webrtc-screen-share.js';
import { FirebaseAuthProvider } from './auth.js';
import { onAuthStateChanged } from "firebase/auth";

let screenShareManager = null;
let authProvider = null;

export function startApp(firebaseServices) {
        
    const {
        db, auth, doc, getDoc, setDoc, updateDoc, collection, arrayUnion, serverTimestamp, onSnapshot,
        CLASS_COLLECTION_PATH
    } = firebaseServices;

    // Initialize AuthManager
    authProvider = new FirebaseAuthProvider(auth);

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
    const QUESTION_TIME = 10; // Waktu Quiz
    const CIRCUMFERENCE = 2 * Math.PI * 45;

    // Konstanta Poin Baru
    const POINTS_CORRECT = 10; // Benar
    const POINTS_WRONG = -5; // Salah
    const POINTS_UNANSWERED = -10; // Tidak menjawab
    const SPEED_POINTS = [3, 2, 1]; // Poin 3 Tercepat

    let currentClassCode = null;
    let currentUser = null; 
    let firebaseUser = null;
    let questionTimer = null;
    let timeLeft = 0;
    let globalLeaveHandler = null; 
    let unsubscribeFromSession = null; 
    let originalPresentationContent = null;
    let answerRank = 0; 
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
        }, 2500);
    }
    
    // Fungsi bantuan untuk menampilkan notif kedua dengan penundaan
    function showDelayedToast(message, bgColor, delay = 500) {
        setTimeout(() => {
            showToast(message, bgColor);
        }, delay);
    }

    // --- HALAMAN 0: LOGIN/REGISTER ---
    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user.emailVerified || user.providerData.some(p => p.providerId === 'google.com')) { 
                firebaseUser = user;
                firebaseServices.currentUserId = user.uid; // Update User ID
                console.log("Firebase User State: Logged In", user.uid);
                
                // Dapatkan nama user
                const userName = user.displayName || user.email.split('@')[0];
                
                // Set currentUser
                currentUser = { 
                    id: user.uid, 
                    name: userName, 
                    isPresenter: false, // Default: Peserta
                    score: 0, 
                    streak: 0, 
                    isOnline: true 
                }; 
                
                if (window.location.hash === '' || window.location.hash === '#login') {
                    window.location.hash = '#home';
                } else {
                    navigate();
                }
            } else {
                authProvider.logout(); 
                firebaseUser = null;
                firebaseServices.currentUserId = null;
                currentUser = null;
                if (window.location.hash !== '#login') {
                    window.location.hash = '#login';
                } else {
                    renderLoginPage();
                    showCustomAlert("Email Anda belum terverifikasi. Silakan cek email Anda.", "Verifikasi Diperlukan");
                }
            }
        } else {
            firebaseUser = null;
            firebaseServices.currentUserId = null;
            currentUser = null;
            console.log("Firebase User State: Logged Out");
            if (window.location.hash !== '#login') {
                window.location.hash = '#login';
            } else {
                renderLoginPage();
            }
        }
    });

    async function renderLoginPage() {
        currentClassCode = null;
        currentUser = null;
        
        if (firebaseUser) return;
        
        document.getElementById('modal-container').innerHTML = '';
        
        document.getElementById('app-router-outlet').innerHTML = `
            <div id="login-container" class="login-container">
                <div class="login-bg-grid"></div>
                <div class="blob-glow blob-blue"></div>
                <div class="blob-glow blob-purple"></div>

                <div class="login-content-wrapper">
                    
                    <div class="visual-container" id="visual-container">
                        <div id="tilt-card" class="tilt-card">
                            <div class="tilt-card-bg"></div>

                            <div class="absolute inset-0 flex items-center justify-center"
                                style="transform: translateZ(20px);">
                                <div class="tilt-icon-box">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"
                                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="1" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                        <polyline points="2 17 12 22 22 17"></polyline>
                                        <polyline points="2 12 12 17 22 12"></polyline>
                                    </svg>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="login-card">
                        <div class="card-padding">

                            <div class="header">
                                <h2>Selamat Datang</h2>
                                <p>Silakan login atau daftar untuk melanjutkan</p>
                            </div>
                            
                            <div class="mb-6">
                                <div class="flex border-b border-gray-700">
                                    <button id="login-tab-btn" class="tab-btn tab-btn-active">Login</button>
                                    <button id="register-tab-btn" class="tab-btn tab-btn-inactive">Daftar</button>
                                </div>
                            </div>

                            <form id="login-form" class="form-wrapper">
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-input"
                                        placeholder="Masukkan email Anda" required>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Password</label>
                                    <input type="password" class="form-input"
                                        placeholder="Masukkan password Anda" required>
                                </div>

                                <button type="submit" class="btn-login">
                                    Login dengan Email
                                </button>
                            </form>

                            <form id="register-form" class="form-wrapper hidden">
                                <div class="form-group">
                                    <label class="form-label">Nama Pengguna</label>
                                    <input type="text" class="form-input" placeholder="Pilih nama yang akan ditampilkan" maxlength="30" required>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input type="email" class="form-input" placeholder="Masukkan email Anda" required>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Password</label>
                                    <input type="password" class="form-input" placeholder="Buat password (min. 6 karakter)" minlength="6" required>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Konfirmasi Password</label>
                                    <input type="password" class="form-input" placeholder="Ulangi password" minlength="6" required>
                                </div>
                                <button type="submit" class="btn-success">
                                    Daftar & Kirim Verifikasi
                                </button>
                            </form>
                            
                            <div class="divider">
                                <div class="divider-line"></div>
                                <span class="divider-text">ATAU</span>
                                <div class="divider-line"></div>
                            </div>

                            <button id="google-login-btn" class="btn-google">
                                <svg class="google-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24" height="24">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,19.5-8.521,19.5-19.5c0-1.207-0.127-2.388-0.319-3.53Z"/>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.991,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,3.619,1.076,7.019,2.923,9.882l6.568-5.118C12.339,27.186,12,25.613,12,24C12,20.444,13.232,17.202,15.263,14.691L6.306,14.691z"/>
                                    <path fill="#4CAF50" d="M14.263,33.309C16.353,35.795,19.743,38,24,38c3.844,0,7.188-1.464,9.663-3.039l5.657,5.657C34.046,42.947,29.268,44,24,44C12.955,44,4,35.045,4,24c0-1.207-0.127-2.388-0.319-3.53L6.306,24.691L6.306,33.309z"/>
                                    <path fill="#1976D2" d="M24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4c-3.619,0-7.019,1.076-9.882,2.923l6.568,5.118C20.768,12.798,24,12,24,12z"/>
                                </svg>
                                <span id="google-btn-text">Login dengan Google</span>
                            </button>
                        </div>
                        
                        <div class="features-container">
                            <div class="features-grid">
                                <div class="feature-item">
                                    <div class="feature-icon-box icon-blue">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                    </div>
                                    <p class="feature-text">Real-time</p>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon-box icon-purple">                                     
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                                    </div>
                                    <p class="feature-text">Interaktif</p>
                                </div>
                                <div class="feature-item">
                                    <div class="feature-icon-box icon-green">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                                    </div>
                                    <p class="feature-text">Gratis</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="footer-copy animate-fade-in-delayed">
                        <p>© 2024 Rapath • Made for education</p>
                    </div>
                </div>
            </div>
        `;

        // --- Event listeners baru untuk Tab dan Form Native ---
        const loginTabBtn = document.getElementById('login-tab-btn');
        const registerTabBtn = document.getElementById('register-tab-btn');
        const loginForm = document.getElementById('login-form');
        const registerForm = document.getElementById('register-form');
        const googleLoginBtn = document.getElementById('google-login-btn');
        const registerUsernameInput = document.getElementById('register-username'); // BARU: untuk ambil nama daftar
        
        function activateTab(tabName) {
            const googleBtnText = document.getElementById('google-btn-text');
            
            if (tabName === 'login') {
                loginTabBtn.classList.add('tab-btn-active')
                loginTabBtn.classList.remove('tab-btn-inactive');
                registerTabBtn.classList.add('tab-btn-inactive');
                registerTabBtn.classList.remove('tab-btn-active');
                loginForm.classList.remove('hidden');
                registerForm.classList.add('hidden');
                
                if (googleBtnText) googleBtnText.textContent = 'Login dengan Google'; 
                
            } else { // register
                registerTabBtn.classList.add('tab-btn-active');
                registerTabBtn.classList.remove('tab-btn-inactive');                     
                loginTabBtn.classList.add('tab-btn-inactive');
                loginTabBtn.classList.remove('tab-btn-active');
                registerForm.classList.remove('hidden');
                loginForm.classList.add('hidden');
                if (googleBtnText) googleBtnText.textContent = 'Daftar dengan Google';
            }
        }
        
        loginTabBtn.addEventListener('click', () => activateTab('login'));
        registerTabBtn.addEventListener('click', () => activateTab('register'));

        googleLoginBtn.addEventListener('click', async () => {
            const googleBtnText = document.getElementById('google-btn-text');
            const isRegisterAttempt = googleBtnText.textContent.includes('Daftar');
            
            let result;

            if (isRegisterAttempt) {
                const displayName = registerUsernameInput.value.trim();
                if (!displayName) {
                    return showCustomAlert("Harap isi Nama Pengguna untuk Daftar dengan Google.", "Input Kosong");
                }
                result = await authProvider.registerWithGoogle(displayName); 
            } else {
                result = await authProvider.loginWithGoogle();
            }

            if (result.success) {
                showToast(result.message, "bg-blue-600");
            } else if (result.alreadyExists) {
                activateTab('login');
                showCustomAlert(result.message, 'Registrasi Gagal');
            } else if (result.notExists) {
                activateTab('register');
                showCustomAlert(result.message, 'Login Gagal');
            } else {
                showCustomAlert(result.message, 'Otentikasi Gagal');
            }
        });
        
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value.trim();
            
            if (!email || !password) return showCustomAlert("Harap isi email dan password.", "Input Kosong");

            const result = await authProvider.loginWithEmailPassword(email, password);
            
            if (result.success) {
                showToast("Login Berhasil!", "bg-blue-600");
            } else if (result.needsVerification) {
                showCustomAlert(result.message, 'Verifikasi Email');
            } else {
                showCustomAlert(result.message, 'Login Gagal');
            }
        });
        
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const displayName = document.getElementById('register-username').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value.trim();
            const confirmPassword = document.getElementById('register-confirm-password').value.trim();
            
            if (!displayName || !email || !password || !confirmPassword) {
                return showCustomAlert("Harap lengkapi semua bidang.", "Input Kosong");
            }
            if (password !== confirmPassword) {
                return showCustomAlert("Password dan konfirmasi password tidak cocok.", "Password Tidak Cocok");
            }
            if (password.length < 6) {
                return showCustomAlert("Password minimal 6 karakter.", "Password Terlalu Pendek");
            }

            const result = await authProvider.registerWithEmailPassword(email, password, displayName);
            
            if (result.success) {
                activateTab('login');
                showCustomAlert(result.message, 'Verifikasi Email Dikirim');
                document.getElementById('login-email').value = email;
            } else {
                showCustomAlert(result.message, 'Registrasi Gagal');
            }
        });


        const container = document.getElementById('login-container');
        const card = document.getElementById('tilt-card');
        if (container && card) {
            container.addEventListener('mousemove', (e) => {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 20;
                const yAxis = (window.innerHeight / 2 - e.pageY) / 20;
                card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
            });

            container.addEventListener('mouseleave', () => {
                card.style.transition = 'all 0.5s ease';
                card.style.transform = `rotateY(-15deg) rotateX(10deg)`;
            });
            
            container.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        }
    }
    
    // --- HALAMAN 1: HOME (BUAT/GABUNG) ---
    async function renderHomePage() {
        if (!firebaseUser) {
            window.location.hash = '#login';
            return;
        }
        const params = new URLSearchParams(window.location.hash.split('?')[1] || '');

        currentClassCode = null;
        currentUser = null;
        let importedQuizList = [];
        
        document.getElementById('modal-container').innerHTML = '';        
        const loggedInUsername = firebaseUser.displayName || firebaseUser.email.split('@')[0];
        
        document.getElementById('app-router-outlet').innerHTML = `
            <div class="top-bar">
                <button id="logout-btn" class="logout-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                        viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="logout-icon">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                        <polyline points="16 17 21 12 16 7"/>
                        <line x1="21" y1="12" x2="9" y2="12"/>
                    </svg>
                    Logout
                </button>
            </div>

            <div class="home-wrapper">
                <div class="home-container">

                    <div class="home-header">
                        <div class="app-logo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 20v-6M6 20v-4M18 20v-8M10 20h4M6 12H4a2 2 0 0 1-2-2V4
                                        a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6
                                        a2 2 0 0 1-2 2h-2M6 6h.01M10 6h.01M14 6h.01"/>
                            </svg>
                        </div>

                        <h1 class="app-title">Rapath</h1>
                        <p class="app-subtitle">
                            Selamat datang,
                            <span class="username">${loggedInUsername}</span>!
                        </p>
                    </div>

                    <div class="admin-card">
                        <h2 class="card-title">Admin</h2>

                        <div class="admin-actions">
                            <button id="create-btn" class="btn-primary">
                                Buat Sesi Baru
                            </button>

                            <div class="import-wrapper">
                                <input type="file" id="excel-input"
                                    accept=".xlsx, .xls"
                                    class="hidden" />

                                <button id="import-excel-btn" class="btn-excel">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="20" height="20"
                                        viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="import-icon">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16
                                                a2 2 0 0 0 2 2h12
                                                a2 2 0 0 0 2-2V8z"/>
                                        <polyline points="14 2 14 8 20 8"/>
                                        <line x1="12" y1="18" x2="12" y2="12"/>
                                        <line x1="9" y1="15" x2="15" y2="15"/>
                                    </svg>
                                    Import Quiz (.xlsx)
                                </button>

                                <div id="import-status"
                                    class="import-status hidden"></div>
                            </div>
                        </div>
                    </div>

                    <div class="participant-card">
                        <h2 class="card-title">Peserta</h2>

                        <form id="join-form" class="join-form">
                            <div>
                                <label for="class-code" class="form-label">
                                    Kode Sesi
                                </label>

                                <input type="text"
                                    id="class-code"
                                    placeholder="e.g., QUIZ-AB3X9"
                                    class="form-input code-input"
                                    maxlength="10"
                                    required>
                            </div>

                            <button type="submit" class="btn-success">
                                Gabung Sesi
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        `;

        // --- Event Listeners Halaman Home ---
        const userId = firebaseUser.uid;
        if (!userId) {
            showCustomAlert("Gagal mengautentikasi pengguna. Silakan segarkan halaman.", "Auth Error");
            return;
        }

        // Logout button
        document.getElementById('logout-btn').addEventListener('click', () => {
            showCustomConfirm(
                "Apakah Anda yakin ingin logout?",
                "Konfirmasi Logout",
                async () => { 
                    const result = await authProvider.logout();
                    if (result.success) {
                    } else {
                        showCustomAlert(result.message, 'Logout Gagal');
                    }
                },
                "Logout",
                "bg-red-600"
            );
        });

        const createBtn = document.getElementById('create-btn')
        const importBtn = document.getElementById('import-excel-btn');
        const fileInput = document.getElementById('excel-input');
        const importStatus = document.getElementById('import-status');

        importBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    
                    // Convert sheet to JSON array
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" }); // defval "" penting untuk merged cells
                    
                    // PARSING LOGIC UNTUK MERGED CELLS
                    const parsedQuizList = [];
                    let currentQuestionObj = null;

                    jsonData.forEach((row) => {
                        const questionVal = row['Question'] || row['question'] || "";
                        const optionLabel = row['Option'] || row['option'] || "";
                        const answerText = row['Answer'] || row['answer'] || "";
                        const rightAnswerVal = row['Correct Answer'] || row['correct answer'] || "";

                        if (questionVal && questionVal.trim() !== "") {
                            if (currentQuestionObj) validateAndPush(currentQuestionObj, parsedQuizList);
                            currentQuestionObj = {
                                id: Date.now() + Math.random(),
                                q: questionVal,
                                options: [],       
                                optionLabels: [],  
                                correctAnswerLabel: rightAnswerVal 
                            };
                        }

                        if (currentQuestionObj) {
                            if (answerText && answerText.trim() !== "") {
                                currentQuestionObj.options.push(answerText);
                                currentQuestionObj.optionLabels.push(optionLabel.trim().toUpperCase());
                            }
                            if (rightAnswerVal && rightAnswerVal.trim() !== "") {
                                currentQuestionObj.correctAnswerLabel = rightAnswerVal.trim().toUpperCase();
                            }
                        }
                    });

                    if (currentQuestionObj) validateAndPush(currentQuestionObj, parsedQuizList);

                    if (parsedQuizList.length > 0) {
                        // --- SUKSES IMPORT ---
                        importedQuizList = parsedQuizList; // Simpan ke variabel lokal
                        
                        // Update UI Tombol Buat agar user tahu data sudah masuk
                        createBtn.innerHTML = `Buat Sesi`;
                        
                        importStatus.classList.remove('hidden', 'text-red-400');
                        importStatus.classList.add('text-green-400');
                        importStatus.innerHTML = `✅ ${parsedQuizList.length} Soal Siap!`;
                        showToast(`${parsedQuizList.length} Soal Berhasil Diimport!`, "bg-green-600");
                    } else {
                        throw new Error("Tidak ada soal valid.");
                    }

                } catch (err) {
                    console.error("Excel Error:", err);
                    importStatus.classList.remove('hidden', 'text-green-400');
                    importStatus.classList.add('text-red-400');
                    importStatus.textContent = "Gagal membaca format file.";
                    showCustomAlert("Gagal import. Cek format Excel.", "Error");
                }
            };
            reader.readAsArrayBuffer(file);
        });

        function validateAndPush(qObj, list) {
            let correctIndices = [];
            
            if (qObj.correctAnswerLabel) {
                // 1. Pecah string kunci (misal "A, C" atau "A;B") menjadi array
                // Split berdasarkan koma (,), titik koma (;), atau spasi
                const rawKeys = qObj.correctAnswerLabel.toString().split(/[,;\s]+/);
                
                // 2. Cari index untuk setiap kunci yang ditemukan
                rawKeys.forEach(key => {
                    const cleanKey = key.trim().toUpperCase();
                    // Cari posisi huruf di optionLabels (A=0, B=1, dst)
                    const idx = qObj.optionLabels.indexOf(cleanKey);
                    if (idx !== -1) {
                        correctIndices.push(idx);
                    }
                });
            }

            // Validasi: Minimal 2 opsi dan minimal ada 1 kunci jawaban valid
            if (qObj.options.length >= 2 && correctIndices.length > 0) {
                list.push({
                    id: list.length + 1,
                    q: qObj.q,
                    options: qObj.options,
                    correct: correctIndices // SEKARANG MENYIMPAN ARRAY (Contoh: [0, 2] untuk A dan C)
                });
            } else {
                console.warn("Soal dilewati (tidak valid/opsi kurang/kunci salah):", qObj.q);
            }
        }

        document.getElementById('create-btn').addEventListener('click', async () => {
            const code = generateClassCode();
            const presenterId = firebaseUser.uid;
            if (!presenterId) return showCustomAlert("Auth tidak siap.", "Error");

            const userName = loggedInUsername;

            let finalQuizList = [];
            
            if (importedQuizList && importedQuizList.length > 0) {
                console.log("Menggunakan Soal Import:", importedQuizList);
                finalQuizList = importedQuizList;
            }

            const newClassData = {
                code: code,
                createdAt: serverTimestamp(),
                quizList: finalQuizList,
                participantList: [
                    { id: presenterId, name: userName, isPresenter: true, score: 0, streak: 0, isOnline: true }
                ],
                sessionState: {
                    state: 'WAITING',
                    currentQuestionId: null,
                    quizStartTime: null,
                    totalQuestions: 0,
                    currentAnswers: {},
                    screenShareActive: false,
                    screenShareOffer: null,
                    screenShareOffers: null,
                    screenShareAnswers: {},
                    screenShareIceCandidates: null,
                    questionActive: false, // Status sesi tanya jawab
                    questionsQueue: [], // Array penampung pertanyaan
                },
                engagementStats: {
                    [presenterId]: { totalAnswered: 0, correctAnswers: 0, totalResponseTime: 0, totalSpeedScore: 0 }
                },
                quizSessionHistory: [],
            };

            try {
                const docRef = doc(db, CLASS_COLLECTION_PATH, code);
                await setDoc(docRef, newClassData);
                
                const user = { id: presenterId, name: userName, isPresenter: true };
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
            const userName = loggedInUsername;
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

            const isParticipantAlreadyRegistered = classData.participantList.some(p => 
                p.id === userId && p.name === userName
            );
            
            const newUser = { id: userId, name: userName, isPresenter: false, score: 0, streak: 0, isOnline: true };
            
            try {
                const docRef = doc(db, CLASS_COLLECTION_PATH, classCode);
                
                if (isParticipantAlreadyRegistered) {
                    const updatedList = classData.participantList.map(p => 
                        p.id === userId && p.name === userName ? { ...p, isOnline: true } : p
                    );
                    await updateDoc(docRef, { participantList: updatedList });

                } else {
                    await updateDoc(docRef, {
                        participantList: arrayUnion(newUser),
                        [`engagementStats.${userId}`]: { totalAnswered: 0, correctAnswers: 0, totalResponseTime: 0, totalSpeedScore: 0 }
                    });
                }


                const user = { id: userId, name: loggedInUsername, isPresenter: true };
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
        if (!firebaseUser) {
            window.location.hash = '#login';
            return;
        }

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
            <div class="meet-layout">
                <main id="main-content" class="main-content">
                    <div class="presentation-container">
                        <div id="presentation-area" class="presentation-placeholder">
                            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                            <span class="presentation-text">Layar Presentasi</span>
                        </div>
                    </div>

                    ${isPresenter ? `
                    <div id="presenter-controls-header" class="presenter-controls">
                        <button id="quiz-btn" class="btn-control btn-blue">Kuis</button>
                        <button id="show-results-btn" class="btn-control btn-green">Hasil</button>
                        
                        <button id="toggle-qa-btn" class="btn-control btn-purple">
                            <span id="qa-status-text">Mulai Q&A</span>
                        </button>
                        <button id="view-qa-btn" class="btn-control btn-gray">
                            Pertanyaan
                            <span id="qa-badge" class="notification-badge hidden">0</span>
                        </button>
                    </div>
                    ` : ''}
                    
                    <button id="quiz-indicator-btn" class="quiz-indicator hidden">
                        Kuis Baru <span id="indicator-timer-text" class="timer-pill"></span>
                    </button>

                    <button id="ask-question-btn" class="ask-btn-float hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                        Tanya Sesuatu
                    </button>
                </main>

                <aside id="sidebar" class="sidebar">
                    <div class="sidebar-header">
                        <h2 class="sidebar-title">Leaderboard</h2>
                        <button id="close-sidebar-btn" class="btn-icon-only">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>
                    <ul id="leaderboard-list" class="leaderboard-container custom-scrollbar"></ul>
                    <div class="participant-footer">
                        <h3 class="text-lg font-bold text-gray-900 mb-3">Peserta (<span id="participant-count">0</span>)</h3>
                        <div id="participant-list-container" class="participant-grid"></div>
                    </div>
                </aside>
            </div>

            <footer class="meet-footer">
                <div class="session-info">Sesi: <span class="font-mono">${currentClassCode}</span></div>
                
                <div class="footer-controls">
                    <button id="back-to-home-btn" title="Kembali ke Home" class="footer-btn footer-btn-red">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    </button>
                    <button class="footer-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                    </button>
                    <button class="footer-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                    </button>
                    
                    <button id="share-screen-btn" title="Bagikan Layar" class="footer-btn">
                        <svg id="share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5"/><path d="M7 2v4"/><path d="M17 2v4"/><rect width="20" height="4" x="2" y="16"/><path d="M17 22l5-5-5-5"/><path d="M22 17H10"/></svg>
                        <svg id="stop-share-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hidden"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect></svg>
                    </button>

                    ${isPresenter ? `
                    <button id="reset-session-btn" title="Reset Sesi" class="footer-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-rotate-ccw-icon lucide-rotate-ccw"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                    </button>
                    ` : ''}
                </div>

                <div class="footer-controls">
                    <button id="open-sidebar-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    </button>
                </div>
            </footer>
        `;

        document.getElementById('modal-container').innerHTML = `
            <div id="result-toast" class="fixed top-24 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-lg text-white font-semibold shadow-2xl transition-all duration-300 opacity-0 -translate-y-10 hidden">
                <span id="toast-message"></span>
            </div>

            <div id="quiz-modal" class="modal-backdrop hidden">
                <div class="modal-content-base quiz-modal-box">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-blue-600">Kuis Cepat!</h3>
                        <div class="timer-container">
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

            <div id="summary-modal" class="modal-backdrop hidden">
                <div class="modal-content-base summary-modal-box">
                    <h2 class="text-3xl font-bold text-center text-blue-600 mb-8">Rekap Keterlibatan</h2>
                    <div class="summary-grid">
                        <div class="stat-card stat-blue">
                            <div class="stat-label text-blue-800">Skor Akhir</div>
                            <div id="summary-score" class="stat-value text-blue-600">0</div>
                        </div>
                        <div class="stat-card stat-gray">
                            <div class="stat-label text-gray-800">Peringkat Anda</div>
                            <div id="summary-rank" class="stat-value text-gray-600">#0 / 0</div>
                        </div>
                        <div class="stat-card stat-green">
                            <div class="stat-label text-green-800">Akurasi</div>
                            <div id="summary-accuracy" class="stat-value text-green-600">0%</div>
                        </div>
                        <div class="stat-card stat-yellow">
                            <div class="stat-label text-yellow-800">Kecepatan Rata-rata</div>
                            <div id="summary-speed" class="stat-value text-yellow-600">0s</div>
                        </div>
                    </div>
                    <p class="text-center text-gray-600 mb-8">Kerja bagus hari ini! Anda menjawab <span id="summary-answered" class="font-bold">0</span> dari <span id="summary-total-q" class="font-bold">0</span> pertanyaan.</p>
                    <div class="text-center">
                        <button id="close-summary-btn" class="btn-control btn-blue py-3 px-8">
                            Tutup
                        </button>
                    </div>
                </div>
            </div>

            <div id="quiz-management-modal" class="modal-backdrop hidden">
                <div class="modal-content-base quiz-mgmt-box">
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
                                <button id="create-new-quiz-btn" class="btn-control btn-blue">
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
                                    <button id="add-option-btn" type="button" class="btn-control bg-gray-200 text-gray-800 hover:bg-gray-300">
                                        Tambah Opsi
                                    </button>
                                    <button id="save-quiz-btn" type="submit" class="btn-control btn-green">
                                        Simpan Kuis
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div id="qa-submit-modal" class="modal-backdrop hidden">
                <div class="modal-content-base qa-modal-box">
                    <h3 class="text-xl font-bold text-purple-600 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
                        Ajukan Pertanyaan
                    </h3>
                    <textarea id="qa-input-text" rows="4" class="qa-textarea" placeholder="Ketik pertanyaan Anda di sini..."></textarea>
                    <div class="flex justify-end space-x-2">
                        <button id="qa-cancel-btn" class="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium hover:bg-gray-100 rounded-lg transition-all">Batal</button>
                        <button id="qa-send-btn" class="btn-control btn-purple">Kirim</button>
                    </div>
                </div>
            </div>

            <div id="qa-management-modal" class="fixed inset-0 z-[60] hidden bg-white">
                
                <div class="w-full h-full text-gray-900 flex flex-col">
                    
                    <div class="p-5 border-b border-gray-200 flex justify-between items-center bg-purple-50">
                        <h2 class="text-2xl font-bold text-gray-900 flex items-center">
                            <span class="bg-purple-100 text-purple-600 p-2 rounded-lg mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                            </span>
                            Daftar Pertanyaan
                        </h2>
                        <button id="close-qa-mgmt-btn" class="text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 hover:bg-gray-100 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                    </div>

                    <div class="flex border-b border-gray-200 bg-white">
                        <button id="tab-incoming" class="flex-1 py-3 text-sm font-bold text-purple-600 border-b-2 border-purple-600 hover:bg-purple-50 transition-all flex justify-center items-center gap-2">
                            Baru Masuk 
                            <span id="count-incoming" class="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">0</span>
                        </button>
                        <button id="tab-graded" class="flex-1 py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:bg-gray-50 transition-all flex justify-center items-center gap-2">
                            Sudah Dinilai 
                            <span id="count-graded" class="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">0</span>
                        </button>
                    </div>

                    <div id="qa-list-container" class="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-50 space-y-6">
                        <div class="text-center text-gray-500 mt-10">Belum ada pertanyaan masuk.</div>
                    </div>
                </div>
            </div>
        `;

        initializeAppLogic(isPresenter, classData);
    }
    
    function initializeAppLogic(isPresenter, initialClassData) {
        let classData = initialClassData;
        const selfRecord = classData.participantList.find(p => p.id === currentUser.id);
        if (selfRecord && !selfRecord.isOnline) {
            selfRecord.isOnline = true;
            updateDoc(doc(db, CLASS_COLLECTION_PATH, currentClassCode), {
                participantList: classData.participantList
            });
        }
        if (selfRecord) {
            currentUser = selfRecord;
        }

        let sessionState = initialClassData.sessionState;
        let editingQuizId = null;
        let hasAnsweredThisRound = false;
        let isLeaving = false; 

        // --- ELEMEN DOM ---
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
        const toggleQaBtn = document.getElementById('toggle-qa-btn');
        const qaStatusText = document.getElementById('qa-status-text');
        const viewQaBtn = document.getElementById('view-qa-btn');
        const qaBadge = document.getElementById('qa-badge');
        const askQuestionBtn = document.getElementById('ask-question-btn');
        const qaSubmitModal = document.getElementById('qa-submit-modal');
        const qaInputText = document.getElementById('qa-input-text');
        const qaCancelBtn = document.getElementById('qa-cancel-btn');
        const qaSendBtn = document.getElementById('qa-send-btn');
        const qaMgmtModal = document.getElementById('qa-management-modal');
        const closeQaMgmtBtn = document.getElementById('close-qa-mgmt-btn');
        const qaListContainer = document.getElementById('qa-list-container');
        const tabIncoming = document.getElementById('tab-incoming');
        const tabGraded = document.getElementById('tab-graded');
        const countIncoming = document.getElementById('count-incoming');
        const countGraded = document.getElementById('count-graded');

        let qaActiveTab = 'incoming';
        
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
                let rankClass = "rank-other";
                if (rank === 1) rankClass = "rank-1";
                if (rank === 2) rankClass = "rank-2";
                if (rank === 3) rankClass = "rank-3";
                
                const isYou = user.id === currentUser.id;
                
                // Ganti class dynamic di string
                const userHtml = `
                    <li class="leaderboard-item ${isYou ? 'is-you' : 'normal'}">
                        <div class="flex items-center">
                            <span class="rank-number ${rankClass}">#${rank}</span>
                            <div class="user-info">
                                <span class="user-name">${user.name}${isYou ? ' (Anda)' : ''}</span>
                                <div class="text-xs text-gray-500 mt-0.5 flex items-center space-x-2">
                                    ${user.streak >= 3 ? `<span class="streak-badge">🔥 ${user.streak} Streak</span>` : ''}
                                </div>
                            </div>
                        </div>
                        <span class="score-text">${user.score}</span>
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
                    <div class="participant-avatar-container" title="${user.name}${isYou ? ' (Anda)' : ''}">
                        <div class="participant-avatar ${isYou ? 'is-you' : 'others'}">
                            ${initials}
                        </div>
                        <span class="participant-name-small">${user.name}${isYou ? ' (Anda)' : ''}</span>
                    </div>
                `;
                participantListContainer.innerHTML += userHtml;
            });
        }

        function toggleSidebar(forceOpen = null) {
            const mainContent = document.getElementById('main-content');
            // Cek apakah sidebar punya class open
            const isOpen = sidebar.classList.contains('open');
            
            let shouldOpen;
            if (forceOpen === true) shouldOpen = true;
            else if (forceOpen === false) shouldOpen = false;
            else shouldOpen = !isOpen; // Toggle

            if (shouldOpen) {
                // BUKA SIDEBAR
                sidebar.classList.add('open');
                
                if (mainContent) {
                    mainContent.classList.add('sidebar-open'); 
                }
            } else {
                // TUTUP SIDEBAR
                sidebar.classList.remove('open');
                if (mainContent) {
                    mainContent.classList.remove('sidebar-open');
                }
            }
        }

        function renderQnAList(questions) {
            questions = questions || [];

            // 1. UPDATE BADGE COUNTER
            const incomingCount = questions.filter(q => !q.isGraded).length;
            const gradedCount = questions.filter(q => q.isGraded).length;

            if (countIncoming) countIncoming.textContent = incomingCount;
            if (countGraded) countGraded.textContent = gradedCount;

            // 2. UPDATE TAMPILAN TAB
            if (tabIncoming && tabGraded) {
                if (qaActiveTab === 'incoming') {
                    tabIncoming.className = "flex-1 py-3 text-sm font-bold text-purple-600 border-b-2 border-purple-600 bg-purple-50 transition-all flex justify-center items-center gap-2";
                    tabGraded.className = "flex-1 py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:bg-gray-50 transition-all flex justify-center items-center gap-2";
                } else {
                    tabIncoming.className = "flex-1 py-3 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:text-gray-700 hover:bg-gray-50 transition-all flex justify-center items-center gap-2";
                    tabGraded.className = "flex-1 py-3 text-sm font-bold text-green-600 border-b-2 border-green-600 bg-green-50 transition-all flex justify-center items-center gap-2";
                }
            }

            // 3. FILTER PERTANYAAN
            const filteredQuestions = questions.filter(q => {
                return qaActiveTab === 'incoming' ? !q.isGraded : q.isGraded;
            });

            // 4. CEK JIKA KOSONG
            if (filteredQuestions.length === 0) {
                const emptyMsg = qaActiveTab === 'incoming' ? "Tidak ada pertanyaan baru." : "Belum ada pertanyaan yang dinilai.";
                qaListContainer.innerHTML = `<div class="text-center text-gray-500 mt-10 italic">${emptyMsg}</div>`;
                return;
            }

            // 5. GROUPING PER USER
            const groupedQuestions = {};
            filteredQuestions.forEach(q => {
                if (!groupedQuestions[q.userId]) groupedQuestions[q.userId] = { name: q.userName, questions: [] };
                groupedQuestions[q.userId].questions.push(q);
            });

            qaListContainer.innerHTML = '';

            // 6. RENDER LIST (Looping Group)
            // Sort user berdasarkan pertanyaan terbaru
            const sortedUserIds = Object.keys(groupedQuestions).sort((a, b) => {
                const lastQa = groupedQuestions[a].questions[groupedQuestions[a].questions.length - 1].timestamp;
                const lastQb = groupedQuestions[b].questions[groupedQuestions[b].questions.length - 1].timestamp;
                return lastQb - lastQa;
            });

            sortedUserIds.forEach(userId => {
                const group = groupedQuestions[userId];

                // Container untuk Grup User
                const groupHtml = document.createElement('div');
                groupHtml.className = `qa-item-group`;

                groupHtml.innerHTML = `
                    <div class="qa-group-header">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                                ${group.name.substring(0, 2).toUpperCase()}
                            </div>
                            <span class="font-bold text-gray-800 text-sm md:text-base">${group.name}</span>
                        </div>
                        <span class="text-xs font-mono bg-white px-2 py-1 rounded border border-gray-300 text-gray-500">${group.questions.length} item</span>
                    </div>
                    <div class="p-4 space-y-4 question-items-container bg-gray-50"></div>
                `;

                const itemsContainer = groupHtml.querySelector('.question-items-container');

                // Sort pertanyaan di dalam grup (terbaru di atas)
                group.questions.sort((a, b) => b.timestamp - a.timestamp);

                group.questions.forEach(q => {
                    const itemDiv = document.createElement('div');
                    const timestamp = new Date(q.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                    itemDiv.className = `qa-item-card ${
                        q.isGraded 
                        ? 'qa-item-graded' 
                        : 'qa-item-incoming'
                    }`;

                    // Logic Tampilan Kontrol (Input Poin)
                    let controlsHtml = q.isGraded ? `
                        <div class="flex-shrink-0 mt-3 md:mt-0 md:ml-4 flex items-center self-start md:self-center">
                            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="mr-1.5"><polyline points="20 6 9 17 4 12"></polyline></svg> 
                                ${q.pointsAwarded > 0 ? '+' : ''}${q.pointsAwarded} Poin
                            </span>
                        </div>` : `
                        <div class="flex-shrink-0 mt-3 md:mt-0 md:ml-4 flex items-center space-x-2 self-start md:self-center">
                            <input type="number" min="-10" max="10" value="0" id="grade-input-${q.id}" 
                                class="grade-input" placeholder="0">
                            <button class="give-points-btn btn-control btn-purple text-sm" 
                                data-qid="${q.id}" data-uid="${userId}">
                                Nilai
                            </button>
                        </div>`;

                    itemDiv.innerHTML = `
                        <div class="flex-1 min-w-0 pr-0 md:pr-4 text-left">
                            <p class="text-gray-800 font-medium text-sm md:text-base leading-relaxed break-words whitespace-pre-wrap">${q.text}</p>
                            <div class="flex items-center mt-2 text-xs text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mr-1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 
                                ${timestamp}
                            </div>
                        </div>
                        ${controlsHtml}`;
                    
                    itemsContainer.appendChild(itemDiv);
                });
                qaListContainer.appendChild(groupHtml);
            });

            // 7. ATTACH EVENT LISTENER (Untuk tombol nilai)
            if (qaActiveTab === 'incoming') {
                document.querySelectorAll('.give-points-btn').forEach(btn => {
                    btn.addEventListener('click', async () => {
                        const qId = btn.dataset.qid;
                        const uId = btn.dataset.uid;
                        const inputEl = document.getElementById(`grade-input-${qId}`);
                        const points = parseInt(inputEl.value);

                        if (isNaN(points) || points < -10 || points > 10) return showCustomAlert("Masukkan poin valid (-10 sampai 10).");

                        // Panggil fungsi handleGradeQuestion yang sudah ada di app.js
                        await handleGradeQuestion(qId, uId, points);
                    });
                });
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
                    <li class="quiz-list-item">
                        <span class="text-gray-800 font-medium truncate w-3/5" title="${quiz.q}">${quiz.q}</span>
                        <div class="flex space-x-2">
                            <button class="quiz-edit-btn btn-control btn-yellow text-sm" data-id="${quiz.id}">
                                Edit
                            </button>
                            <button class="quiz-start-btn btn-control btn-green text-sm" data-id="${quiz.id}">
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
            const optionHtml = `
                <div class="flex items-center space-x-2 quiz-option-input border border-gray-300 rounded-md p-2">
                    <input type="checkbox" class="correct-answer-checkbox form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500" ${isCorrect ? 'checked' : ''}>
                    
                    <input type="text" class="option-text-input w-full border-0 focus:ring-0 p-1" placeholder="Ketik opsi jawaban..." value="${value}">
                    <button type="button" class="remove-option-btn text-gray-400 hover:text-red-500" title="Hapus opsi">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>
            `;
            createOptionsContainer.insertAdjacentHTML('beforeend', optionHtml);
            
            // Re-attach event listener untuk tombol hapus
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
            const correctIndices = []; // PERUBAHAN: Gunakan array untuk menyimpan banyak jawaban benar

            optionsElements.forEach((el, index) => {
                const text = el.querySelector('.option-text-input').value.trim();
                // PERUBAHAN: Gunakan class checkbox, bukan radio
                const checkbox = el.querySelector('.correct-answer-checkbox');
                const isChecked = checkbox ? checkbox.checked : false; 
                
                if (text) {
                    options.push(text);
                    // Jika dicentang, masukkan index opsi ini ke array kunci jawaban
                    if (isChecked) {
                        correctIndices.push(options.length - 1);
                    }
                }
            });

            // Validasi Opsi
            if (options.length < 2) return showCustomAlert('Harap berikan setidaknya 2 opsi jawaban yang valid.', 'Input Tidak Valid');
            
            // Validasi Kunci Jawaban (Minimal 1 harus dicentang)
            if (correctIndices.length === 0) return showCustomAlert('Silakan pilih setidaknya satu jawaban yang benar.', 'Input Tidak Valid');

            // Susun Objek Kuis
            const newQuizData = {
                q: question,
                options: options,
                correct: correctIndices // Simpan sebagai Array
            };

            if (editingQuizId) {
                // UPDATE KUIS LAMA
                const quizIndex = classData.quizList.findIndex(q => q.id === editingQuizId);
                if (quizIndex !== -1) {
                    // Gunakan spread operator untuk update field tertentu saja
                    classData.quizList[quizIndex] = {
                        ...classData.quizList[quizIndex],
                        ...newQuizData
                    };
                }
            } else {
                // BUAT KUIS BARU
                const newId = classData.quizList.length > 0 ? Math.max(...classData.quizList.map(q => q.id)) + 1 : 1;
                classData.quizList.push({
                    id: newId,
                    ...newQuizData
                });
            }
            
            // Simpan ke Firebase
            try {
                await updateDoc(doc(db, CLASS_COLLECTION_PATH, currentClassCode), {
                    quizList: classData.quizList
                });
                
                showQuizListView();
                editingQuizId = null;
                showToast("Kuis berhasil disimpan!", "bg-green-600");
                
            } catch (error) {
                console.error("Error saving quiz:", error);
                showCustomAlert("Gagal menyimpan kuis ke database.", "Error");
            }
        }

        function editQuiz(quizId) {
            const quiz = classData.quizList.find(q => q.id === quizId);
            if (!quiz) return;

            editingQuizId = quizId;
            showCreateQuizView();
            quizModalTitle.textContent = 'Edit Kuis';
            saveQuizBtn.textContent = 'Perbarui Kuis';
            quizQuestionInput.value = quiz.q;
            
            // Bersihkan container opsi sebelum mengisi ulang
            createOptionsContainer.innerHTML = '';

            quiz.options.forEach((option, index) => {
                let isCorrect = false;
                
                // --- LOGIKA BARU: Cek Array atau Integer ---
                if (Array.isArray(quiz.correct)) {
                    isCorrect = quiz.correct.includes(index);
                } else {
                    isCorrect = index === quiz.correct;
                }
                // ------------------------------------------
                
                addQuizOptionInput(option, isCorrect);
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
                    <button class="option-btn" data-index="${index}">
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

        // Mnghitung poin kecepatan berdasarkan peringkat
        function getSpeedPoints(rank) {
            if (rank === 1) return SPEED_POINTS[0]; // 3
            if (rank === 2) return SPEED_POINTS[1]; // 2
            if (rank === 3) return SPEED_POINTS[2]; // 1
            return 0;
        }

        async function handleAnswerClick(selectedIndex) {
            if (hasAnsweredThisRound) return;
            
            const responseTime = QUESTION_TIME - timeLeft;
            hasAnsweredThisRound = true;

            const quiz = classData.quizList.find(q => q.id === sessionState.currentQuestionId);
            let isCorrect = false;

            if (Array.isArray(quiz.correct)) {
                isCorrect = quiz.correct.includes(selectedIndex); 
            } else {
                isCorrect = selectedIndex === quiz.correct; 
            }
            
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
                    showToast(`Jawaban Terkirim: Benar (+${POINTS_CORRECT})`, "bg-green-600");
                } else {
                    showToast(`Jawaban Terkirim: Salah (${POINTS_WRONG})`, "bg-red-600");
                }

            } catch (e) {
                console.error("Gagal menyimpan jawaban:", e);
                showToast("Gagal menyimpan jawaban ke server.", "bg-red-800");
            }

            document.querySelectorAll('.option-btn').forEach(btn => {
                btn.disabled = true;
                const btnIdx = parseInt(btn.dataset.index);

                // 1. Highlight Pilihan User
                if (btnIdx === selectedIndex) {
                    btn.classList.add('ring-blue');
                    if (!isCorrect) {
                        btn.classList.add('answer-wrong'); 
                    }
                }

                // 2. Highlight SEMUA Kunci Jawaban yang Benar (Warna Hijau)
                let isKey = false;
                if (Array.isArray(quiz.correct)) {
                    isKey = quiz.correct.includes(btnIdx);
                } else {
                    isKey = quiz.correct === btnIdx;
                }

                if (isKey) {
                    btn.classList.add('answer-correct'); // Hijau
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
                
                await updateDoc(docRef, {
                    [`sessionState.currentAnswers.${currentUser.id}`]: { 
                        selectedIndex: -1, // Indeks -1, tidak ada jawaban
                        isCorrect: false, 
                        timeSubmitted: Date.now() 
                    }
                });
            } catch (e) {
                console.error("Gagal menyimpan jawaban (waktu habis):", e);
            }
        }


        // --- FUNGSI RINGKASAN & SESI
        async function calculateAndPublishResults(currentClassData) {
            if (currentClassData.sessionState.state !== 'AWAITING_RESULTS') return;
            const quiz = currentClassData.quizList.find(q => q.id === currentClassData.sessionState.currentQuestionId);
            if (!quiz) return;

            const currentAnswers = currentClassData.sessionState.currentAnswers || {};
            let participantListUpdates = [...currentClassData.participantList];
            let engagementStatsUpdates = { ...currentClassData.engagementStats };
            let finalAnswers = {}; 
            
            // 1. Urutkan Jawaban yang Benar Berdasarkan Waktu Submisi
            const allSubmissions = Object.entries(currentAnswers)
                .filter(([, answer]) => answer.selectedIndex !== -1)
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
                    responseTime = (answer.timeSubmitted - currentClassData.sessionState.quizStartTime) / 1000;
                    responseTime = Math.min(QUESTION_TIME, Math.max(0, responseTime));
                    
                    currentRank = allSubmissions.findIndex(([id]) => id === userId) + 1;
                    speedPoints = getSpeedPoints(currentRank);

                    if (answer.isCorrect) {
                        accuracyPoints = POINTS_CORRECT; 
                        newStreak += 1;
                        
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
                participantListUpdates[i].score = ( (participant.score || 0) + totalPoints);
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
            
            // 7. Terapkan Semua Pembaruan ke Firestore
            const docRef = doc(db, CLASS_COLLECTION_PATH, currentClassCode);
            
            try {
                await updateDoc(docRef, {
                    participantList: participantListUpdates, 
                    engagementStats: engagementStatsUpdates, 
                    "sessionState.currentAnswers": {},
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
                screenShareOffers: null,
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
                        const currentContent = presentationArea.innerHTML;
                        if (currentContent.includes('remote-screen-share-video')) {
                            presentationArea.innerHTML = originalPresentationContent;
                        }
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
                const userRecordIndex = currentClassData.participantList.findIndex(p => p.id === currentUser.id);
                
                if (userRecordIndex !== -1) {
                    currentClassData.participantList[userRecordIndex].isOnline = false;
                    await updateDoc(doc(db, CLASS_COLLECTION_PATH, currentClassCode), {
                        participantList: currentClassData.participantList
                    });
                }
            }
        }
        
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

            currentUser = classData.participantList.find(p => p.id === currentUser.id) || currentUser;
            sessionState = classData.sessionState;
            
            // Handle WebRTC Screen Share for participants
            if (!isPresenter && sessionState.screenShareActive) {
                const offers = sessionState.screenShareOffers || {};
                const myOffer = offers[currentUser.id];
                
                if (myOffer && !screenShareManager.peerConnection) {
                    // Participant joins screen share if not already joined
                    screenShareManager.joinScreenShare(currentUser.id)
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
                resetLocalQuizState(); // Reset state lokal
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

            if (sessionState.questionActive) {
                if (isPresenter) {
                    if (toggleQaBtn) {
                        toggleQaBtn.classList.remove('btn-purple');
                        toggleQaBtn.classList.add('btn-red');
                        qaStatusText.textContent = 'Tutup Q&A';
                    }
                } else {
                    // Untuk Peserta: Tampilkan tombol tanya jika aktif
                    if (askQuestionBtn) askQuestionBtn.classList.remove('hidden');
                }
            } else {
                if (isPresenter) {
                    if (toggleQaBtn) {
                        toggleQaBtn.classList.add('btn-purple');
                        toggleQaBtn.classList.remove('btn-red');
                        qaStatusText.textContent = 'Mulai Q&A';
                    }
                } else {
                    // Untuk Peserta: Sembunyikan tombol
                    if (askQuestionBtn) askQuestionBtn.classList.add('hidden');
                    if (qaSubmitModal) qaSubmitModal.classList.add('hidden'); // Tutup modal jika sesi ditutup paksa
                }
            }

            // Update Badge Notifikasi (Presenter)
            if (isPresenter && viewQaBtn && qaBadge) {
                const questions = sessionState.questionsQueue || [];
                const ungradedCount = questions.filter(q => !q.isGraded).length;
                
                if (ungradedCount > 0) {
                    qaBadge.textContent = ungradedCount;
                    qaBadge.classList.remove('hidden');
                    viewQaBtn.classList.add('animate-pulse');
                } else {
                    qaBadge.classList.add('hidden');
                    viewQaBtn.classList.remove('animate-pulse');
                }
                
                // Jika modal Q&A sedang terbuka, re-render listnya secara real-time
                if (!qaMgmtModal.classList.contains('hidden')) {
                    renderQnAList(questions);
                }
            }

            switch (sessionState.state) {
                
                case 'WAITING':
                    if (questionTimer) clearInterval(questionTimer);
                    quizIndicatorBtn.classList.add('hidden');
                    quizModal.classList.add('hidden');
                    summaryModal.classList.add('hidden');
                    
                    if (!isPresenter && oldState === 'AWAITING_RESULTS') {
                        const lastQuiz = classData.quizSessionHistory.slice(-1)[0];
                        if (lastQuiz && lastQuiz.answers[currentUser.id]) {
                            const myAnswerData = lastQuiz.answers[currentUser.id];
                            const { isCorrect, speedRank, speedPoints, totalPoints } = myAnswerData;

                            let message = "";
                            let bgColor = "bg-gray-700";

                            if (isCorrect) {
                                message = `Peringkat Kecepatan #${speedRank}, Bonus Kecepatan +${speedPoints}! Total: ${totalPoints} poin.`;
                                bgColor = "bg-green-700";
                            } else if (myAnswerData.selectedIndex === -1) {
                                message = `Tidak menjawab! Total: ${totalPoints} poin.`;
                                bgColor = "bg-red-800";
                            } else {
                                message = `Peringkat Kecepatan #${speedRank}, Bonus Kecepatan +${speedPoints}! Total: ${totalPoints} poin.`;
                                bgColor = "bg-red-600";
                            }

                            showDelayedToast(message, bgColor, 1000);
                        } else if (!lastQuiz.answers[currentUser.id] && hasAnsweredThisRound) {
                            showDelayedToast("Hasil kuis terbaru sudah ada, skor Anda sudah diperbarui!", "bg-gray-500", 1000);
                        }
                        summaryModal.classList.add('hidden');
                    }
                    break;
                
                case 'QUIZ_ACTIVE':
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
                        handleUnanswered();
                    }                    
                    toggleSidebar(true);

                    if (isPresenter) {
                        if (oldState === 'QUIZ_ACTIVE') {
                            calculateAndPublishResults(classData); 
                        }
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
        
        // 2. PRESENTER: Handle Giving Points
        async function handleGradeQuestion(questionId, userId, points) {
            try {
                // Ambil data terbaru dulu untuk menghindari race condition
                const docRef = doc(db, CLASS_COLLECTION_PATH, currentClassCode);
                const snapshot = await getDoc(docRef);
                const data = snapshot.data();
                
                let updatedQueue = [...(data.sessionState.questionsQueue || [])];
                let updatedParticipants = [...data.participantList];

                // A. Update Status Pertanyaan
                const qIndex = updatedQueue.findIndex(q => q.id === questionId);
                if (qIndex !== -1) {
                    updatedQueue[qIndex].isGraded = true;
                    updatedQueue[qIndex].pointsAwarded = points;
                }

                // B. Update Skor User
                const pIndex = updatedParticipants.findIndex(p => p.id === userId);
                if (pIndex !== -1) {
                    updatedParticipants[pIndex].score = (updatedParticipants[pIndex].score || 0) + points;
                }

                // C. Simpan ke Firestore (Atomic update-ish)
                await updateDoc(docRef, {
                    'sessionState.questionsQueue': updatedQueue,
                    'participantList': updatedParticipants
                });

                showToast(`Berhasil memberi ${points} poin!`, "bg-green-600");

            } catch (e) {
                console.error("Gagal memberi nilai:", e);
                showCustomAlert("Gagal menyimpan nilai ke database.", "Error");
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
            quizBtn.addEventListener('click', openQuizManagementModal);
            showResultsBtn.addEventListener('click', showFinalResults);
            resetSessionBtn.addEventListener('click', () => showCustomConfirm("Reset Sesi?", "Reset", resetSession, "Reset", "bg-red-600"));
            closeQuizMgmtBtn.addEventListener('click', closeQuizManagementModal);
            createNewQuizBtn.addEventListener('click', () => { editingQuizId = null; showCreateQuizView(); });
            backToQuizListBtn.addEventListener('click', showQuizListView);
            addOptionBtn.addEventListener('click', () => addQuizOptionInput());
            createQuizForm.addEventListener('submit', handleSaveQuiz);
            
            // Q&A Presenter Events
            toggleQaBtn.addEventListener('click', () => {
                const newState = !classData.sessionState.questionActive;
                updateDoc(doc(db, CLASS_COLLECTION_PATH, currentClassCode), { 'sessionState.questionActive': newState });
                showToast(newState ? "Q&A Dibuka" : "Q&A Ditutup", "bg-purple-600");
            });

            if (tabIncoming) {
                tabIncoming.addEventListener('click', () => {
                    qaActiveTab = 'incoming';
                    renderQnAList(classData.sessionState.questionsQueue || []);
                });
            }
            
            if (tabGraded) {
                tabGraded.addEventListener('click', () => {
                    qaActiveTab = 'graded';
                    renderQnAList(classData.sessionState.questionsQueue || []);
                });
            }

            viewQaBtn.addEventListener('click', () => { qaMgmtModal.classList.remove('hidden'); renderQnAList(classData.sessionState.questionsQueue || []); });
            closeQaMgmtBtn.addEventListener('click', () => qaMgmtModal.classList.add('hidden'));
        } 
        
        // Q&A Participant Events
        if (askQuestionBtn) {
            askQuestionBtn.addEventListener('click', () => {
                qaSubmitModal.classList.remove('hidden');
                qaInputText.value = ''; qaInputText.focus();
            });
        }
        if (qaCancelBtn) qaCancelBtn.addEventListener('click', () => qaSubmitModal.classList.add('hidden'));
        if (qaSendBtn) {
            qaSendBtn.addEventListener('click', async () => {
                const text = qaInputText.value.trim();
                if (!text) return showToast("Isi pertanyaan.", "bg-red-600");
                try {
                    await updateDoc(doc(db, CLASS_COLLECTION_PATH, currentClassCode), {
                        'sessionState.questionsQueue': arrayUnion({
                            id: 'Q-' + Date.now(), userId: currentUser.id, userName: currentUser.name,
                            text: text, timestamp: Date.now(), isGraded: false, pointsAwarded: 0
                        })
                    });
                    qaSubmitModal.classList.add('hidden'); showToast("Terkirim!", "bg-purple-600");
                } catch (e) { showCustomAlert("Gagal kirim."); }
            });
        }
        
        if (!isPresenter && quizIndicatorBtn) quizIndicatorBtn.addEventListener('click', () => quizModal.classList.remove('hidden'));

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
        const hash = window.location.hash || '#login';
        
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
            if (screenShareManager.localStream || screenShareManager.peerConnection || screenShareManager.peerConnections) {
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
        } else if (hash.startsWith('#home')) {
            renderHomePage();
        } else {
            renderLoginPage();
        }
    }

    // Mulai navigasi saat halaman dimuat dan saat hash berubah
    window.addEventListener('hashchange', navigate);
           
    // Panggil sekali untuk memuat halaman awal
    navigate(); 
}