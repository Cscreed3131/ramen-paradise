import React, { useState } from 'react';

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample profile data - in a real app, this would come from your state management or API
  const [profileData, setProfileData] = useState({
    name: "Creed Bratton",
    email: "admin@ramenparadise.com",
    role: "Administrator",
    phone: "+1 (555) 123-4567",
    location: "Tokyo, Japan",
    bio: "Passionate about authentic ramen and Japanese cuisine. Managing Ramen Paradise restaurants since 2021.",
    joinDate: "April 2021",
    preferences: {
      notifications: true,
      marketingEmails: false,
      twoFactorAuth: true
    }
  });

  const [profileImage, setProfileImage] = useState(
    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handlePreferenceToggle = (preference) => {
    setProfileData({
      ...profileData,
      preferences: {
        ...profileData.preferences,
        [preference]: !profileData.preferences[preference]
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Here you would typically send the updated profile to your backend
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
    
    // Show success notification
    // This is a placeholder - you would use your app's notification system
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    // Reset any changes and exit edit mode
    setIsEditing(false);
  };

  return (
    <div className='flex flex-col space-y-6'>
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Admin <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Profile</span>
              </h2>
              <p className="text-gray-400">
                View and manage your personal information
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mt-4"></div>
            </div>
            
            <div className="mt-4 md:mt-0">
              {!isEditing ? (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 transform hover:-translate-y-1 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              ) : (
                <div className="flex space-x-3">
                  <button 
                    onClick={handleSave}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition duration-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save
                  </button>
                  <button 
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card - Left Column */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="p-6 flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700">
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-yellow-500 hover:bg-yellow-600 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer shadow-lg transition-colors">
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              )}
            </div>
            
            <h3 className="mt-4 text-xl font-bold text-white">{profileData.name}</h3>
            <span className="px-3 py-1 mt-2 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-full text-yellow-400 text-sm font-medium">
              {profileData.role}
            </span>
            
            <div className="mt-6 w-full space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-yellow-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {isEditing ? (
                  <input 
                    type="email" 
                    name="email" 
                    value={profileData.email} 
                    onChange={handleInputChange} 
                    className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                ) : (
                  <p className="text-gray-300">{profileData.email}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-yellow-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                {isEditing ? (
                  <input 
                    type="tel" 
                    name="phone" 
                    value={profileData.phone} 
                    onChange={handleInputChange} 
                    className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                ) : (
                  <p className="text-gray-300">{profileData.phone}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-yellow-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {isEditing ? (
                  <input 
                    type="text" 
                    name="location" 
                    value={profileData.location} 
                    onChange={handleInputChange} 
                    className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                ) : (
                  <p className="text-gray-300">{profileData.location}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-yellow-400 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-300">Joined: {profileData.joinDate}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Info - Middle Column */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Personal Information</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-2 font-medium">Full Name</label>
                  {isEditing ? (
                    <input 
                      type="text" 
                      name="name" 
                      value={profileData.name} 
                      onChange={handleInputChange} 
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-3 rounded-lg">{profileData.name}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2 font-medium">Bio</label>
                  {isEditing ? (
                    <textarea 
                      name="bio" 
                      value={profileData.bio} 
                      onChange={handleInputChange} 
                      rows="4" 
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    ></textarea>
                  ) : (
                    <p className="text-white bg-gray-700/50 px-4 py-3 rounded-lg">{profileData.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Preferences</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Email Notifications</h4>
                    <p className="text-gray-400 text-sm">Receive notifications about orders and updates</p>
                  </div>
                  {isEditing ? (
                    <div 
                      onClick={() => handlePreferenceToggle('notifications')} 
                      className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                        profileData.preferences.notifications ? 'bg-yellow-500' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                          profileData.preferences.notifications ? 'translate-x-6' : ''
                        }`}
                      />
                    </div>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      profileData.preferences.notifications 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {profileData.preferences.notifications ? 'Enabled' : 'Disabled'}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Marketing Emails</h4>
                    <p className="text-gray-400 text-sm">Receive promotional emails and offers</p>
                  </div>
                  {isEditing ? (
                    <div 
                      onClick={() => handlePreferenceToggle('marketingEmails')} 
                      className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                        profileData.preferences.marketingEmails ? 'bg-yellow-500' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                          profileData.preferences.marketingEmails ? 'translate-x-6' : ''
                        }`}
                      />
                    </div>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      profileData.preferences.marketingEmails 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {profileData.preferences.marketingEmails ? 'Enabled' : 'Disabled'}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-gray-400 text-sm">Add an extra layer of security to your account</p>
                  </div>
                  {isEditing ? (
                    <div 
                      onClick={() => handlePreferenceToggle('twoFactorAuth')} 
                      className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                        profileData.preferences.twoFactorAuth ? 'bg-yellow-500' : 'bg-gray-600'
                      }`}
                    >
                      <span 
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                          profileData.preferences.twoFactorAuth ? 'translate-x-6' : ''
                        }`}
                      />
                    </div>
                  ) : (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      profileData.preferences.twoFactorAuth 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {profileData.preferences.twoFactorAuth ? 'Enabled' : 'Disabled'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;