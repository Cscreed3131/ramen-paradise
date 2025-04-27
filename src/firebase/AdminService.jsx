import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore'
class AdminService {
    db;
    constructor() {
        this.db = db;
    }

    async getAdminUserData(adminId) {
        try {
                const docRef = doc(db, 'admin', adminId)
                const adminDoc = await getDoc(docRef)
                if (adminDoc.exists()) {
                    return {id: adminDoc.id, ...adminDoc.data()}
            } else {
                console.log('No such document!');
                return null;
            }

        } catch (error) {
            console.error('Error fetching admin user data:', error);
            throw error;
        }
    }
}

const adminService = new AdminService();
export default adminService;