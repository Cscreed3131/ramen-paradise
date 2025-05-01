import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase'; 
import userService from './UserService';

class AuthService {
    constructor(){
        this.auth = auth;
    }

    async signup({email, password, displayName = null}) {
        try {
            const userCredentials = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredentials.user;
            
            await userService.createUser({
                uid: user.uid,
                email: user.email,
                displayName: displayName || email.split('@')[0], 
                photoURL: null,
                phoneNumber: '',
                addresses: [],
                dateJoined: new Date().toISOString(),
                bio: '',
                favorite: [],
                createdAt: new Date().toISOString(),
                preferences: {
                    notifications: true,
                    marketingEmails: true,
                    twoFactorAuth: false,
                    spiceLevel: '3'
                }
            });
            
            return user;
        } catch (error) {
            console.log("Error: AuthService :: signup :: ", error);
            throw error;
        }
    }

    async signin({email, password}){
        try {
            const userCredentials = await signInWithEmailAndPassword(this.auth, email, password);
            const user = userCredentials.user;
            
            const userData = await userService.getUserData(user.uid);
            
            return {
                ...userData,
                uid: user.uid,
                email: user.email,
                emailVerified: user.emailVerified,
            };
        } catch (error) {
            console.log("Error: AuthService :: signin :: ", error);
            throw error;
        }
    }

    getCurrentUserId() {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    resolve(user.uid); 
                } else {
                    resolve(null); 
                }
            }, (error) => {
                reject(error);
            });
        });
    }

    async getCurrentUserEmail() {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(this.auth, (user) => {
                if (user) {
                    resolve(user.email); 
                } else {
                    resolve(null); 
                }
            }, (error) => {
                reject(error);
            });
        });
    }

    async signout(){
        try {
            await signOut(this.auth)
            console.info("signout success")
        } catch (error) {
            console.warn("Error: AuthService :: signout :: ", error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;