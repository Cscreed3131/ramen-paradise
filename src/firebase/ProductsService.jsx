import { db } from '../firebase';
import { Client, ID, Databases, Storage } from "appwrite";
import { 
        collection, 
        addDoc, 
        deleteDoc, 
        updateDoc, 
        doc, 
} from 'firebase/firestore';
import appwirteConf from '../conf/appwriteConfig';

export class ProductsService {
        client = new Client();
        databases;
        bucket;
        db;

        constructor() {
                this.client
                        .setEndpoint(appwirteConf.appwriteUrl)
                        .setProject(appwirteConf.appwriteProjectId);
                this.databases = new Databases(this.client);
                this.bucket = new Storage(this.client);
                this.db = db;
        }

        async uploadFile(file) {
                try {
                        if (!file || !(file instanceof File || file instanceof Blob)) {
                                throw new Error("Invalid file provided");
                        }

                        const uploadedFile = await this.bucket.createFile(
                                appwirteConf.appwriteBucketId,
                                ID.unique(),
                                file
                        );

                        if (!uploadedFile || !uploadedFile.$id) {
                                throw new Error("File upload failed");
                        }

                        // Return both the file object and the URL for viewing it
                        return {
                                fileId: uploadedFile.$id,
                                fileUrl: this.bucket.getFileView(
                                        appwirteConf.appwriteBucketId, 
                                        uploadedFile.$id
                                )
                        };
                } catch (error) {
                        console.error("Appwrite service :: uploadFile :: error", error);
                        throw error;
                }
        }

        async addProduct(productData) {
                try {
                        let imageData = null;

                        // Handle image upload if image is a File or Blob
                        if (productData.image instanceof File || productData.image instanceof Blob) {
                                const uploadResult = await this.uploadFile(productData.image);
                                imageData = {
                                        fileUrl: uploadResult.fileUrl,
                                        fileId: uploadResult.fileId
                                };
                        } else if (typeof productData.image === 'string') {
                                imageData = {
                                        fileUrl: productData.image,
                                        fileId: this.extractFileIdFromUrl(productData.image)
                                };
                        }

                        if (!imageData) {
                                throw new Error("Image upload failed or no image provided");
                        }

                        // Create the product object with image URL
                        const productToAdd = {
                                name: productData.name,
                                price: Number(productData.price),
                                description: productData.description,
                                category: productData.category || 'other',
                                inStock: productData.inStock !== undefined ? productData.inStock : true,
                                featured: productData.featured !== undefined ? productData.featured : false,
                                image: imageData.fileUrl,
                                imageMeta: { 
                                        bucketId: appwirteConf.appwriteBucketId,
                                        fileId: imageData.fileId
                                },
                                ingredients: productData.ingredients || [],
                                dateAdded: productData.dateAdded || new Date().toISOString(),
                                rating: productData.rating !== undefined ? Number(productData.rating) : 0,
                                sales: productData.sales !== undefined ? Number(productData.sales) : 0
                        };

                        const docRef = await addDoc(collection(this.db, 'products'), productToAdd);
                        console.log('Product added with ID:', docRef.id);
                        return {
                                productId: docRef.id,
                                imageId: imageData.fileId
                        };
                } catch (error) {
                        console.error('Error adding product:', error);
                        throw error; 
                }
        }

        async updateProduct(productId, updatedData) {
                try {
                        const productRef = doc(this.db, 'products', productId);

                        if (updatedData.image instanceof File || updatedData.image instanceof Blob) {
                                const currentProduct = await this.getProductById(productId);

                                const newImageUrl = await this.uploadFile(updatedData.image);
                                updatedData.image = newImageUrl;
                                updatedData.imageMeta = {
                                        bucketId: appwirteConf.appwriteBucketId,
                                        fileId: this.extractFileIdFromUrl(newImageUrl)
                                };

                                if (currentProduct && currentProduct.imageMeta) {
                                        await this.deleteImageById(
                                                currentProduct.imageMeta.bucketId,
                                                currentProduct.imageMeta.fileId
                                        );
                                }
                        }

                        if (updatedData.price !== undefined) {
                                updatedData.price = Number(updatedData.price);
                        }

                        if (updatedData.rating !== undefined) {
                                updatedData.rating = Number(updatedData.rating);
                        }

                        if (updatedData.sales !== undefined) {
                                updatedData.sales = Number(updatedData.sales);
                        }

                        await updateDoc(productRef, updatedData);
                        console.log('Product updated with ID:', productId);
                } catch (error) {
                        console.error('Error updating product:', error);
                        throw error;
                }
        }

        async deleteProduct(productId) {
                try {
                        const product = await this.getProductById(productId);

                        const productRef = doc(this.db, 'products', productId);
                        await deleteDoc(productRef);

                        if (product && product.imageMeta) {
                                await this.deleteImageById(
                                        product.imageMeta.bucketId, 
                                        product.imageMeta.fileId
                                );
                        }

                        console.log('Product deleted with ID:', productId);
                } catch (error) {
                        console.error('Error deleting product:', error);
                        throw error;
                }
        }

        async deleteImageById(bucketId, fileId) {
                try {
                        if (!bucketId || !fileId) return;

                        await this.bucket.deleteFile(bucketId, fileId);
                        console.log('Image deleted successfully from Appwrite');
                } catch (error) {
                        console.error('Error deleting image from Appwrite:', error);
                }
        }

        extractFileIdFromUrl(url) {
                try {
                        if (!url) return null;

                        const parts = url.split('/');
                        const fileIdIndex = parts.findIndex(part => part === 'files') + 1;

                        if (fileIdIndex > 0 && fileIdIndex < parts.length) {
                                return parts[fileIdIndex];
                        }

                        return null;
                } catch (error) {
                        console.error('Error extracting file ID from URL:', error);
                        return null;
                }
        }
}

const productsService = new ProductsService();
export default productsService;
