import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchAllProducts, selectAllProducts } from  '../features/productSlice';

// const MENU_ITEMS = [
//   {
//     id: 'tonkotsu',
//     name: 'Tonkotsu Ramen',
//     description: 'Rich pork bone broth with tender chashu pork, ajitama egg, and green onions',
//     price: 14.99,
//     image: '/images/tonkotsu.jpg',
//     category: 'ramen',
//     featured: true,
//     spiceLevel: 1,
//     popular: true,
//     dateAdded: '2025-01-15T12:30:00.000Z',
//     inStock: true,
//     tags: ['creamy', 'umami', 'classic'],
//     ingredients: ['Pork bone broth', 'Chashu pork', 'Ajitama egg', 'Green onions', 'Nori', 'Bamboo shoots'],
//     rating: 4.8,
//     sales: 250
//   },
//   {
//     id: 'spicy-miso',
//     name: 'Spicy Miso Ramen',
//     description: 'Hearty miso broth with spicy chili oil, ground pork, corn, butter, and bean sprouts',
//     price: 15.99,
//     image: '/images/spicy-miso.jpg',
//     category: 'ramen',
//     featured: true,
//     spiceLevel: 3,
//     popular: true,
//     dateAdded: '2025-01-20T14:45:00.000Z',
//     inStock: true,
//     tags: ['spicy', 'rich', 'comforting'],
//     ingredients: ['Miso broth', 'Spicy chili oil', 'Ground pork', 'Corn', 'Butter', 'Bean sprouts', 'Ajitama egg'],
//     rating: 4.7,
//     sales: 230
//   },
//   {
//     id: 'shoyu',
//     name: 'Shoyu Ramen',
//     description: 'Classic soy sauce based broth with chicken chashu, menma, and spinach',
//     price: 13.99,
//     image: '/images/shoyu.jpg',
//     category: 'ramen',
//     featured: false,
//     spiceLevel: 1,
//     popular: false,
//     dateAdded: '2025-01-10T09:20:00.000Z',
//     inStock: true,
//     tags: ['light', 'balanced', 'traditional'],
//     ingredients: ['Soy sauce chicken broth', 'Chicken chashu', 'Menma', 'Spinach', 'Green onions', 'Naruto'],
//     rating: 4.5,
//     sales: 180
//   },
//   {
//     id: 'tantanmen',
//     name: 'Tantanmen',
//     description: 'Creamy sesame broth with spicy minced pork, bok choy, and chili oil',
//     price: 16.99,
//     image: '/images/tantanmen.jpg',
//     category: 'ramen',
//     featured: false,
//     spiceLevel: 4,
//     popular: false,
//     dateAdded: '2025-02-05T16:30:00.000Z',
//     inStock: true,
//     tags: ['spicy', 'nutty', 'rich'],
//     ingredients: ['Sesame broth', 'Spicy minced pork', 'Bok choy', 'Chili oil', 'Sesame paste', 'Green onions'],
//     rating: 4.6,
//     sales: 150
//   },
//   {
//     id: 'veggie',
//     name: 'Veggie Delight Ramen',
//     description: 'Vegetable broth with tofu, mushrooms, corn, and seasonal vegetables',
//     price: 13.99,
//     image: '/images/veggie.jpg',
//     category: 'ramen',
//     featured: false,
//     spiceLevel: 0,
//     popular: false,
//     dateAdded: '2025-02-10T11:15:00.000Z',
//     inStock: true,
//     tags: ['vegetarian', 'healthy', 'light'],
//     ingredients: ['Vegetable broth', 'Tofu', 'Shiitake mushrooms', 'Corn', 'Bamboo shoots', 'Yu choy'],
//     rating: 4.4,
//     sales: 120
//   },
//   {
//     id: 'tsukemen',
//     name: 'Tsukemen Dipping Noodles',
//     description: 'Cold noodles served with rich dipping broth, pork, and ajitama egg',
//     price: 16.99,
//     image: '/images/tsukemen.jpg',
//     category: 'specialty',
//     featured: true,
//     spiceLevel: 2,
//     popular: true,
//     dateAdded: '2025-03-01T10:00:00.000Z',
//     inStock: true,
//     tags: ['unique', 'concentrated', 'refreshing'],
//     ingredients: ['Concentrated dipping broth', 'Cold noodles', 'Chashu pork', 'Ajitama egg', 'Lime', 'Green onions'],
//     rating: 4.9,
//     sales: 200
//   },
//   {
//     id: 'maki-sushi',
//     name: 'Maki Sushi',
//     description: 'Maki rolls are the most recognizable form of sushi — vinegared rice and fillings (like cucumber, tuna, avocado, or crab) wrapped in a sheet of nori (seaweed) and sliced into bite-sized pieces. They can range from simple (one filling) to complex (specialty rolls).',
//     price: 8,
//     image: 'https://fra.cloud.appwrite.io/v1/storage/buckets/680cdea9001879fd10c6/files/680e87a9001763540dbf/view?project=680cdd90000983513641',
//     category: 'sushi',
//     featured: true,
//     spiceLevel: 0,
//     popular: true,
//     dateAdded: '2025-04-27T19:38:17.373Z',
//     inStock: true,
//     ingredients: [],
//     rating: 0,
//     sales: 0,
//     imageMeta: {
//       bucketId: "680cdea9001879fd10c6",
//       fileId: "680e87a9001763540dbf"
//     }
//   }
// ];

