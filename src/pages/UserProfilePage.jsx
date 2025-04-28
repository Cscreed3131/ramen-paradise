import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// Import these if you're using Firebase storage
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Access user from Redux store
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  
  const fileInputRef = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  
  // If no user data, will be filled with placeholder data
  const [userData, setUserData] = useState({
    displayName: 'Guest User',
    email: 'guest@example.com',
    photoURL: null,
    phoneNumber: '',
    addresses: [],
    dateJoined: new Date().toISOString(),
    orderCount: 0
  });
  
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({...userData});
  const [orderHistory, setOrderHistory] = useState([]);
  
  // Fetch user data when component mounts
  useEffect(() => {
    if (user) {
      // Fetch user profile data from backend
      // This is a mock implementation
      setUserData({
        displayName: user.displayName || 'Ramen Lover',
        email: user.email || 'user@example.com',
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber || '',
        addresses: user.addresses || [],
        dateJoined: user.createdAt || new Date().toISOString(),
        orderCount: 12
      });
      setFormData({
        displayName: user.displayName || 'Ramen Lover',
        email: user.email || 'user@example.com',
        phoneNumber: user.phoneNumber || '',
        currentAddress: user.addresses?.[0] || '',
        photoURL: user.photoURL,
      });
      
      // Fetch order history - mock data
      setOrderHistory([
        {
          id: 'ORD-12345',
          date: '2025-04-10T14:30:00Z',
          total: 42.99,
          status: 'Delivered',
          items: [
            { name: 'Spicy Miso Ramen', quantity: 2, price: 15.99 },
            { name: 'Gyoza', quantity: 1, price: 7.99 }
          ]
        },
        {
          id: 'ORD-12340',
          date: '2025-04-01T18:45:00Z',
          total: 28.99,
          status: 'Delivered',
          items: [
            { name: 'Tonkotsu Ramen', quantity: 1, price: 16.99 },
            { name: 'Green Tea', quantity: 2, price: 3.99 }
          ]
        },
        {
          id: 'ORD-12335',
          date: '2025-03-15T19:20:00Z',
          total: 33.99,
          status: 'Delivered',
          items: [
            { name: 'Shoyu Ramen', quantity: 1, price: 14.99 },
            { name: 'Takoyaki', quantity: 1, price: 8.99 },
            { name: 'Sake', quantity: 1, price: 9.99 }
          ]
        }
      ]);
    }
  }, [user]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // File size validation (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }
    
    // File type validation
    if (!file.type.match('image.*')) {
      alert("Only image files are allowed.");
      return;
    }
    
    setImageFile(file);
    
    // Create a preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  // this logic can be shifted to appwrite.TODO
  const uploadImageToServer = async () => {
    if (!imageFile) return null;
    
    setIsUploading(true);
    
    try {
      // This is where you would upload the file to your storage service
      // Example for Firebase Storage:
      /*
      const storage = getStorage();
      const storageRef = ref(storage, `profile-photos/${user.uid}/${Date.now()}-${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
      */
      
      // For now, we'll just fake it with the preview URL
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(imagePreview);
        }, 1000);
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleSaveProfile = async () => {
    // First handle image upload if there's a new image
    let photoURL = formData.photoURL;
    
    if (imageFile) {
      const uploadedImageUrl = await uploadImageToServer();
      if (uploadedImageUrl) {
        photoURL = uploadedImageUrl;
      }
    }
    
    // Save profile changes to backend
    // For now, just update local state
    const updatedData = { ...formData, photoURL };
    setUserData({ ...userData, ...updatedData });
    setFormData(updatedData);
    setImageFile(null);
    setImagePreview(null);
    setEditMode(false);
    
    // Here you would dispatch an action to update the user profile in Redux/Firebase
    // dispatch(updateUserProfile(updatedData));
  };
  
  const handleAddAddress = () => {
    if (formData.currentAddress && !userData.addresses.includes(formData.currentAddress)) {
      const newAddresses = [...userData.addresses, formData.currentAddress];
      setUserData({ ...userData, addresses: newAddresses });
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  if (!auth.status || auth.status === 'loading') { // this has to change otherwise it will create potential issues in the application.TODO
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-700 rounded-full mb-6"></div>
          <div className="h-8 bg-gray-700 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-700 rounded w-48"></div>
        </div>
      </div>
    );
  }
  
  if (!user && auth.status === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-2xl font-bold text-white mb-2">Not Signed In</h2>
          <p className="text-gray-300 mb-6">You need to sign in to view your profile.</p>
          <div className="flex space-x-4 justify-center">
            <Link to="/signin" className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors">
              Sign In
            </Link>
            <Link to="/auth/signup" className="px-6 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center text-white font-bold text-xl">R</div>
          </Link>
          <h1 className="text-3xl font-bold text-white">Your Profile</h1>
          <p className="mt-2 text-gray-400">Manage your account details and preferences</p>
        </div>
        
        {/* Profile Card */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl overflow-hidden">
          {/* Profile Header with editable photo */}
          <div className="relative bg-gradient-to-r from-yellow-600 to-red-600 h-40 md:h-60">
            <div className="absolute bottom-0 left-0 w-full p-6 flex items-end backdrop-blur-sm bg-black/30">
              <div className="relative">
                <div className="absolute bottom-0 w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-gray-800 overflow-hidden group">
                  {(imagePreview || userData.photoURL) ? (
                    <img 
                      src={imagePreview || userData.photoURL} 
                      alt={userData.displayName} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-3xl text-white">
                      {userData.displayName?.charAt(0).toUpperCase() || 'R'}
                    </div>
                  )}
                  
                  {/* Photo edit overlay */}
                  <div 
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <div className="text-white text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm">Change Photo</span>
                    </div>
                  </div>
                </div>
                <div className="invisible md:h-32"></div>
                
                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="ml-32 md:ml-40">
                <h2 className="text-white text-2xl font-bold">{userData.displayName}</h2>
                <p className="text-gray-200">{userData.email}</p>
                <p className="text-yellow-300 text-sm mt-1">Member since {formatDate(userData.dateJoined)}</p>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-700">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-6 focus:outline-none ${
                activeTab === 'profile'
                  ? 'border-b-2 border-yellow-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Personal Info
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`py-4 px-6 focus:outline-none ${
                activeTab === 'orders'
                  ? 'border-b-2 border-yellow-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Orders
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-6 focus:outline-none ${
                activeTab === 'settings'
                  ? 'border-b-2 border-yellow-500 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Settings
            </button>
          </div>
          
          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Information */}
            {activeTab === 'profile' && (
              <div className="space-y-8">
                {/* Profile Summary */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-800 rounded-lg">
                  <div className="flex space-x-4 items-center mb-4 md:mb-0">
                    <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">Personal Information</h3>
                      <p className="text-gray-400">Update your personal details</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setEditMode(!editMode)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                  >
                    {editMode ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>
                
                {editMode ? (
                  /* Edit Form */
                  <div className="space-y-6 p-4 bg-gray-800 rounded-lg">
                    {/* Profile Photo Edit Section */}
                    <div className="p-4 border border-gray-700 rounded-lg">
                      <h4 className="text-white font-medium mb-4">Profile Photo</h4>
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700">
                          {(imagePreview || userData.photoURL) ? (
                            <img 
                              src={imagePreview || userData.photoURL} 
                              alt={userData.displayName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-3xl text-white">
                              {userData.displayName?.charAt(0).toUpperCase() || 'R'}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col gap-3">
                          <button 
                            type="button"
                            onClick={triggerFileInput}
                            className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Upload Photo
                          </button>
                          
                          {imagePreview && (
                            <button 
                              type="button"
                              onClick={() => {
                                setImagePreview(null);
                                setImageFile(null);
                              }}
                              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                            >
                              Remove New Photo
                            </button>
                          )}
                          
                          {userData.photoURL && !imagePreview && (
                            <button 
                              type="button"
                              onClick={() => {
                                // This would typically call an API to remove the photo
                                setFormData({...formData, photoURL: null});
                              }}
                              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700 transition-colors"
                            >
                              Remove Current Photo
                            </button>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-xs text-gray-400 mt-4">
                        Recommended: Square image, at least 300x300 pixels, maximum size 5MB.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="displayName" className="block text-sm font-medium text-gray-300">
                          Full Name
                        </label>
                        <input
                          id="displayName"
                          name="displayName"
                          type="text"
                          value={formData.displayName}
                          onChange={handleInputChange}
                          autoComplete="off"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled // Email changes typically require verification
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-400">Contact support to change your email address</p>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-300">
                          Phone Number
                        </label>
                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      
                      {/* Address input */}
                      <div className="space-y-2">
                        <label htmlFor="currentAddress" className="block text-sm font-medium text-gray-300">
                          Add New Address
                        </label>
                        <div className="flex">
                          <input
                            id="currentAddress"
                            name="currentAddress"
                            type="text"
                            value={formData.currentAddress}
                            onChange={handleInputChange}
                            placeholder="Enter delivery address"
                            className="flex-grow px-4 py-3 bg-gray-700 border border-gray-600 rounded-l-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          />
                          <button
                            type="button"
                            onClick={handleAddAddress}
                            className="px-4 py-3 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Existing addresses */}
                    {userData.addresses.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-white font-medium">Your Addresses</h4>
                        {userData.addresses.map((address, index) => (
                          <div key={index} className="p-3 border border-gray-700 rounded-lg flex justify-between items-center">
                            <p className="text-white">{address}</p>
                            {index === 0 && (
                              <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">Default</span>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-4 mt-6">
                      <button 
                        onClick={() => {
                          setEditMode(false);
                          setImagePreview(null);
                          setImageFile(null);
                        }} 
                        className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveProfile}
                        disabled={isUploading}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 flex items-center"
                      >
                        {isUploading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          "Save Changes"
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* View Profile */
                  <div className="space-y-6">
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <h3 className="text-md font-medium text-gray-300 mb-4">Personal Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                        <div>
                          <p className="text-sm text-gray-400">Full Name</p>
                          <p className="text-white">{userData.displayName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Email Address</p>
                          <p className="text-white">{userData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Phone Number</p>
                          <p className="text-white">{userData.phoneNumber || 'Not provided'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Member Since</p>
                          <p className="text-white">{formatDate(userData.dateJoined)}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-md font-medium text-gray-300">Your Addresses</h3>
                        {userData.addresses.length < 3 && (
                          <button 
                            onClick={() => setEditMode(true)}
                            className="text-sm px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                          >
                            Add New
                          </button>
                        )}
                      </div>
                      
                      {userData.addresses.length > 0 ? (
                        <div className="space-y-3">
                          {userData.addresses.map((address, index) => (
                            <div key={index} className="p-3 border border-gray-700 rounded-lg">
                              <div className="flex justify-between">
                                <p className="text-white">{address}</p>
                                {index === 0 && (
                                  <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">Default</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-gray-400 mb-4">You haven't added any delivery addresses yet.</p>
                          <button 
                            onClick={() => setEditMode(true)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                          >
                            Add Address
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex space-x-4 items-center mb-4 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Order History</h3>
                        <p className="text-gray-400">View and manage your orders</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Total Orders</p>
                      <p className="text-2xl font-bold text-white">{userData.orderCount}</p>
                    </div>
                  </div>
                  
                  {orderHistory.length > 0 ? (
                    <div className="space-y-4">
                      {orderHistory.map((order) => (
                        <div key={order.id} className="p-4 border border-gray-700 rounded-lg hover:bg-gray-700/30 transition-colors">
                          <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="text-white font-medium">Order #{order.id}</h4>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-500/20 text-green-400' 
                                    : order.status === 'Processing'
                                    ? 'bg-blue-500/20 text-blue-400'
                                    : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400">{formatDate(order.date)}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                              <p className="text-sm text-gray-400">Total</p>
                              <p className="text-white font-bold">${order.total.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mt-4 border-t border-gray-700 pt-4">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <div className="text-gray-300">
                                  {item.quantity} × {item.name}
                                </div>
                                <div className="text-gray-400">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-end mt-4 space-x-3">
                            <button 
                              className="text-sm px-3 py-1 border border-gray-600 text-gray-300 rounded hover:bg-gray-700"
                              onClick={() => navigate(`/orders/${order.id}`)}
                            >
                              View Details
                            </button>
                            <button 
                              className="text-sm px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                              onClick={() => {
                                // Here you would implement reorder functionality
                                // This could add all items from this order back to cart
                                console.log("Reordering items from order", order.id);
                              }}
                            >
                              Reorder
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <h3 className="text-xl font-medium text-white mb-2">No Orders Yet</h3>
                      <p className="text-gray-400 mb-6">You haven't placed any orders yet.</p>
                      <Link to="/menu" className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors">
                        Explore Menu
                      </Link>
                    </div>
                  )}
                </div>
            
                {/* Order Pagination - only show if there are many orders */}
                {orderHistory.length > 5 && (
                  <div className="flex justify-center mt-6">
                    <nav className="flex items-center space-x-2">
                      <button className="px-3 py-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white">
                        <span className="sr-only">Previous</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="px-3 py-1 rounded-md bg-yellow-500 text-white">1</button>
                      <button className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">2</button>
                      <button className="px-3 py-1 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700">3</button>
                      <button className="px-3 py-2 rounded-md bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white">
                        <span className="sr-only">Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                )}
            
                {/* Order Filters - optional enhancement */}
                {orderHistory.length > 0 && (
                  <div className="p-4 bg-gray-800 rounded-lg">
                    <h4 className="text-white font-medium mb-4">Filter Orders</h4>
                    <div className="flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
                        All Orders
                      </button>
                      <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600">
                        Recent (30 days)
                      </button>
                      <button className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md hover:bg-gray-600">
                        Past Orders
                      </button>
                      <div className="flex-grow"></div>
                      <select className="bg-gray-700 text-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500">
                        <option value="all">All Statuses</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="canceled">Canceled</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}
            
                        {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Notification Preferences */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex space-x-4 items-center mb-4 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Notification Preferences</h3>
                        <p className="text-gray-400">Manage how we communicate with you</p>
                      </div>
                    </div>
                  </div>
            
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-400">Receive updates about your orders and promotional offers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                      <div>
                        <h4 className="text-white font-medium">SMS Notifications</h4>
                        <p className="text-sm text-gray-400">Receive text messages about your order status</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-yellow-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
            
                {/* Password Change */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex space-x-4 items-center mb-4 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Password & Security</h3>
                        <p className="text-gray-400">Update your password and secure your account</p>
                      </div>
                    </div>
                  </div>
            
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="current-password" className="block text-sm font-medium text-gray-300">
                        Current Password
                      </label>
                      <input
                        id="current-password"
                        name="current-password"
                        type="password"
                        autoComplete="current-password"
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
            
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="new-password" className="block text-sm font-medium text-gray-300">
                          New Password
                        </label>
                        <input
                          id="new-password"
                          name="new-password"
                          type="password"
                          autoComplete="new-password"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
            
                      <div className="space-y-2">
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                          Confirm New Password
                        </label>
                        <input
                          id="confirm-password"
                          name="confirm-password"
                          type="password"
                          autoComplete="new-password"
                          className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    </div>
            
                    <div className="pt-2">
                      <button
                        type="button"
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
            
                {/* Payment Methods (placeholder for future implementation) */}
                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex space-x-4 items-center mb-4 md:mb-0">
                      <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Payment Methods</h3>
                        <p className="text-gray-400">Manage your payment options</p>
                      </div>
                    </div>
                    <button 
                      className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Add Payment Method
                    </button>
                  </div>
            
                  <div className="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <h3 className="text-xl font-medium text-white mb-2">No Payment Methods Added</h3>
                    <p className="text-gray-400 mb-6">Add a payment method to speed up checkout.</p>
                    <button className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors">
                      Add Credit Card
                    </button>
                  </div>
                </div>
            
                {/* Danger Zone */}
                <div className="p-4 bg-gray-800 rounded-lg border border-red-800">
                  <h3 className="text-lg font-medium text-white mb-4">Danger Zone</h3>
                  
                  <div className="p-4 bg-red-900/30 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Delete Account</h4>
                    <p className="text-gray-300 text-sm mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button 
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                      onClick={() => {
                        // Show confirmation modal before proceeding
                        const confirmed = window.confirm(
                          "Are you sure you want to delete your account? This action cannot be undone."
                        );
                        if (confirmed) {
                          console.log("Account deletion requested");
                          // Implement account deletion logic here
                        }
                      }}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}