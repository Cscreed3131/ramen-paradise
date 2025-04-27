import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import productsService from '../../../../firebase/ProductsService';


// const [products, setProducts] = useState([
//   {
//     id: 1,
//     name: "Tonkotsu Ramen",
//     image: "https://images.unsplash.com/photo-1614563637806-1d0e645e0940?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     price: 14.99,
//     category: "ramen",
//     description: "Rich pork bone broth with chashu, soft-boiled egg, green onions, and nori.",
//     inStock: true,
//     featured: true,
//     rating: 4.8,
//     sales: 342,
//     dateAdded: "2024-10-15T09:30:00",
//     ingredients: ["Pork bone broth", "Ramen noodles", "Chashu pork", "Soft-boiled egg", "Green onions", "Nori"]
//   },
//   {
//     id: 2,
//     name: "Spicy Miso Ramen",
//     image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     price: 15.99,
//     category: "ramen",
//     description: "Spicy miso broth with ground pork, corn, bean sprouts, and butter.",
//     inStock: true,
//     featured: true,
//     rating: 4.7,
//     sales: 287,
//     dateAdded: "2024-10-16T10:45:00",
//     ingredients: ["Miso broth", "Ramen noodles", "Ground pork", "Corn", "Bean sprouts", "Butter", "Chili oil"]
//   },
//   {
//     id: 3,
//     name: "Shoyu Ramen",
//     image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     price: 13.99,
//     category: "ramen",
//     description: "Soy sauce-based broth with chicken, bamboo shoots, and marinated egg.",
//     inStock: true,
//     featured: false,
//     rating: 4.5,
//     sales: 204,
//     dateAdded: "2024-10-18T14:20:00",
//     ingredients: ["Soy sauce broth", "Ramen noodles", "Chicken", "Bamboo shoots", "Marinated egg", "Green onions"]
//   },
//   {
//     id: 4,
//     name: "Dragon Roll",
//     image: "https://images.unsplash.com/photo-1617196034288-de201c5939cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     price: 16.99,
//     category: "sushi",
//     description: "Shrimp tempura roll topped with avocado, eel, and special sauce.",
//     inStock: true,
//     featured: true,
//     rating: 4.6,
//     sales: 253,
//     dateAdded: "2024-10-20T11:15:00",
//     ingredients: ["Sushi rice", "Nori", "Shrimp tempura", "Avocado", "Eel", "Special sauce"]
//   },
//   {
//     id: 5,
//     name: "California Roll",
//     image: "https://images.unsplash.com/photo-1559410545-0bdcd187e323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     price: 12.99,
//     category: "sushi",
//     description: "Crab, avocado, and cucumber roll with tobiko on the outside.",
//     inStock: true,
//     featured: false,
//     rating: 4.3,
//     sales: 186,
//     dateAdded: "2024-10-21T16:30:00",
//     ingredients: ["Sushi rice", "Nori", "Imitation crab", "Avocado", "Cucumber", "Tobiko"]
//   },
//   {
//     id: 6,
//     name: "Gyoza",
//     image: "https://images.unsplash.com/photo-1626845357008-01fe606c2cf6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     price: 8.99,
//     category: "appetizers",
//     description: "Pan-fried dumplings filled with pork and vegetables.",
//     inStock: true,
//     featured: true,
//     rating: 4.5,
//     sales: 241,
//     dateAdded: "2024-10-22T12:10:00",
//     ingredients: ["Dumpling wrappers", "Ground pork", "Cabbage", "Green onions", "Garlic", "Ginger"]
//   },
//   {
//     id: 7,
//     name: "Tempura",
//     image: "https://images.unsplash.com/photo-1579688690278-d36e36fb3f0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     price: 12.99,
//     category: "appetizers",
//     description: "Lightly battered and fried shrimp and vegetables.",
//     inStock: true,
//     featured: false,
//     rating: 4.4,
//     sales: 178,
//     dateAdded: "2024-10-23T15:40:00",
//     ingredients: ["Shrimp", "Assorted vegetables", "Tempura batter", "Tempura dipping sauce"]
//   },
//   {
//     id: 8,
//     name: "Matcha Green Tea",
//     image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     price: 4.99,
//     category: "drinks",
//     description: "Traditional Japanese powdered green tea.",
//     inStock: true,
//     featured: true,
//     rating: 4.4,
//     sales: 224,
//     dateAdded: "2024-10-24T09:20:00",
//     ingredients: ["Matcha green tea powder", "Hot water"]
//   },
//   {
//     id: 9,
//     name: "Mochi Ice Cream",
//     image: "https://images.unsplash.com/photo-1628293356502-861c936da2d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     price: 6.99,
//     category: "desserts",
//     description: "Sweet rice cake filled with ice cream in various flavors.",
//     inStock: false,
//     featured: false,
//     rating: 4.7,
//     sales: 198,
//     dateAdded: "2024-10-25T13:50:00",
//     ingredients: ["Glutinous rice flour", "Sugar", "Ice cream", "Cornstarch"]
//   },
//   {
//     id: 10,
//     name: "Sake",
//     image: "https://images.unsplash.com/photo-1531131141766-e1dc10e8facc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
//     price: 10.50,
//     category: "drinks",
//     description: "Traditional Japanese rice wine served warm or cold.",
//     inStock: true,
//     featured: false,
//     rating: 4.2,
//     sales: 156,
//     dateAdded: "2024-10-26T17:15:00",
//     ingredients: ["Rice", "Water", "Koji"]
//   }
// ]);
function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Get products from Firebase via ProductsService
        const data = await productsService.getAllProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    // Apply search filter
    const searchMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply category filter
    const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
    
    // Apply stock filter
    const stockMatch = stockFilter === 'all' || 
                      (stockFilter === 'inStock' && product.inStock) || 
                      (stockFilter === 'outOfStock' && !product.inStock);
    
    return searchMatch && categoryMatch && stockMatch;
  }).sort((a, b) => {
    // Apply sorting
    let comparison = 0;
    
    if (sortBy === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortBy === 'price') {
      comparison = a.price - b.price;
    } else if (sortBy === 'rating') {
      comparison = a.rating - b.rating;
    } else if (sortBy === 'sales') {
      comparison = a.sales - b.sales;
    } else if (sortBy === 'dateAdded') {
      comparison = new Date(a.dateAdded) - new Date(b.dateAdded);
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // View product details
  const viewProductDetails = (product) => {
    setSelectedProduct(product);
  };

  // Toggle product featured status
  const toggleFeatured = async (productId) => {
    try {
      // Find the product
      const product = products.find(p => p.id === productId);
      if (!product) return;

      // Optimistic UI update
      setProducts(products.map(product => 
        product.id === productId ? { ...product, featured: !product.featured } : product
      ));

      if (selectedProduct && selectedProduct.id === productId) {
        setSelectedProduct({ ...selectedProduct, featured: !selectedProduct.featured });
      }

      // Update in backend
      await productsService.updateProduct(productId, { featured: !product.featured });
    } catch (err) {
      console.error('Error toggling featured status:', err);
      // Revert the UI changes in case of error
      const originalProducts = await productsService.getAllProducts();
      setProducts(originalProducts);
      if (selectedProduct) {
        const updatedSelected = originalProducts.find(p => p.id === selectedProduct.id);
        if (updatedSelected) {
          setSelectedProduct(updatedSelected);
        }
      }
    }
  };

  // Toggle product stock status
  const toggleStock = async (productId) => {
    try {
      // Find the product
      const product = products.find(p => p.id === productId);
      if (!product) return;

      // Optimistic UI update
      setProducts(products.map(product => 
        product.id === productId ? { ...product, inStock: !product.inStock } : product
      ));

      if (selectedProduct && selectedProduct.id === productId) {
        setSelectedProduct({ ...selectedProduct, inStock: !selectedProduct.inStock });
      }

      // Update in backend
      await productsService.updateProduct(productId, { inStock: !product.inStock });
    } catch (err) {
      console.error('Error toggling stock status:', err);
      // Revert the UI changes in case of error
      const originalProducts = await productsService.getAllProducts();
      setProducts(originalProducts);
      if (selectedProduct) {
        const updatedSelected = originalProducts.find(p => p.id === selectedProduct.id);
        if (updatedSelected) {
          setSelectedProduct(updatedSelected);
        }
      }
    }
  };

  // Delete product
  const deleteProduct = async (productId) => {
    try {
      // Optimistic UI update
      setProducts(products.filter(product => product.id !== productId));
      
      if (selectedProduct && selectedProduct.id === productId) {
        setSelectedProduct(null);
      }

      // Delete from backend
      await productsService.deleteProduct(productId);
    } catch (err) {
      console.error('Error deleting product:', err);
      // Revert the UI changes in case of error
      const originalProducts = await productsService.getAllProducts();
      setProducts(originalProducts);
    }
  };

  // Navigate to edit product page
  const navigateToEdit = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  // Navigate to add product page
  const navigateToAddProduct = () => {
    navigate('/admin/products/add-product');
  };

  // Calculate product statistics
  const productStats = {
    total: products.length,
    inStock: products.filter(p => p.inStock).length,
    outOfStock: products.filter(p => !p.inStock).length,
    featured: products.filter(p => p.featured).length
  };

  return (
    <div className='flex flex-col space-y-6'>
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Product <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Catalog</span>
              </h2>
              <p className="text-gray-400">
                View and manage your menu items
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

      {/* Error message */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      {/* Product Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Total Products</p>
                <h3 className="text-2xl font-bold text-white">{productStats.total}</h3>
              </div>
              <div className="h-10 w-10 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* In Stock Products */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">In Stock</p>
                <h3 className="text-2xl font-bold text-white">{productStats.inStock}</h3>
              </div>
              <div className="h-10 w-10 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Out of Stock Products */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Out of Stock</p>
                <h3 className="text-2xl font-bold text-white">{productStats.outOfStock}</h3>
              </div>
              <div className="h-10 w-10 bg-red-500/20 rounded-lg flex items-center justify-center text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Products */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-400 text-sm">Featured</p>
                <h3 className="text-2xl font-bold text-white">{productStats.featured}</h3>
              </div>
              <div className="h-10 w-10 bg-yellow-500/20 rounded-lg flex items-center justify-center text-yellow-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter options */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Category</label>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="all">All Categories</option>
                  <option value="ramen">Ramen</option>
                  <option value="sushi">Sushi</option>
                  <option value="appetizers">Appetizers</option>
                  <option value="desserts">Desserts</option>
                  <option value="drinks">Drinks</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Stock Status</label>
                <select 
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="all">All Products</option>
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="sales">Sales</option>
                  <option value="dateAdded">Date Added</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Order</label>
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Table */}
        <div className={`${selectedProduct ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Product List</h3>
              <div className="flex items-center">
                <button 
                  onClick={navigateToAddProduct}
                  className="px-4 py-1.5 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Product
                </button>
              </div>
            </div>
            
            {isLoading ? (
              <div className="p-8 flex justify-center">
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
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Rating</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                          <tr key={product.id} className={index % 2 === 0 ? 'bg-gray-800/30' : 'bg-gray-800/10'}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-12 w-12 flex-shrink-0 rounded-md overflow-hidden">
                                  <img className="h-12 w-12 object-cover" src={product.image} alt={product.name} />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-white">{product.name}</div>
                                  <div className="text-sm text-gray-400 truncate max-w-xs">{product.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-700 text-gray-300 capitalize">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {formatCurrency(product.price)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 text-sm text-gray-300">{product.rating?.toFixed(1) || "0.0"}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex space-x-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${product.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                                {product.featured && (
                                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400">
                                    Featured
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                              <button 
                                onClick={() => viewProductDetails(product)}
                                className="text-blue-400 hover:text-blue-300 transition duration-150 mr-3"
                              >
                                View
                              </button>
                              <button 
                                onClick={() => toggleFeatured(product.id)}
                                className={`${product.featured ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-400 hover:text-gray-300'} transition duration-150 mr-3`}
                                title={product.featured ? 'Remove from featured' : 'Add to featured'}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                                </svg>
                              </button>
                              <button 
                                onClick={() => deleteProduct(product.id)}
                                className="text-red-400 hover:text-red-300 transition duration-150"
                                title="Delete product"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-10 text-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <p className="text-lg">No products found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filter criteria</p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-gray-800/20 border-t border-gray-700">
                  <p className="text-sm text-gray-400">
                    Showing {filteredProducts.length} of {products.length} products
                    {categoryFilter !== 'all' ? ` in ${categoryFilter}` : ''}
                    {stockFilter !== 'all' ? ` (${stockFilter === 'inStock' ? 'in stock' : 'out of stock'})` : ''}
                    {searchTerm ? ` matching "${searchTerm}"` : ''}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Product Details */}
        {selectedProduct && (
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden sticky top-6">
              <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Product Details</h3>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-white transition duration-150"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div>
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {selectedProduct.featured && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/70 text-white">
                        Featured
                      </span>
                    )}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${selectedProduct.inStock ? 'bg-green-500/70 text-white' : 'bg-red-500/70 text-white'}`}>
                      {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h4 className="text-xl font-semibold text-white">{selectedProduct.name}</h4>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-bold text-yellow-500 mr-2">
                        {formatCurrency(selectedProduct.price)}
                      </span>
                      <span className="text-sm px-2 py-0.5 bg-gray-700 text-gray-300 rounded-full capitalize">
                        {selectedProduct.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-gray-700">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 text-white">{selectedProduct.rating?.toFixed(1) || "0.0"}</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {selectedProduct.sales || 0} sold
                    </div>
                    <div className="text-gray-400 text-sm">
                      Added: {formatDate(selectedProduct.dateAdded)}
                    </div>
                  </div>
                  
                  <div className="py-3 border-b border-gray-700">
                    <h5 className="text-sm font-medium text-gray-400 mb-2">DESCRIPTION</h5>
                    <p className="text-gray-300 text-sm">{selectedProduct.description}</p>
                  </div>
                  
                  {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 && (
                    <div className="py-3 border-b border-gray-700">
                      <h5 className="text-sm font-medium text-gray-400 mb-2">INGREDIENTS</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.ingredients.map((ingredient, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-full">
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-3 mt-6">
                    <button 
                      onClick={() => toggleStock(selectedProduct.id)}
                      className={`flex-1 px-4 py-2 ${selectedProduct.inStock ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'} font-medium rounded-lg transition duration-300 flex items-center justify-center`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {selectedProduct.inStock ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        )}
                      </svg>
                      {selectedProduct.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                    </button>
                    
                    <button 
                      onClick={() => toggleFeatured(selectedProduct.id)}
                      className={`flex-1 px-4 py-2 ${selectedProduct.featured ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white'} font-medium rounded-lg transition duration-300 flex items-center justify-center`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                      </svg>
                      {selectedProduct.featured ? 'Remove Featured' : 'Mark as Featured'}
                    </button>
                  </div>
                  
                  <div className="flex space-x-3 mt-3">
                    <button 
                      onClick={() => navigateToEdit(selectedProduct.id)}
                      className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-medium rounded-lg transition duration-300 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Product
                    </button>
                    
                    <button 
                      onClick={() => deleteProduct(selectedProduct.id)} 
                      className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 font-medium rounded-lg transition duration-300 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;