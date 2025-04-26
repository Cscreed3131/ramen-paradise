import { db, storage } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export class ProductsService {
    db;
    constructor() {
        this.db = db;
    }

    /**
     * Upload an image to Firebase Storage
     * @param {File} file - The image file to upload
     * @returns {Promise<string>} - The download URL for the uploaded image
     */
    async uploadImage(file) {
        if (!file || !(file instanceof File || file instanceof Blob)) {
            throw new Error('Invalid file provided for upload');
        }

        // Generate a unique filename using timestamp and original name
        const timestamp = new Date().getTime();
        const filename = `${timestamp}-${file.name}`;
        const storageRef = ref(storage, `images/products/${filename}`);
        
        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            return url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    }

    /**
     * Add a new product to the database
     * @param {Object} productData - Product information to add
     * @returns {Promise<string>} - ID of the newly created product
     */
    async addProduct(productData) {
        try {
            let imageUrl = null;
            
            // Handle image upload if file is provided
            if (productData.image instanceof File || productData.image instanceof Blob) {
                imageUrl = await this.uploadImage(productData.image);
            } else if (typeof productData.image === 'string') {
                // If image is already a URL, use it directly
                imageUrl = productData.image;
            }
            
            // Prepare product data for Firestore
            const productToAdd = {
                name: productData.name,
                price: Number(productData.price),
                description: productData.description,
                category: productData.category || 'other',
                inStock: productData.inStock !== undefined ? productData.inStock : true,
                featured: productData.featured !== undefined ? productData.featured : false,
                image: imageUrl,
                ingredients: productData.ingredients || [],
                dateAdded: productData.dateAdded || new Date().toISOString(),
                rating: productData.rating !== undefined ? Number(productData.rating) : 0,
                sales: productData.sales !== undefined ? Number(productData.sales) : 0
            };
            
            const docRef = await addDoc(collection(db, 'products'), productToAdd);
            console.log('Product added with ID:', docRef.id);
            return docRef.id;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error; 
        }
    }

    /**
     * Get all products from the database
     * @returns {Promise<Array>} - Array of product objects
     */
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

    /**
     * Get products with filtering and sorting
     * @param {Object} options - Query options
     * @param {string} options.category - Filter by category
     * @param {boolean} options.inStock - Filter by stock status
     * @param {boolean} options.featured - Filter by featured status
     * @param {string} options.sortBy - Field to sort by
     * @param {string} options.sortDirection - Sort direction ('asc' or 'desc')
     * @param {number} options.limitCount - Maximum number of products to return
     * @returns {Promise<Array>} - Array of product objects matching criteria
     */
    async getProductsWithFilters({
        category = null,
        inStock = null,
        featured = null,
        sortBy = 'name',
        sortDirection = 'asc',
        limitCount = null
    } = {}) {
        try {
            let productsQuery = collection(db, 'products');
            const queryConstraints = [];
            
            // Apply filters
            if (category) {
                queryConstraints.push(where('category', '==', category));
            }
            
            if (inStock !== null) {
                queryConstraints.push(where('inStock', '==', inStock));
            }
            
            if (featured !== null) {
                queryConstraints.push(where('featured', '==', featured));
            }
            
            // Apply sorting
            if (sortBy) {
                queryConstraints.push(orderBy(sortBy, sortDirection));
            }
            
            // Apply limit
            if (limitCount && Number.isInteger(limitCount) && limitCount > 0) {
                queryConstraints.push(limit(limitCount));
            }
            
            // Create the query with all constraints
            const finalQuery = query(productsQuery, ...queryConstraints);
            const snapshot = await getDocs(finalQuery);
            
            const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return products;
        } catch (error) {
            console.error('Error fetching filtered products:', error);
            throw error;
        }
    }

    /**
     * Get a product by ID
     * @param {string} productId - The ID of the product to retrieve
     * @returns {Promise<Object|null>} - The product object or null if not found
     */
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

    /**
     * Update an existing product
     * @param {string} productId - ID of the product to update
     * @param {Object} updatedData - New product data
     * @returns {Promise<void>}
     */
    async updateProduct(productId, updatedData) {
        try {
            const productRef = doc(db, 'products', productId);
            
            // Handle image upload if a new file is provided
            if (updatedData.image instanceof File || updatedData.image instanceof Blob) {
                // Get the current product to see if we need to delete an old image
                const currentProduct = await this.getProductById(productId);
                
                // Upload the new image
                const newImageUrl = await this.uploadImage(updatedData.image);
                updatedData.image = newImageUrl;
                
                // If there was a previous image, we could delete it here
                // This is optional and depends on your storage requirements
                // if (currentProduct && currentProduct.image) {
                //     await this.deleteImageByUrl(currentProduct.image);
                // }
            }
            
            // Make sure numeric fields are properly formatted
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

    /**
     * Toggle a product's featured status
     * @param {string} productId - ID of the product
     * @returns {Promise<boolean>} - The new featured status
     */
    async toggleFeaturedStatus(productId) {
        try {
            const product = await this.getProductById(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            
            const newFeaturedStatus = !product.featured;
            await this.updateProduct(productId, { featured: newFeaturedStatus });
            return newFeaturedStatus;
        } catch (error) {
            console.error('Error toggling featured status:', error);
            throw error;
        }
    }

    /**
     * Toggle a product's stock status
     * @param {string} productId - ID of the product
     * @returns {Promise<boolean>} - The new stock status
     */
    async toggleStockStatus(productId) {
        try {
            const product = await this.getProductById(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            
            const newStockStatus = !product.inStock;
            await this.updateProduct(productId, { inStock: newStockStatus });
            return newStockStatus;
        } catch (error) {
            console.error('Error toggling stock status:', error);
            throw error;
        }
    }

    /**
     * Delete a product
     * @param {string} productId - ID of the product to delete
     * @returns {Promise<void>}
     */
    async deleteProduct(productId) {
        try {
            // Optionally get the product first to delete its image
            // const product = await this.getProductById(productId);
            
            // Delete the document from Firestore
            const productRef = doc(db, 'products', productId);
            await deleteDoc(productRef);
            
            // Optionally delete the associated image
            // if (product && product.image) {
            //     await this.deleteImageByUrl(product.image);
            // }
            
            console.log('Product deleted with ID:', productId);
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }

    /**
     * Delete multiple products in a batch operation
     * @param {Array<string>} productIds - Array of product IDs to delete
     * @returns {Promise<number>} - Number of products successfully deleted
     */
    async deleteMultipleProducts(productIds) {
        if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
            return 0;
        }
        
        const batch = writeBatch(db);
        
        try {
            // Add all product deletions to the batch
            for (const productId of productIds) {
                const productRef = doc(db, 'products', productId);
                batch.delete(productRef);
            }
            
            // Commit the batch
            await batch.commit();
            console.log(`Successfully deleted ${productIds.length} products`);
            return productIds.length;
        } catch (error) {
            console.error('Error batch deleting products:', error);
            throw error;
        }
    }

    /**
     * Get featured products
     * @param {number} count - Number of featured products to return
     * @returns {Promise<Array>} - Array of featured product objects
     */
    async getFeaturedProducts(count = 10) {
        return this.getProductsWithFilters({
            featured: true,
            inStock: true,
            sortBy: 'rating',
            sortDirection: 'desc',
            limitCount: count
        });
    }

    /**
     * Get top-rated products
     * @param {number} count - Number of top products to return
     * @returns {Promise<Array>} - Array of top-rated product objects
     */
    async getTopRatedProducts(count = 10) {
        return this.getProductsWithFilters({
            inStock: true,
            sortBy: 'rating',
            sortDirection: 'desc',
            limitCount: count
        });
    }

    /**
     * Get best-selling products
     * @param {number} count - Number of products to return
     * @returns {Promise<Array>} - Array of best-selling product objects
     */
    async getBestSellingProducts(count = 10) {
        return this.getProductsWithFilters({
            inStock: true,
            sortBy: 'sales',
            sortDirection: 'desc',
            limitCount: count
        });
    }

    /**
     * Get products by category
     * @param {string} category - Category to filter by
     * @param {number} count - Number of products to return
     * @returns {Promise<Array>} - Array of product objects in the category
     */
    async getProductsByCategory(category, count = 20) {
        return this.getProductsWithFilters({
            category: category,
            inStock: true,
            sortBy: 'name',
            sortDirection: 'asc',
            limitCount: count
        });
    }

    /**
     * Helper method to delete an image by its URL
     * @param {string} imageUrl - URL of the image to delete
     * @returns {Promise<void>}
     */
    async deleteImageByUrl(imageUrl) {
        try {
            // Extract the path from the URL
            const imagePath = this.extractPathFromUrl(imageUrl);
            if (!imagePath) return;
            
            const imageRef = ref(storage, imagePath);
            await deleteObject(imageRef);
            console.log('Image deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', error);
            // Don't throw here, as image deletion is a secondary operation
        }
    }

    /**
     * Helper method to extract a storage path from a Firebase Storage URL
     * @param {string} url - Firebase Storage URL
     * @returns {string|null} - Storage path or null if not parseable
     */
    extractPathFromUrl(url) {
        try {
            // Firebase Storage URLs contain a token after a question mark
            // We need to extract just the path part
            const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/';
            if (!url || !url.startsWith(baseUrl)) return null;
            
            // Extract the path after '/o/'
            const pathStartIndex = url.indexOf('/o/');
            if (pathStartIndex === -1) return null;
            
            // Extract until '?' which indicates start of token
            let path = url.substring(pathStartIndex + 3);
            const queryIndex = path.indexOf('?');
            if (queryIndex !== -1) {
                path = path.substring(0, queryIndex);
            }
            
            // Decode URI components
            return decodeURIComponent(path);
        } catch (error) {
            console.error('Error extracting path from URL:', error);
            return null;
        }
    }
}

const productsService = new ProductsService();
export default productsService;