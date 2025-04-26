import React, { useState } from 'react';

function Restaurants() {
  // Sample restaurant data - in a real app, this would come from API
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "Ramen Paradise - Tokyo",
      address: "1-2-3 Shibuya, Tokyo, Japan",
      phone: "+81 3-1234-5678",
      manager: "Kenji Yamamoto",
      status: "active",
      rating: 4.8,
      openingHours: "11:00 AM - 10:00 PM",
      image: "https://images.unsplash.com/photo-1554502078-ef0fc409efce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Ramen Paradise - Osaka",
      address: "4-5-6 Dotonbori, Osaka, Japan",
      phone: "+81 6-8765-4321",
      manager: "Haruka Tanaka",
      status: "active",
      rating: 4.6,
      openingHours: "11:30 AM - 9:30 PM",
      image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Ramen Paradise - New York",
      address: "123 Fifth Avenue, New York, NY, USA",
      phone: "+1 (212) 555-7890",
      manager: "Alex Johnson",
      status: "maintenance",
      rating: 4.5,
      openingHours: "12:00 PM - 11:00 PM",
      image: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [editMode, setEditMode] = useState(false);

  // Form state for adding/editing restaurant
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    manager: '',
    status: 'active',
    openingHours: '',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Start adding a new restaurant
  const handleAddNew = () => {
    setFormData({
      name: '',
      address: '',
      phone: '',
      manager: '',
      status: 'active',
      openingHours: '',
      image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    });
    setIsAdding(true);
    setEditMode(false);
    setSelectedRestaurant(null);
  };

  // Submit form (add or edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editMode && selectedRestaurant) {
      // Update existing restaurant
      const updatedRestaurants = restaurants.map(restaurant => 
        restaurant.id === selectedRestaurant.id 
          ? { ...restaurant, ...formData } 
          : restaurant
      );
      setRestaurants(updatedRestaurants);
    } else {
      // Add new restaurant
      const newRestaurant = {
        ...formData,
        id: Date.now(),
        rating: 0 // New restaurants start with 0 rating
      };
      setRestaurants([...restaurants, newRestaurant]);
    }
    
    // Reset form
    setIsAdding(false);
    setEditMode(false);
    setSelectedRestaurant(null);
  };

  // Cancel form
  const handleCancel = () => {
    setIsAdding(false);
    setEditMode(false);
    setSelectedRestaurant(null);
  };

  // Select a restaurant to edit
  const handleEdit = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      address: restaurant.address,
      phone: restaurant.phone,
      manager: restaurant.manager,
      status: restaurant.status,
      openingHours: restaurant.openingHours,
      image: restaurant.image
    });
    setEditMode(true);
    setIsAdding(true);
  };

  // Delete a restaurant
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== id));
    }
  };

  // View restaurant details
  const handleView = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setEditMode(false);
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'maintenance':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'closed':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className='flex flex-col space-y-6'>
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Restaurant <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Management</span>
              </h2>
              <p className="text-gray-400">
                View, add, and manage your restaurant locations
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mt-4"></div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button 
                onClick={handleAddNew}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 transform hover:-translate-y-1 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Restaurant
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Restaurant list - takes 2/3 width on large screens when no restaurant is selected */}
        <div className={`space-y-6 ${selectedRestaurant && !isAdding ? 'md:col-span-2' : 'md:col-span-3'}`}>
          {/* Restaurant list */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Restaurant Locations</h3>
            </div>
            <div className="p-6">
              {isAdding ? (
                <div className="bg-gray-700/50 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-4">
                    {editMode ? 'Edit Restaurant' : 'Add New Restaurant'}
                  </h4>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-400 mb-2 font-medium">Restaurant Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2 font-medium">Phone Number</label>
                        <input 
                          type="text" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        />
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-gray-400 mb-2 font-medium">Address</label>
                        <input 
                          type="text" 
                          name="address" 
                          value={formData.address} 
                          onChange={handleInputChange} 
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2 font-medium">Manager Name</label>
                        <input 
                          type="text" 
                          name="manager" 
                          value={formData.manager} 
                          onChange={handleInputChange} 
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2 font-medium">Opening Hours</label>
                        <input 
                          type="text" 
                          name="openingHours" 
                          value={formData.openingHours} 
                          onChange={handleInputChange} 
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2 font-medium">Status</label>
                        <select 
                          name="status" 
                          value={formData.status} 
                          onChange={handleInputChange} 
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                          <option value="active">Active</option>
                          <option value="maintenance">Under Maintenance</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-gray-400 mb-2 font-medium">Image URL</label>
                        <input 
                          type="text" 
                          name="image" 
                          value={formData.image} 
                          onChange={handleInputChange} 
                          className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 mt-6">
                      <button 
                        type="button"
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition duration-300 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {editMode ? 'Update' : 'Save'}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {restaurants.map((restaurant) => (
                    <div 
                      key={restaurant.id} 
                      className="bg-gray-700/30 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-colors"
                    >
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h4 className="text-lg font-semibold text-white">{restaurant.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(restaurant.status)}`}>
                            {restaurant.status === 'active' ? 'Active' : 
                              restaurant.status === 'maintenance' ? 'Maintenance' : 'Closed'}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{restaurant.address}</p>
                        
                        <div className="flex items-center mt-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-gray-400 text-sm ml-2">{restaurant.openingHours}</span>
                        </div>
                        
                        <div className="flex items-center mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-gray-400 text-sm ml-2">{restaurant.phone}</span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-white text-sm ml-1 font-medium">{restaurant.rating}</span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <button 
                              onClick={() => handleView(restaurant)}
                              className="p-1.5 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleEdit(restaurant)}
                              className="p-1.5 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button 
                              onClick={() => handleDelete(restaurant.id)}
                              className="p-1.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {restaurants.length === 0 && !isAdding && (
                <div className="text-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h4 className="text-lg font-medium text-gray-400 mt-4">No restaurants found</h4>
                  <p className="text-gray-500 mt-2">Add your first restaurant to get started</p>
                  <button 
                    onClick={handleAddNew}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300"
                  >
                    Add New Restaurant
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Restaurant details - shows when a restaurant is selected and not in add/edit mode */}
        {selectedRestaurant && !isAdding && (
          <div className="md:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden sticky top-6">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={selectedRestaurant.image} 
                  alt={selectedRestaurant.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white">{selectedRestaurant.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(selectedRestaurant.status)}`}>
                      {selectedRestaurant.status === 'active' ? 'Active' : 
                        selectedRestaurant.status === 'maintenance' ? 'Maintenance' : 'Closed'}
                    </span>
                    <div className="flex items-center ml-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-white text-sm ml-1">{selectedRestaurant.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm text-gray-400 font-medium mb-1">Address</h4>
                    <p className="text-white">{selectedRestaurant.address}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 font-medium mb-1">Contact</h4>
                    <p className="text-white">{selectedRestaurant.phone}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 font-medium mb-1">Manager</h4>
                    <p className="text-white">{selectedRestaurant.manager}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm text-gray-400 font-medium mb-1">Hours</h4>
                    <p className="text-white">{selectedRestaurant.openingHours}</p>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-4 flex space-x-2">
                    <button 
                      onClick={() => handleEdit(selectedRestaurant)}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button 
                      onClick={() => setSelectedRestaurant(null)}
                      className="flex-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Close
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

export default Restaurants;