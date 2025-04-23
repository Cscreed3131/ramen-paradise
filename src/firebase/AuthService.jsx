import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase'; // Import the initialized auth instance

export class AuthService {
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

    // getCurrentUserId(){
    //     try {
    //         if (this.auth.currentUser) {
    //             return this.auth.currentUser.uid;
    //         } else {
    //             return null; // No user is signed in
    //         }
    //     } catch (error) {
    //         console.log("Error: AuthService :: getCurrentUserId :: ",error);
    //         throw error;
            
    //     }
    // }

    getCurrentUser() {
        return new Promise((resolve, reject) => {
            onAuthStateChanged(this.auth, (user) => {
                console.log("AuthService :: getCurrentUser :: user:", user); // Log the user object
                if (user) {
                    resolve(user); 
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
            console.log("signout success")
        } catch (error) {
            console.log("Error: AuthService :: signout :: ",error);
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;