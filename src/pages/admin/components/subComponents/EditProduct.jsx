import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import productsService from '../../../../firebase/ProductsService';
import categoryService from '../../../../firebase/CategoryService'; 

function EditProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  
  const { 
    register, 
    handleSubmit, 
    reset,
    setValue,
    formState: { errors } 
  } = useForm();
  
  const scrollbarHideStyles = `
    .hide-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;     /* Firefox */
    }
    .hide-scrollbar::-webkit-scrollbar {
      display: none;             /* Chrome, Safari and Opera */
    }
  `;
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const productsData = await productsService.getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const categoriesData = await categoryService.getAllCategories();
        const activeCategories = categoriesData.filter(category => category.active);
        setCategories(activeCategories);
      } catch (error) {
        console.error('Failed to load categories:', error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    
    fetchCategories();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setImagePreview(product.image);
    
    setValue('productName', product.name);
    setValue('productPrice', product.price);
    setValue('productDescription', product.description);
    setValue('category', product.category);
    setValue('featured', product.featured ? 'true' : 'false');
    setValue('inStock', product.inStock ? 'true' : 'false');
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const updateProduct = async (data) => {
    if (!selectedProduct) return;
    setIsSubmitting(true);
    const updatedProduct = {
      ...selectedProduct,
      name: data.productName,
      price: data.productPrice,
      description: data.productDescription,
      image: imagePreview,
      category: data.category,
      featured: data.featured === 'true',
      inStock: data.inStock === 'true',
      dateUpdated: new Date().toISOString()
    };
    
    try {
      await productsService.updateProduct(selectedProduct.id, updatedProduct);
      setProducts(products.map(p => 
        p.id === selectedProduct.id ? updatedProduct : p
      ));
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to update product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col space-y-6 max-w-6xl mx-auto'>
      {/* Add the scrollbar hiding styles */}
      <style>{scrollbarHideStyles}</style>
      
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Edit <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Products</span>
              </h2>
              <p className="text-gray-400">
                Update existing products in your menu
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mt-4"></div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full lg:w-64 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-3 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Product updated successfully!</span>
        </div>
      )}

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product list */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden h-[550px] flex flex-col">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Select a Product</h3>
          </div>
          
          {isLoading ? (
            <div className="p-6 flex justify-center flex-grow">
              <div className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-gray-400">Loading products...</span>
              </div>
            </div>
          ) : (
            <>
              {filteredProducts.length > 0 ? (
                <div className="divide-y divide-gray-700 overflow-y-auto hide-scrollbar flex-grow">
                  {filteredProducts.map(product => (
                    <div 
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className={`p-4 cursor-pointer hover:bg-gray-700/30 transition-colors ${selectedProduct?.id === product.id ? 'bg-gray-700/50' : ''}`}
                    >
                      <div className="flex items-center">
                        <div className="h-12 w-12 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h4 className="text-white font-medium">{product.name}</h4>
                            <span className="text-yellow-500 font-medium">${product.price.toFixed(2)}</span>
                          </div>
                          <p className="text-gray-400 text-sm truncate mt-1">{product.description}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full capitalize">
                              {product.category}
                            </span>
                            {product.featured && (
                              <span className="ml-2 text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
                                Featured
                              </span>
                            )}
                            {!product.inStock && (
                              <span className="ml-2 text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center flex-grow flex flex-col justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-400 text-lg">No products found</p>
                  <p className="text-gray-500 text-sm mt-1">Try adjusting your search term</p>
                </div>
              )}
            </>
          )}
          
          {filteredProducts.length > 0 && (
            <div className="px-6 py-4 bg-gray-800/20 border-t border-gray-700 mt-auto">
              <p className="text-sm text-gray-400">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                {searchTerm ? ` matching "${searchTerm}"` : ''}
              </p>
            </div>
          )}
        </div>
        
        {/* Edit form */}
        <div className="lg:col-span-2">
          {selectedProduct ? (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-700">
                <h3 className="text-lg font-semibold text-white">Edit Product Information</h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit(updateProduct)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 mb-2 font-medium">Product Name</label>
                      <input 
                        type="text" 
                        id="productName"
                        placeholder="Enter product name" 
                        className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.productName ? 'border border-red-500' : ''}`}
                        {...register("productName", { required: true })}
                      />
                      {errors.productName && (
                        <span className="text-red-500 text-sm mt-1">Product name is required</span>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2 font-medium">Product Price (USD)</label>
                      <input 
                        type="number" 
                        id="productPrice"
                        step="0.01"
                        placeholder="0.00" 
                        className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.productPrice ? 'border border-red-500' : ''}`}
                        {...register("productPrice", { 
                          required: true,
                          min: 0.01,
                          valueAsNumber: true
                        })}
                      />
                      {errors.productPrice && (
                        <span className="text-red-500 text-sm mt-1">Valid price is required</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 mb-2 font-medium">Category</label>
                      <select 
                        id="category"
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        {...register("category", { required: true })}
                        disabled={categoriesLoading}
                      >
                        <option value="">Select a category</option>
                        
                        {categoriesLoading ? (
                          <option value="" disabled>Loading categories...</option>
                        ) : categories.length > 0 ? (
                          categories.map(category => (
                            <option key={category.id} value={category.name.toLowerCase()}>
                              {category.name}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>No categories available</option>
                        )}
                      </select>
                      
                      {categoriesLoading && (
                        <div className="mt-1 flex items-center">
                          <svg className="animate-spin h-4 w-4 text-yellow-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-sm text-gray-400">Loading available categories...</span>
                        </div>
                      )}
                      
                      {errors.category && (
                        <span className="text-red-500 text-sm mt-1">Please select a category</span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 mb-2 font-medium">Featured</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              value="true" 
                              className="form-radio h-4 w-4 text-yellow-500 bg-gray-700 border-gray-600 focus:ring-0"
                              {...register("featured")}
                            />
                            <span className="ml-2 text-white">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              value="false" 
                              className="form-radio h-4 w-4 text-yellow-500 bg-gray-700 border-gray-600 focus:ring-0"
                              {...register("featured")}
                            />
                            <span className="ml-2 text-white">No</span>
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2 font-medium">In Stock</label>
                        <div className="flex space-x-4">
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              value="true" 
                              className="form-radio h-4 w-4 text-green-500 bg-gray-700 border-gray-600 focus:ring-0"
                              {...register("inStock")}
                            />
                            <span className="ml-2 text-white">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input 
                              type="radio" 
                              value="false" 
                              className="form-radio h-4 w-4 text-red-500 bg-gray-700 border-gray-600 focus:ring-0"
                              {...register("inStock")}
                            />
                            <span className="ml-2 text-white">No</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-400 mb-2 font-medium">Description</label>
                    <textarea 
                      id="productDescription"
                      rows="4"
                      placeholder="Describe your product..." 
                      className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.productDescription ? 'border border-red-500' : ''} hide-scrollbar`}
                      {...register("productDescription", { required: true, minLength: 10 })}
                    ></textarea>
                    {errors.productDescription && (
                      <span className="text-red-500 text-sm mt-1">Description should be at least 10 characters</span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-400 mb-2 font-medium">Product Image</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-lg">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-400">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-yellow-500 hover:text-yellow-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
                            >
                              <span className="px-3 py-2 rounded-md">Change image</span>
                              <input 
                                id="file-upload" 
                                name="file-upload" 
                                type="file" 
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                            <p className="pl-1 pt-2">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-400 mb-2 font-medium">Image Preview</label>
                      {imagePreview ? (
                        <div className="mt-1 relative aspect-video rounded-lg overflow-hidden bg-gray-700 border border-gray-600">
                          <img
                            src={imagePreview}
                            alt="Product Preview"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="mt-1 flex items-center justify-center h-40 rounded-lg bg-gray-700 border border-gray-600">
                          <p className="text-gray-400">No image selected</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(null)}
                      className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
              <div className="p-10 flex flex-col items-center justify-center text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <h3 className="text-xl font-semibold text-white mb-2">Select a Product to Edit</h3>
                <p className="text-gray-400 max-w-md">
                  Choose a product from the list to edit its details, update pricing, change images, or modify its availability status.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProduct;