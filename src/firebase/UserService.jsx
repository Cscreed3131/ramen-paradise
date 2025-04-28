import { db } from '../firebase';
import authService from './AuthService';
export class UserService{
    db;

    constructor() {
        this.db = db;
    }

    async createUserData({name, email, password}) {
        try {
            const userId = await authService.getCurrentUserId();
            const docRef = doc(this.db, 'users', userId);
            await setDoc(docRef, { name, email, password });
            console.log('User data created successfully!');
        } catch (error) {
            console.error('Error creating user data:', error);
            throw error;
        }
    }

    async getUserData(userId) {
        try {
            const docRef = doc(this.db, 'users', userId);
            const userDoc = await getDoc(docRef);
            if (userDoc.exists()) {
                return { id: userDoc.id, ...userDoc.data() };
            } else {
                console.log('No such document!');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }
}

const userService = new UserService()
export default userService