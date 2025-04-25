import { db, storage } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc, getDoc} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export class ProductsService {
    db;
    constructor() {
        this.db = db;
    }
    async uploadImage(file) {
        const storageRef = ref(storage, `images/${file.name}`);
        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            return url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    async addProduct(productData) {
        try {
            const url = await this.uploadImage(productData.image)
            const docRef = await addDoc(collection(db, 'products'), {
                name: productData.name,
                price: productData.price,
                description: productData.description,
                image: url,
            });
            console.log('Product added with ID:', docRef.id);
        } catch (error) {
            console.error('Error adding product:', error);
            throw error; 
        }
    }

    async getAllProducts() {
        try {
            const productsCollection = collection(db, 'products');
            const snapshot = await getDocs(productsCollection);
            const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    async updateProduct(productId, updatedData) {
        try {
            const productRef = doc(db, 'products', productId);
            await updateDoc(productRef, updatedData);
            console.log('Product updated with ID:', productId);
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    async deleteProduct(productId) {
        try {
            const productRef = doc(db, 'products', productId);
            await deleteDoc(productRef);
            console.log('Product deleted with ID:', productId);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
    async getProductById(productId) {
        try {
            const productRef = doc(db, 'products', productId);
            const productDoc = await getDoc(productRef);
            if (productDoc.exists()) {
                return { id: productDoc.id, ...productDoc.data() };
            } else {
                console.log('No such document!');
                return null;
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }
}

const productsService = new ProductsService();
export default productsService;
