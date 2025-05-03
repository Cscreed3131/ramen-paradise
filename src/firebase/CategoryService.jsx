import { db } from '../firebase';
import { 
    collection, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    query, 
    where,
    serverTimestamp
} from 'firebase/firestore';

const categoriesCollectionRef = collection(db, 'categories');

class CategoryService {
    async createCategory(categoryData) {
        try {
            const newCategory = {
                ...categoryData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };
            const docRef = await addDoc(categoriesCollectionRef, newCategory);
            return { id: docRef.id, ...newCategory };
        } catch (error) {
            console.error("Error creating category:", error);
            throw error;
        }
    }

    async getAllCategories() {
        try {
            const querySnapshot = await getDocs(categoriesCollectionRef);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error getting categories:", error);
            throw error;
        }
    }

    async getActiveCategories() {
        try {
            const q = query(categoriesCollectionRef, where("active", "==", true));
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error("Error getting active categories:", error);
            throw error;
        }
    }

    async getCategoryById(id) {
        try {
            const categoryDoc = doc(db, 'categories', id);
            const docSnap = await getDoc(categoryDoc);
            
            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data()
                };
            } else {
                throw new Error("Category not found");
            }
        } catch (error) {
            console.error("Error getting category:", error);
            throw error;
        }
    }

    async updateCategory(id, updatedData) {
        try {
            const categoryDoc = doc(db, 'categories', id);
            const updateData = {
                ...updatedData,
                updatedAt: serverTimestamp()
            };
            await updateDoc(categoryDoc, updateData);
            return { id, ...updateData };
        } catch (error) {
            console.error("Error updating category:", error);
            throw error;
        }
    }

    async deleteCategory(id) {
        try {
            const categoryDoc = doc(db, 'categories', id);
            await deleteDoc(categoryDoc);
            return id;
        } catch (error) {
            console.error("Error deleting category:", error);
            throw error;
        }
    }

    async toggleCategoryStatus(id, currentStatus) {
        try {
            const categoryDoc = doc(db, 'categories', id);
            await updateDoc(categoryDoc, {
                active: !currentStatus,
                updatedAt: serverTimestamp()
            });
            return { id, active: !currentStatus };
        } catch (error) {
            console.error("Error toggling category status:", error);
            throw error;
        }
    }

    async countProductsInCategory(category) {
        try {
            const productsRef = collection(db, 'products');
            const q = query(productsRef, where("category", "==", category));
            const querySnapshot = await getDocs(q);
            return querySnapshot.size;
        } catch (error) {
            console.error("Error counting products in category:", error);
            throw error;
        }
    }
}

const categoryService = new CategoryService();

export default categoryService;