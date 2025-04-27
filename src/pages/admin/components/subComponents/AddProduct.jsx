import React, { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import productsService from '../../../../firebase/ProductsService';

function AddProduct() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [uploadedFileId, setUploadedFileId] = useState(null);
  
  const fileInputRef = useRef(null);
  
  const { 
    register, 
    handleSubmit, 
    watch,
    reset,
    formState: { errors } 
  } = useForm();

  // Watch form values for preview
  const formValues = watch();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(selectedFile);
      
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);
      setUploadError(null); // Clear any previous errors
    }
  };

  const resetImage = () => {
    setImage(null);
    setImagePreview(null);
    setUploadedFileId(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const addProduct = async (data) => {
    if (!image) {
      setUploadError('Please select an image for the product');
      return;
    }

    setIsSubmitting(true);
    setUploadError(null);
    
    try {
      // Create new product object
      const newProduct = {
        name: data.productName,
        price: data.productPrice,
        description: data.productDescription,
        image: image, // Pass the actual file object to the service
        category: data.category,
        featured: data.featured === 'true',
        inStock: true,
        dateAdded: new Date().toISOString()
      };

      // Use productsService to handle all the image upload and product creation
      const result = await productsService.addProduct(newProduct);
      
      // If successful, set the uploaded file ID for display
      if (result && result.imageId) {
        setUploadedFileId(result.imageId);
      }
      
      console.log('Product added successfully with ID:', result.productId);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        reset();
        resetImage();
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Failed to add product:', error);
      setUploadError(error.message || 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='flex flex-col space-y-6 max-w-6xl mx-auto'>
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Add <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">New Product</span>
              </h2>
              <p className="text-gray-400">
                Create and add a new product to your menu
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mt-4"></div>
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
          <span>Product added successfully!</span>
        </div>
      )}

      {/* Error Message */}
      {uploadError && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{uploadError}</span>
        </div>
      )}

      {/* Form and Preview Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Product Information</h3>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit(addProduct)} className="space-y-6">
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
              
              <div>
                <label className="block text-gray-400 mb-2 font-medium">Category</label>
                <select 
                  id="category"
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  {...register("category", { required: true })}
                >
                  <option value="">Select a category</option>
                  <option value="ramen">Ramen</option>
                  <option value="sushi">Sushi</option>
                  <option value="appetizers">Appetizers</option>
                  <option value="desserts">Desserts</option>
                  <option value="drinks">Drinks</option>
                </select>
                {errors.category && (
                  <span className="text-red-500 text-sm mt-1">Please select a category</span>
                )}
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2 font-medium">Description</label>
                <textarea 
                  id="productDescription"
                  rows="4"
                  placeholder="Describe your product..." 
                  className={`w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 ${errors.productDescription ? 'border border-red-500' : ''}`}
                  {...register("productDescription", { required: true, minLength: 10 })}
                ></textarea>
                {errors.productDescription && (
                  <span className="text-red-500 text-sm mt-1">Description should be at least 10 characters</span>
                )}
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2 font-medium">Featured Product</label>
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
                      defaultChecked
                      className="form-radio h-4 w-4 text-yellow-500 bg-gray-700 border-gray-600 focus:ring-0"
                      {...register("featured")}
                    />
                    <span className="ml-2 text-white">No</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2 font-medium">Product Image</label>
                <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${!image && uploadError ? 'border-red-500' : 'border-gray-600'} border-dashed rounded-lg`}>
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
                        <span className="px-3 py-2 rounded-md">Upload an image</span>
                        <input 
                          id="file-upload" 
                          name="file-upload" 
                          type="file" 
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                          required
                        />
                      </label>
                      <p className="pl-1 pt-2">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
                
                {/* Image preview */}
                {imagePreview && (
                  <div className="mt-3">
                    <div className="flex items-center space-x-3">
                      <div className="h-16 w-16 rounded overflow-hidden bg-gray-700">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={resetImage}
                        className="text-red-400 hover:text-red-300 text-sm font-medium"
                      >
                        Remove image
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Image Preview */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Product Preview</h3>
          </div>
          <div className="p-6">
            {imagePreview ? (
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Product Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={resetImage}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 bg-gray-700/30 rounded-xl border border-gray-700 border-dashed">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-4 text-gray-400 text-lg font-medium">No Image Selected</p>
                <p className="text-gray-500 text-sm mt-2">Image preview will appear here</p>
              </div>
            )}

            {imagePreview && (
              <div className="mt-6 p-4 bg-gray-700/30 rounded-xl border border-gray-700">
                <h4 className="font-medium text-white mb-2">Product Card Preview</h4>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={imagePreview} 
                      alt="Product Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <h5 className="text-white font-medium">
                        {formValues?.productName || "Preview Name"}
                      </h5>
                      <span className="text-yellow-500 font-bold">
                        ${formValues?.productPrice || "0.00"}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-2 truncate">
                      {formValues?.productDescription || "Product description preview..."}
                    </p>
                    <div className="mt-4">
                      <button className="w-full px-3 py-2 bg-gradient-to-r from-yellow-500 to-red-500 text-white text-sm font-medium rounded transition duration-300">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Upload status */}
            {uploadedFileId && (
              <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500 text-blue-400 rounded-lg">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m-1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>File ID: {uploadedFileId}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;