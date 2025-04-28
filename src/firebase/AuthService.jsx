import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase'; 
import userService from './UserService';
class AuthService {
    constructor(){
        this.auth = auth;
    }

    async signup({email,password}) {
        try {
            const userCredentials = await createUserWithEmailAndPassword(this.auth,email,password)
            return userCredentials.user;
        } catch (error) {
            console.log("Error: AuthService :: signup :: ",error);
            throw error;
        }
    }

    async signin({email,password}){
        try {
            const userCredentials = await signInWithEmailAndPassword(this.auth,email,password)
            return userCredentials.user;
        } catch (error) {
            console.log("Error: AuthService :: signin :: ",error);
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

    async signout(){
        try {
            await signOut(this.auth)
            console.info("signout success")
        } catch (error) {
            console.warn("Error: AuthService :: signout :: ",error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;