const TOPPINGS = [
  { id: 'extra-chashu', name: 'Extra Chashu', price: 3.50 },
  { id: 'extra-egg', name: 'Extra Ajitama Egg', price: 2.00 },
  { id: 'extra-noodles', name: 'Extra Noodles', price: 2.50 },
  { id: 'extra-corn', name: 'Corn', price: 1.00 },
  { id: 'extra-nori', name: 'Extra Nori', price: 1.00 },
  { id: 'butter', name: 'Butter', price: 1.00 },
  { id: 'kimchi', name: 'Kimchi', price: 2.50 },
  { id: 'spicy', name: 'Extra Spicy', price: 0.50 },
  { id: 'wasabi', name: 'Extra Wasabi', price: 0.50 },
  { id: 'ginger', name: 'Extra Ginger', price: 0.75 },
];

// Define common categories for our menu
const MENU_CATEGORIES = [
  { id: 'all', name: 'All Items' },
  { id: 'ramen', name: 'Ramen' },
  { id: 'specialty', name: 'Specialty' },
  { id: 'sushi', name: 'Sushi' },
  { id: 'vegetarian', name: 'Vegetarian' }
];

export default function OrderPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const user = auth.userData;
  const productList = useSelector(selectAllProducts);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [spiceLevelFilter, setSpiceLevelFilter] = useState(null);
  
  const [expandedItemId, setExpandedItemId] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [customizationQuantity, setCustomizationQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchAllProducts())
  },[dispatch]);

  const filteredMenu = productList.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesSpiceLevel = spiceLevelFilter === null || item.spiceLevel === spiceLevelFilter;
    
    return matchesCategory && matchesSearch && matchesSpiceLevel;
  });
  
  const addToCart = (menuItem, quantity = 1, selectedToppings = []) => {
    const existingItemIndex = cartItems.findIndex(
      item => item.id === menuItem.id && 
            JSON.stringify(item.toppings) === JSON.stringify(selectedToppings)
    );
    
    if (existingItemIndex > -1) {
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      updatedCart[existingItemIndex].totalPrice = calculateItemTotal(
        updatedCart[existingItemIndex].price,
        updatedCart[existingItemIndex].toppings,
        updatedCart[existingItemIndex].quantity
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          ...menuItem,
          quantity,
          toppings: selectedToppings,
          totalPrice: calculateItemTotal(menuItem.price, selectedToppings, quantity)
        }
      ]);
    }
    
    // Show the cart drawer when item is added
    setShowCart(true);
  };
  
  const updateCartItemQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    updatedCart[index].totalPrice = calculateItemTotal(
      updatedCart[index].price, 
      updatedCart[index].toppings, 
      newQuantity
    );
    
    setCartItems(updatedCart);
  };
  
  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
  };
  
  const calculateItemTotal = (basePrice, toppings, quantity) => {
    const toppingsTotal = toppings.reduce((sum, topping) => sum + topping.price, 0);
    return (basePrice + toppingsTotal) * quantity;
  };
  
  const cartTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    if (!user) {
      // Redirect to sign in page if user is not authenticated
      navigate('/signin', { state: { returnUrl: '/order' } });
      return;
    }
    
    // Navigate to checkout page
    navigate('/checkout', { state: { cartItems, total: cartTotal } });
  };
  
  const toggleItemExpansion = (itemId) => {
    if (expandedItemId === itemId) {
      // Close the expanded item
      setExpandedItemId(null);
      setSelectedToppings([]);
      setCustomizationQuantity(1);
    } else {
      // Open a new item
      setExpandedItemId(itemId);
      setSelectedToppings([]);
      setCustomizationQuantity(1);
    }
  };
  
  const handleToppingToggle = (topping) => {
    const isSelected = selectedToppings.some(item => item.id === topping.id);
    
    if (isSelected) {
      setSelectedToppings(selectedToppings.filter(item => item.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };
  
  const calculateCustomizationTotal = (menuItem) => {
    if (!menuItem) return 0;
    
    const toppingsTotal = selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
    return (menuItem.price + toppingsTotal) * customizationQuantity;
  };
  
  const handleAddCustomizedItem = (menuItem) => {
    if (!menuItem) return;
    
    addToCart(menuItem, customizationQuantity, selectedToppings);
    setExpandedItemId(null);
    setSelectedToppings([]);
    setCustomizationQuantity(1);
  };

  const hideScrollbarStyle = {
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE 10+
  };

  const webkitScrollbarStyle = `
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Add the WebKit scrollbar style */}
      <style>{webkitScrollbarStyle}</style>
      
      {/* Main Content with Left-Right Layout */}
      <div className="flex h-screen">
        {/* Left Side - Menu Navigation and Items */}
        <div 
          className="w-full md:w-3/4 h-screen overflow-y-auto hide-scrollbar" 
          style={hideScrollbarStyle}
        >
          {/* Title and Filter Bar */}
          <div className="sticky top-0 bg-gray-900 z-10 p-4 pb-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold text-white">Order Online</h1>
                <p className="text-gray-400">Order delicious food for pickup or delivery</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setShowCart(!showCart)}
                  className="relative bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search our menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
              
              <select
                value={spiceLevelFilter === null ? 'all' : spiceLevelFilter}
                onChange={(e) => setSpiceLevelFilter(e.target.value === 'all' ? null : Number(e.target.value))}
                className="pl-3 pr-10 py-2 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="all">Spice Level</option>
                <option value="0">No Spice</option>
                <option value="1">Mild</option>
                <option value="2">Medium</option>
                <option value="3">Spicy</option>
                <option value="4">Extra Spicy</option>
              </select>
            </div>
            
            {/* Category Tabs */}
            <div className="flex overflow-x-auto hide-scrollbar py-3 -mx-4 px-4 mt-3 space-x-2" style={hideScrollbarStyle}>
              {MENU_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Menu Items List */}
          <div className="p-4">
            {filteredMenu.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {filteredMenu.map((menuItem) => (
                  <React.Fragment key={menuItem.id}>
                    {/* When an item is expanded but it's not this one, hide this item */}
                    {(expandedItemId === null || expandedItemId === menuItem.id) && (
                      <div 
                        className={`bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition-all
                          ${expandedItemId === menuItem.id ? 'md:col-span-2 ring-2 ring-yellow-500' : ''}
                          ${menuItem.featured ? 'ring-1 ring-yellow-500/30' : ''}
                        `}
                      >
                        {/* Basic Item Info */}
                        <div className="flex">
                          <div className="w-1/3 aspect-square overflow-hidden flex-shrink-0">
                            <img
                              src={menuItem.image || `https://source.unsplash.com/600x400/?food,${menuItem.name.toLowerCase()}`}
                              alt={menuItem.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          
                          <div className="flex-1 p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="text-lg font-bold text-white">{menuItem.name}</h3>
                                  {menuItem.featured && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-900/40 text-yellow-500 rounded-full">
                                      Featured ⭐
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-400 text-sm mt-1 line-clamp-2">{menuItem.description}</p>
                              </div>
                              <span className="text-yellow-500 font-bold">${menuItem.price.toFixed(2)}</span>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                              {menuItem.spiceLevel > 0 && (
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  menuItem.spiceLevel === 1 ? 'bg-yellow-900/40 text-yellow-500' :
                                  menuItem.spiceLevel === 2 ? 'bg-orange-900/40 text-orange-500' :
                                  menuItem.spiceLevel === 3 ? 'bg-red-900/40 text-red-500' :
                                  'bg-red-900/40 text-red-400'
                                }`}>
                                  {menuItem.spiceLevel === 1 && 'Mild'}
                                  {menuItem.spiceLevel === 2 && 'Medium'}
                                  {menuItem.spiceLevel === 3 && 'Spicy'}
                                  {menuItem.spiceLevel >= 4 && 'Very Spicy'}
                                  {' '}{Array(menuItem.spiceLevel).fill('🌶️').join('')}
                                </span>
                              )}
                              
                              {menuItem.category && (
                                <span className="px-2 py-1 text-xs bg-gray-700/80 rounded-full text-gray-300">
                                  {menuItem.category}
                                </span>
                              )}
                              
                              {menuItem.tags && menuItem.tags.slice(0, 1).map((tag) => (
                                <span key={tag} className="px-2 py-1 text-xs bg-gray-700 rounded-full text-gray-300">
                                  {tag}
                                </span>
                              ))}
                              
                              {menuItem.rating > 0 && (
                                <span className="px-2 py-1 text-xs bg-blue-900/40 text-blue-400 rounded-full flex items-center">
                                  <span className="mr-1">★</span>{menuItem.rating.toFixed(1)}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex justify-between mt-4">
                              <button
                                onClick={() => toggleItemExpansion(menuItem.id)}
                                className={`px-4 py-2 ${
                                  expandedItemId === menuItem.id
                                    ? "bg-gray-600 text-white"
                                    : "bg-gray-700 hover:bg-gray-600 text-white"
                                } rounded-md transition-colors`}
                              >
                                {expandedItemId === menuItem.id ? 'Cancel' : 'Customize'}
                              </button>
                              
                              {expandedItemId !== menuItem.id && (
                                <button
                                  onClick={() => addToCart(menuItem)}
                                  disabled={!menuItem.inStock}
                                  className={`px-4 py-2 ${
                                    menuItem.inStock 
                                      ? 'bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600'
                                      : 'bg-gray-600 cursor-not-allowed'
                                  } text-white rounded-md transition-colors`}
                                >
                                  {menuItem.inStock ? 'Add to Cart' : 'Out of Stock'}
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        {/* Expanded Customization Area */}
                        {expandedItemId === menuItem.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="border-t border-gray-700"
                          >
                            <div className="p-4">
                              {/* Ingredients Section */}
                              {menuItem.ingredients && menuItem.ingredients.length > 0 && (
                                <div className="mb-6">
                                  <h3 className="text-md font-medium text-white mb-2">Ingredients</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {menuItem.ingredients.map((ingredient, index) => (
                                      <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-sm rounded-md">
                                        {ingredient}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              {/* Toppings Section - Show appropriate toppings based on category */}
                              <div className="mb-6">
                                <h3 className="text-md font-medium text-white mb-2">Add Extras</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                  {TOPPINGS
                                    .filter(topping => 
                                      // For sushi category, only show wasabi and ginger
                                      menuItem.category === 'sushi' ? 
                                        ['wasabi', 'ginger'].includes(topping.id) : 
                                        // Don't show wasabi and ginger for other categories
                                        !['wasabi', 'ginger'].includes(topping.id)
                                    )
                                    .map((topping) => (
                                    <div 
                                      key={topping.id}
                                      onClick={() => handleToppingToggle(topping)}
                                      className={`p-2 rounded-lg flex items-center justify-between cursor-pointer ${
                                        selectedToppings.some(item => item.id === topping.id)
                                          ? 'bg-yellow-500/20 border border-yellow-500/50'
                                          : 'bg-gray-700 border border-gray-700 hover:border-gray-600'
                                      }`}
                                    >
                                      <div>
                                        <h4 className="text-sm text-white font-medium">{topping.name}</h4>
                                        <p className="text-xs text-gray-400">+${topping.price.toFixed(2)}</p>
                                      </div>
                                      
                                      {selectedToppings.some(item => item.id === topping.id) && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              {/* Quantity and Add to Cart */}
                              <div className="flex flex-wrap justify-between items-center gap-4">
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm text-gray-400">Quantity:</span>
                                  <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-2">
                                    <button
                                      onClick={() => customizationQuantity > 1 && setCustomizationQuantity(customizationQuantity - 1)}
                                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                                    >
                                      -
                                    </button>
                                    <span className="w-6 text-center">{customizationQuantity}</span>
                                    <button
                                      onClick={() => setCustomizationQuantity(customizationQuantity + 1)}
                                      className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-4">
                                  <p className="text-lg font-bold text-yellow-500">
                                    ${calculateCustomizationTotal(menuItem).toFixed(2)}
                                  </p>
                                  <button
                                    onClick={() => handleAddCustomizedItem(menuItem)}
                                    disabled={!menuItem.inStock}
                                    className={`px-4 py-2 ${
                                      menuItem.inStock 
                                        ? 'bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600'
                                        : 'bg-gray-600 cursor-not-allowed'
                                    } text-white rounded-md transition-colors`}
                                  >
                                    {menuItem.inStock ? 'Add to Cart' : 'Out of Stock'}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800/50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-medium text-gray-300 mb-2">No items found</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                    setSpiceLevelFilter(null);
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Side - Cart (Always visible on larger screens) */}
        <div 
          className="hidden md:block w-1/4 h-screen bg-gray-800 border-l border-gray-700"
        >
          <div className="h-full flex flex-col">
            {/* Cart Header */}
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Your Order</h2>
            </div>
            
            {/* Cart Items */}
            <div 
              className="flex-1 overflow-y-auto p-4 hide-scrollbar" 
              style={hideScrollbarStyle}
            >
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="bg-gray-700 rounded-lg p-3 flex gap-3 relative">
                      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || `https://source.unsplash.com/100x100/?food,${item.name.toLowerCase()}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-white text-sm">{item.name}</h3>
                          <span className="text-yellow-500 font-bold text-sm">${item.totalPrice.toFixed(2)}</span>
                        </div>
                        
                        {item.toppings?.length > 0 && (
                          <div className="mt-1">
                            <p className="text-xs text-gray-400">With: {item.toppings.map(t => t.name).join(', ')}</p>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center space-x-1 bg-gray-600 rounded-md px-1">
                            <button
                              onClick={() => updateCartItemQuantity(index, item.quantity - 1)}
                              className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white"
                            >
                              -
                            </button>
                            <span className="w-5 text-center text-xs">{item.quantity}</span>
                            <button
                              onClick={() => updateCartItemQuantity(index, item.quantity + 1)}
                              className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white"
                            >
                              +
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeFromCart(index)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Your cart is empty</h3>
                  <p className="text-gray-400 text-sm">Add some delicious items to your order!</p>
                </div>
              )}
            </div>
            
            {/* Checkout Section */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex justify-between mb-4">
                <span className="text-gray-300">Total:</span>
                <span className="text-xl font-bold text-yellow-500">${cartTotal.toFixed(2)}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className={`w-full py-3 text-white font-medium rounded-md transition-colors flex items-center justify-center ${
                  cartItems.length === 0
                    ? 'bg-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Cart Drawer */}
      <AnimatePresence>
        {showCart && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="md:hidden fixed inset-0 bg-black z-40"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
              className="md:hidden fixed right-0 top-0 h-full w-full max-w-xs bg-gray-800 shadow-xl z-50 flex flex-col"
            >
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Your Order</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Cart Items - with hidden scrollbar */}
              <div 
                className="flex-1 overflow-y-auto p-4 hide-scrollbar" 
                style={hideScrollbarStyle}
              >
                {cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div key={`${item.id}-${index}`} className="bg-gray-700 rounded-lg p-3 flex gap-3 relative">
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img
                            src={item.image || `https://source.unsplash.com/100x100/?food,${item.name.toLowerCase()}`}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-white text-sm">{item.name}</h3>
                            <span className="text-yellow-500 font-bold">${item.totalPrice.toFixed(2)}</span>
                          </div>
                          
                          {item.toppings?.length > 0 && (
                            <div className="mt-1">
                              <p className="text-xs text-gray-400">With: {item.toppings.map(t => t.name).join(', ')}</p>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center space-x-1 bg-gray-600 rounded-md px-1">
                              <button
                                onClick={() => updateCartItemQuantity(index, item.quantity - 1)}
                                className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white"
                              >
                                -
                              </button>
                              <span className="w-5 text-center text-xs">{item.quantity}</span>
                              <button
                                onClick={() => updateCartItemQuantity(index, item.quantity + 1)}
                                className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-white"
                              >
                                +
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(index)}
                              className="text-red-500 hover:text-red-400"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Your cart is empty</h3>
                    <p className="text-gray-400 text-sm mb-6">Add some delicious items to your order!</p>
                    <button
                      onClick={() => setShowCart(false)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
                    >
                      Browse Menu
                    </button>
                  </div>
                )}
              </div>
              
              {/* Checkout Section - Same as desktop version */}
              <div className="p-4 border-t border-gray-700">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-300">Total:</span>
                  <span className="text-xl font-bold text-yellow-500">${cartTotal.toFixed(2)}</span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                  className={`w-full py-3 text-white font-medium rounded-md transition-colors flex items-center justify-center ${
                    cartItems.length === 0
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Proceed to Checkout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}