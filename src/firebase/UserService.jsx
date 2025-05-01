import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

class UserService {
  constructor() {
    this.db = db;
    this.collection = 'users';
  }

  async createUser(userData) {
    try {
      const userRef = doc(this.db, this.collection, userData.uid);
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return userData;
    } catch (error) {
      console.log("Error: UserService :: createUser :: ", error);
      throw error;
    }
  }

  async getUserData(uid) {
    try {
      const userRef = doc(this.db, this.collection, uid);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data();
      } else {
        console.log("No user document found for this ID!");
        return null;
      }
    } catch (error) {
      console.log("Error: UserService :: getUserData :: ", error);
      throw error;
    }
  }

  async updateUser(uid, userData) {
    try {
      const userRef = doc(this.db, this.collection, uid);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date().toISOString()
      });
      return userData;
    } catch (error) {
      console.log("Error: UserService :: updateUser :: ", error);
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;