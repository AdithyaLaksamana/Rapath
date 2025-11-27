// src/auth.js - MODIFIKASI LENGKAP
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut,
} from "firebase/auth";

// Authentication Manager (sekarang menjadi Firebase Provider)
export class FirebaseAuthProvider {
    constructor(authService) {
        this.auth = authService;
        this.googleProvider = new GoogleAuthProvider();
    }

    /**
     * Melakukan proses login menggunakan Google melalui pop-up.
     * @returns {Promise<{success: boolean, message: string, user: object}>}
     */

    // Login menggunakan Google Pop-up
    async loginWithGoogle() {
        try {
            const result = await signInWithPopup(this.auth, this.googleProvider);
            // The signed-in user info.
            const user = result.user;

            console.log("Login Google Berhasil:", user.uid);
            return { 
                success: true, 
                message: 'Login Google berhasil!', 
                user: { uid: user.uid, name: user.displayName || user.email }
            };
        } catch (error) {
            console.error("Login Google Gagal:", error);
            const errorMessage = error.message;
            return { success: false, message: `Login gagal: ${errorMessage}` };
        }
    }

    /**
     * Melakukan proses logout dari Firebase.
     * @returns {Promise<{success: boolean, message: string}>}
     */

    // Logout user
    async logout() {
        try {
            await signOut(this.auth);
            return { success: true, message: 'Logout berhasil' };
        } catch (error) {
            console.error("Logout Gagal:", error);
            return { success: false, message: 'Gagal logout' };
        }
    }    
}