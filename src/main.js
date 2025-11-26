// Import CSS
import './style.css';

// Import Firebase dari node_modules (cara NPM)
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { 
    getFirestore, doc, getDoc, setDoc, updateDoc, 
    deleteDoc, onSnapshot, collection, arrayUnion, serverTimestamp,
    setLogLevel 
} from "firebase/firestore";

import { startApp } from './app.js';
const firebaseConfig = {
    apiKey: "AIzaSyDjAMctceLqM0JMjs5yD3UGGOtLM2ERKtA",
    authDomain: "rapats-6e7cd.firebaseapp.com",
    projectId: "rapats-6e7cd",
    storageBucket: "rapats-6e7cd.firebasestorage.app",
    messagingSenderId: "416897724827",
    appId: "1:416897724827:web:6aabe72396ccc6eff8d713e",
    measurementId: "G-XTTZ4P054R"
};

// menyimpan layanan Firebase
const firebaseServices = {
    db: null,
    auth: null,
    currentUserId: null,
    doc, getDoc, setDoc, updateDoc, deleteDoc, onSnapshot, collection, arrayUnion, serverTimestamp,
    CLASS_COLLECTION_PATH: null,
};



async function initializeAndStart() {
    try {
        console.log("Menginisialisasi Firebase (NPM)...");

        const appId = 'meet-quiz-app-local'; 
        firebaseServices.CLASS_COLLECTION_PATH = `artifacts/${appId}/public/data/meetQuizSessions`;
        console.log(`Menggunakan Jalur Koleksi: ${firebaseServices.CLASS_COLLECTION_PATH}`);
        
        // Inisialisasi App, Auth, dan DB
        const app = initializeApp(firebaseConfig);
        firebaseServices.db = getFirestore(app);
        firebaseServices.auth = getAuth(app);
        
        // Aktifkan log debug
        setLogLevel('debug');

        await new Promise((resolve, reject) => {
            onAuthStateChanged(firebaseServices.auth, async (user) => {
                if (user) {
                    firebaseServices.currentUserId = user.uid;
                    console.log("Pengguna sudah diautentikasi:", user.uid);
                    resolve(user);
                } else {
                    console.log("Belum ada pengguna, mencoba login anonim...");
                    try {
                        const userCredential = await signInAnonymously(firebaseServices.auth);
                        firebaseServices.currentUserId = userCredential.user.uid;
                        console.log("Berhasil login anonim:", userCredential.user.uid);
                        resolve(userCredential.user);
                    } catch (authError) {
                        console.error("Gagal login anonim:", authError);
                        reject(authError);
                    }
                }
            });
        });

        console.log("Auth siap, memulai aplikasi...");
        startApp(firebaseServices);

    } catch (firebaseError) {
        console.error("Gagal menginisialisasi Firebase:", firebaseError);
        document.body.innerHTML = `<div style="color: white; padding: 20px;">Gagal terhubung ke Firebase. Periksa konsol (F12) untuk error. Error: ${firebaseError.message}</div>`;
    }
}

initializeAndStart();