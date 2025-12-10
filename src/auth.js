// fileName: auth.js
import { 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    getAdditionalUserInfo // <-- BARU
} from "firebase/auth";

// Authentication Manager (sekarang menjadi Firebase Provider)
export class FirebaseAuthProvider {
    constructor(authService) {
        this.auth = authService;
        this.googleProvider = new GoogleAuthProvider();
    }

    /**
     * FUNGSI MODIFIKASI: Login dengan Google (Hanya jika email SUDAH terdaftar)
     * @returns {Promise<{success: boolean, message: string, user: object, notExists?: boolean}>}
     */
    async loginWithGoogle() {
        try {
            const result = await signInWithPopup(this.auth, this.googleProvider);
            const user = result.user;
            
            const additionalUserInfo = getAdditionalUserInfo(result); 

            if (additionalUserInfo && additionalUserInfo.isNewUser) {
                await this.logout();
                return { 
                    success: false, 
                    message: 'Akunbelum terdaftar. Silakan gunakan tombol "Daftar dengan Google" di tab Daftar.', 
                    notExists: true
                };
            }

            console.log("Login Google Berhasil:", user.uid);
            return { 
                success: true, 
                message: 'Login Google berhasil!', 
                user: { uid: user.uid, name: user.displayName || user.email }
            };
        } catch (error) {
            console.error("Login Google Gagal:", error);
            const errorMessage = error.message;
            
            let message = errorMessage;
            if (error.code === 'auth/account-exists-with-different-credential') {
                message = 'Email ini sudah terdaftar menggunakan metode lain (Email/Password). Silakan login menggunakan metode tersebut.';
            }

            return { success: false, message: `Otentikasi gagal: ${message}` };
        }
    }
    
    /**
     * FUNGSI BARU: Register dengan Google (Hanya jika email BELUM terdaftar)
     * @returns {Promise<{success: boolean, message: string, user: object, alreadyExists?: boolean}>}
     */
    async registerWithGoogle(displayName) {
        try {
            const result = await signInWithPopup(this.auth, this.googleProvider);
            const user = result.user;
            
            const additionalUserInfo = getAdditionalUserInfo(result); 

            if (additionalUserInfo && !additionalUserInfo.isNewUser) {
                await this.logout();
                return { 
                    success: false, 
                    message: 'Akun sudah terdaftar, gunakan akun lain', 
                    alreadyExists: true 
                };
            }
            
            // Atur displayName untuk user baru
            await updateProfile(user, { displayName: displayName });

            console.log("Registrasi Google Berhasil:", user.uid);
            return { 
                success: true, 
                message: 'Registrasi Google berhasil!', 
                user: { uid: user.uid, name: user.displayName || user.email }
            };
        } catch (error) {
            console.error("Registrasi Google Gagal:", error);
            const errorMessage = error.message;
            
            let message = errorMessage;
            if (error.code === 'auth/account-exists-with-different-credential') {
                message = 'Email ini sudah terdaftar menggunakan metode lain (Email/Password). Silakan daftar menggunakan email lain.';
            }

            return { success: false, message: `Otentikasi gagal: ${message}` };
        }
    }


    // Register menggunakan Email dan Password
    async registerWithEmailPassword(email, password, displayName) {
        try {
            const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;

            // Atur displayName
            await updateProfile(user, { displayName: displayName });

            // Kirim email verifikasi
            await this.sendEmailVerification(user);

            console.log("Registrasi Berhasil:", user.uid);
            return { 
                success: true, 
                message: `Pendaftaran berhasil. Silakan cek email Anda (${email}) untuk verifikasi sebelum login.`, 
                user: { uid: user.uid, email: user.email, name: displayName, emailVerified: user.emailVerified }
            };
        } catch (error) {
            console.error("Registrasi Gagal:", error);
            // Tangani error spesifik
            let message = error.message;
            if (error.code === 'auth/email-already-in-use') {
                message = 'Email ini sudah terdaftar. Silakan login atau gunakan email lain.';
            } else if (error.code === 'auth/invalid-email') {
                 message = 'Format email tidak valid.';
            } else if (error.code === 'auth/weak-password') {
                 message = 'Password terlalu lemah, minimal 6 karakter.';
            }
            return { success: false, message: `Registrasi gagal: ${message}` };
        }
    }
    
    // Login menggunakan Email dan Password
    async loginWithEmailPassword(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            
            // Cek verifikasi email
            if (!user.emailVerified) {
                // Logout user yang belum terverifikasi, agar bisa login lagi setelah verifikasi
                await this.logout(); 
                return { 
                    success: false, 
                    message: `Login gagal: Email Anda (${email}) belum terverifikasi. Silakan cek email Anda.`,
                    needsVerification: true 
                };
            }

            console.log("Login Email/Password Berhasil:", user.uid);
            return { 
                success: true, 
                message: 'Login berhasil!', 
                user: { uid: user.uid, name: user.displayName || user.email }
            };
        } catch (error) {
            console.error("Login Email/Password Gagal:", error);
            let message = error.message;
            if (error.code === 'auth/invalid-credential') {
                 message = 'Email atau password salah.';
            } else if (error.code === 'auth/user-not-found') {
                message = 'Akun tidak ditemukan.';
            }
            return { success: false, message: `Login gagal: ${message}` };
        }
    }
    
    // Kirim Email Verifikasi
    async sendEmailVerification(user) {
        try {
            await sendEmailVerification(user);
            console.log("Email verifikasi dikirim");
            return { success: true, message: "Email verifikasi berhasil dikirim." };
        } catch (error) {
            console.error("Gagal mengirim email verifikasi:", error);
            return { success: false, message: `Gagal mengirim email verifikasi: ${error.message}` };
        }
    }


    /**
     * Melakukan proses logout dari Firebase.
     * @returns {Promise<{success: boolean, message: string}>}
     */
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