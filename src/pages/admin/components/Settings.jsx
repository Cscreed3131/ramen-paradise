import React, { useState } from 'react';

function Settings() {
  // State for various settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Ramen Paradise',
    siteDescription: 'Authentic Japanese ramen for every taste',
    timezone: 'Asia/Tokyo',
    currency: 'USD',
    language: 'en-US'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    inventoryAlerts: true,
    customerSignups: false,
    marketingUpdates: true,
    systemAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    requireStrongPasswords: true,
    loginNotifications: true,
    ipRestriction: false,
    sessionTimeout: '30',
    adminApproval: false
  });

  // Handle input changes for general settings
  const handleGeneralSettingChange = (e) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value
    });
  };

  // Toggle notification settings
  const toggleNotificationSetting = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  // Toggle security settings
  const toggleSecuritySetting = (setting) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: !securitySettings[setting]
    });
  };

  // Handle session timeout change
  const handleSessionTimeoutChange = (e) => {
    setSecuritySettings({
      ...securitySettings,
      sessionTimeout: e.target.value
    });
  };

  // Save settings
  const saveSettings = () => {
    // Here you would typically save settings to your backend
    console.log("General Settings:", generalSettings);
    console.log("Notification Settings:", notificationSettings);
    console.log("Security Settings:", securitySettings);
    
    // Show success message (this would be replaced with your app's notification system)
    alert("Settings saved successfully!");
  };

  return (
    <div className='flex flex-col space-y-6'>
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                System <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Settings</span>
              </h2>
              <p className="text-gray-400">
                Configure your application settings and preferences
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mt-4"></div>
            </div>
            
            <div className="mt-4 md:mt-0">
              <button 
                onClick={saveSettings}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 transform hover:-translate-y-1 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              General Settings
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2 font-medium">Site Name</label>
                <input 
                  type="text" 
                  name="siteName" 
                  value={generalSettings.siteName} 
                  onChange={handleGeneralSettingChange} 
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2 font-medium">Site Description</label>
                <textarea 
                  name="siteDescription" 
                  value={generalSettings.siteDescription} 
                  onChange={handleGeneralSettingChange} 
                  rows="2" 
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2 font-medium">Timezone</label>
                <select 
                  name="timezone" 
                  value={generalSettings.timezone} 
                  onChange={handleGeneralSettingChange} 
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                  <option value="America/New_York">New York (GMT-5)</option>
                  <option value="Europe/London">London (GMT+0)</option>
                  <option value="Australia/Sydney">Sydney (GMT+11)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2 font-medium">Currency</label>
                <select 
                  name="currency" 
                  value={generalSettings.currency} 
                  onChange={handleGeneralSettingChange} 
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="USD">US Dollar ($)</option>
                  <option value="JPY">Japanese Yen (¥)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2 font-medium">Language</label>
                <select 
                  name="language" 
                  value={generalSettings.language} 
                  onChange={handleGeneralSettingChange} 
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="en-US">English (US)</option>
                  <option value="ja-JP">Japanese</option>
                  <option value="fr-FR">French</option>
                  <option value="es-ES">Spanish</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Notification Settings
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Order Notifications</h4>
                  <p className="text-gray-400 text-sm">Get notified when new orders are placed</p>
                </div>
                <div 
                  onClick={() => toggleNotificationSetting('orderNotifications')} 
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    notificationSettings.orderNotifications ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                >
                  <span 
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      notificationSettings.orderNotifications ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Inventory Alerts</h4>
                  <p className="text-gray-400 text-sm">Get notified when items are low in stock</p>
                </div>
                <div 
                  onClick={() => toggleNotificationSetting('inventoryAlerts')} 
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    notificationSettings.inventoryAlerts ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                >
                  <span 
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      notificationSettings.inventoryAlerts ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Customer Signups</h4>
                  <p className="text-gray-400 text-sm">Get notified when new customers register</p>
                </div>
                <div 
                  onClick={() => toggleNotificationSetting('customerSignups')} 
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    notificationSettings.customerSignups ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                >
                  <span 
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      notificationSettings.customerSignups ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Marketing Updates</h4>
                  <p className="text-gray-400 text-sm">Receive marketing tips and promotional ideas</p>
                </div>
                <div 
                  onClick={() => toggleNotificationSetting('marketingUpdates')} 
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    notificationSettings.marketingUpdates ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                >
                  <span 
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      notificationSettings.marketingUpdates ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">System Alerts</h4>
                  <p className="text-gray-400 text-sm">Get notified about system updates and maintenance</p>
                </div>
                <div 
                  onClick={() => toggleNotificationSetting('systemAlerts')} 
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    notificationSettings.systemAlerts ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                >
                  <span 
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      notificationSettings.systemAlerts ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Security Settings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Security Settings
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Require Strong Passwords</h4>
                  <p className="text-gray-400 text-sm">Enforce complex passwords for all users</p>
                </div>
                <div 
                  onClick={() => toggleSecuritySetting('requireStrongPasswords')} 
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    securitySettings.requireStrongPasswords ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                >
                  <span 
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      securitySettings.requireStrongPasswords ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Login Notifications</h4>
                  <p className="text-gray-400 text-sm">Get email alerts for new login attempts</p>
                </div>
                <div 
                  onClick={() => toggleSecuritySetting('loginNotifications')} 
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    securitySettings.loginNotifications ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                >
                  <span 
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      securitySettings.loginNotifications ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">IP Restriction</h4>
                  <p className="text-gray-400 text-sm">Limit admin access to specific IP addresses</p>
                </div>
                <div 
                  onClick={() => toggleSecuritySetting('ipRestriction')} 
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    securitySettings.ipRestriction ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                >
                  <span 
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      securitySettings.ipRestriction ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-400 mb-2 font-medium">Session Timeout (minutes)</label>
                <select 
                  value={securitySettings.sessionTimeout} 
                  onChange={handleSessionTimeoutChange} 
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Admin Approval for New Accounts</h4>
                  <p className="text-gray-400 text-sm">Require approval before new accounts are activated</p>
                </div>
                <div 
                  onClick={() => toggleSecuritySetting('adminApproval')} 
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    securitySettings.adminApproval ? 'bg-yellow-500' : 'bg-gray-600'
                  }`}
                >
                  <span 
                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transform transition-transform ${
                      securitySettings.adminApproval ? 'translate-x-6' : ''
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Backup & Export */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Backup & Export
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium mb-2">Database Backup</h4>
                <p className="text-gray-400 text-sm mb-4">Create a backup of your entire database</p>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Generate Backup
                </button>
              </div>
              
              <div className="h-px bg-gray-700"></div>
              
              <div>
                <h4 className="text-white font-medium mb-2">Export Data</h4>
                <p className="text-gray-400 text-sm mb-4">Export your data in various formats</p>
                <div className="grid grid-cols-2 gap-4">
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    CSV
                  </button>
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    JSON
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;