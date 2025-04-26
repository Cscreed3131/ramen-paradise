import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  const cardItems = [
    { 
      title: 'Products', 
      slug: 'products',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
      count: 48,
      growth: '+12%',
      growthType: 'positive'
    },
    { 
      title: 'Orders', 
      slug: 'orders',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      count: 24,
      growth: '+8%',
      growthType: 'positive'
    },
    { 
      title: 'Customers', 
      slug: 'customers',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      count: 132,
      growth: '+22%',
      growthType: 'positive'
    },
    { 
      title: 'Restaurants', 
      slug: 'restaurants',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      count: 3,
      growth: '0%',
      growthType: 'neutral'
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'success',
      title: 'Order #8721 was completed',
      time: '2 minutes ago',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      id: 2,
      type: 'warning',
      title: 'New order #8722 received',
      time: '15 minutes ago',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      id: 3,
      type: 'info',
      title: 'New customer Alex Johnson registered',
      time: '42 minutes ago',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      id: 4,
      type: 'danger',
      title: 'Inventory alert: Tonkotsu broth low in stock',
      time: '1 hour ago',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  ];

  // Function to return the appropriate background color for activity type
  const getActivityStyles = (type) => {
    switch(type) {
      case 'success':
        return 'bg-green-500/20 text-green-400';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'info':
        return 'bg-blue-500/20 text-blue-400';
      case 'danger':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className='flex flex-col overflow-y-auto max-h-screen pb-6'>
      {/* Dashboard Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Ramen Paradise</span> Admin
              </h2>
              <p className="text-gray-400">
                Manage your products, orders, customers, and restaurants from this dashboard.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300 transform hover:-translate-y-1 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Generate Report
              </button>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="border-t border-gray-700 bg-gray-800/30 px-6 py-4 overflow-x-auto">
          <div className="flex items-center space-x-6 min-w-max">
            <div className="text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>Revenue this month: <span className="text-white font-medium">$12,580</span></span>
            </div>
            <div className="h-4 border-l border-gray-700"></div>
            <div className="text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Pending orders: <span className="text-white font-medium">8</span></span>
            </div>
            <div className="h-4 border-l border-gray-700"></div>
            <div className="text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>New customers today: <span className="text-white font-medium">12</span></span>
            </div>
            <div className="h-4 border-l border-gray-700"></div>
            <div className="text-gray-400 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Sales growth: <span className="text-green-400 font-medium">+18%</span></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Navigation Cards - takes 2/3 of the width on large screens */}
        <div className="lg:col-span-2 space-y-6">
          {/* Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cardItems.map((item) => (
              <Link
                to={item.slug}
                key={item.slug}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="text-gray-400 group-hover:text-yellow-400 transition-colors duration-300">
                      {item.icon}
                    </div>
                    <div className="space-y-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-500/20 to-red-500/20 flex items-center justify-center">
                        <span className="text-white font-semibold">{item.count}</span>
                      </div>
                      {item.growthType === 'positive' && (
                        <div className="text-xs text-green-400 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                          {item.growth}
                        </div>
                      )}
                      {item.growthType === 'negative' && (
                        <div className="text-xs text-red-400 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                          {item.growth}
                        </div>
                      )}
                      {item.growthType === 'neutral' && (
                        <div className="text-xs text-gray-400 flex items-center justify-center">
                          {item.growth}
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mt-4 group-hover:text-yellow-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 mt-1 text-sm">
                    Manage {item.title.toLowerCase()}
                  </p>
                  
                  <div className="flex justify-end mt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 group-hover:bg-gradient-to-r from-yellow-500 to-red-500 group-hover:text-white transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="h-1 w-full bg-gradient-to-r from-yellow-500/0 via-yellow-500 to-red-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              </Link>
            ))}
          </div>
          
          {/* Dynamic Content */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <Outlet />
          </div>
        </div>
        
        {/* Right Sidebar - takes 1/3 of the width on large screens */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
              <button className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
                View All
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center p-2 rounded-lg hover:bg-gray-700/30 transition-colors">
                    <div className={`h-9 w-9 rounded-full ${getActivityStyles(activity.type)} flex items-center justify-center mr-3`}>
                      {activity.icon}
                    </div>
                    <div>
                      <p className="text-white text-sm">{activity.title}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Top Products */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Top Menu Items</h3>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center p-2 rounded-lg">
                  <div className="h-12 w-12 rounded-lg mr-3 overflow-hidden">
                    <img src="https://source.unsplash.com/V7SKRhXskv8/100x100" alt="Tonkotsu Ramen" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-white text-sm font-medium">Tonkotsu Ramen</p>
                      <p className="text-yellow-400 text-sm font-medium">$12.99</p>
                    </div>
                    <div className="mt-1 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-red-500 w-4/5"></div>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">356 orders this month</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-lg">
                  <div className="h-12 w-12 rounded-lg mr-3 overflow-hidden">
                    <img src="https://source.unsplash.com/OYUzC-h1glg/100x100" alt="Spicy Miso Ramen" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-white text-sm font-medium">Spicy Miso Ramen</p>
                      <p className="text-yellow-400 text-sm font-medium">$13.99</p>
                    </div>
                    <div className="mt-1 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-red-500 w-3/5"></div>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">298 orders this month</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-lg">
                  <div className="h-12 w-12 rounded-lg mr-3 overflow-hidden">
                    <img src="https://source.unsplash.com/R4yqMoF3PXU/100x100" alt="Veggie Ramen" className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="text-white text-sm font-medium">Veggie Ramen</p>
                      <p className="text-yellow-400 text-sm font-medium">$11.99</p>
                    </div>
                    <div className="mt-1 bg-gray-700 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-red-500 w-2/5"></div>
                    </div>
                    <p className="text-gray-400 text-xs mt-1">187 orders this month</p>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors">
                    View All Products
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

export default Dashboard;