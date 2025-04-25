import React from 'react';
import { useState } from 'react';
import { Input } from '../../../../components/index';
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import productsService from '../../../../firebase/ProductsService';

function AddProduct() {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const {register,handleSubmit} = useForm();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const addProduct = async (data) => {
    const newProduct = {
      name: data.productName,
      price: data.productPrice,
      description: data.productDescription,
      image: imagePreview, // Use the image preview as the product image
    };

    try {
      const productId = await productsService.addProduct(newProduct);
    } catch (error) {
      console.error('Failed to add product:', error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-start justify-start w-full">
        <h1 className="text-xl font-bold mb-4 bg-gray-700 p-2 rounded-3xl">
          Add New Product
        </h1>
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <form className="bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full lg:w-1/2 flex flex-col gap-4" onSubmit={handleSubmit(addProduct)}>
            <div>
              <div className="mb-4">
                <Input
                  label="Product Name"
                  type="text"
                  id="product-name"
                  placeholder="Enter product name"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Product Price"
                  type="number"
                  id="product-price"
                  placeholder="Enter product price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <Input
                  label="Product Description"
                  type="textarea"
                  id="product-description"
                  placeholder="Enter product description"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  style={{ height: '120px' }}
                />
              </div>
            </div>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="product-image"
                  className="block text-gray-300 text-sm font-bold mb-2"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  id="product-image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Add Product
            </button>
          </form>
          {imagePreview && (
            <div className="lg:w-1/2 flex justify-start items-start">
              <img
                src={imagePreview}
                alt="Product Preview"
                className="rounded-2xl shadow-md border border-gray-300 lg:h-96 md:h-80 sm:h-1/2 w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AddProduct;