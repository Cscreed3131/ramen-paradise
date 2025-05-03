// src/admin/components/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    
    // Helper function to check if a link is active
    const isActive = (path) => {
        return location.pathname.includes(path);
    };
    
    const navigationGroups = [
        {
            title: "Main",
            items: [
                {
                    name: "Dashboard",
                    path: "/admin/dashboard",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                    )
                },
                {
                    name: "Products",
                    path: "/admin/products",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                        </svg>
                    )
                },
                {
                    name: "Orders",
                    path: "/admin/orders",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    )
                },
                {
                    name: "Customers",
                    path: "/admin/customers",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )
                },
                {
                    name: "Restaurants",
                    path: "/admin/restaurants",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    )
                }
            ]
        },
        {
            title: "Account",
            items: [
                {
                    name: "Settings",
                    path: "/admin/settings",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    )
                },
                {
                    name: "Profile",
                    path: "/admin/profile",
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    )
                }
            ]
        }
    ];
    
    const scrollbarHideStyles = {
        WebkitOverflowScrolling: 'touch',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    };
    
    return (
        <div 
            className="h-screen w-72 flex flex-col justify-between border-r border-gray-700 bg-gray-900/95 shadow-lg overflow-y-auto"
            style={scrollbarHideStyles}
        >
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
            
            {/* Admin logo and profile */}
            <div className="flex-1 overflow-y-auto hide-scrollbar">
                <div className="p-6">
                    <Link to="/" className="flex items-center justify-center mb-6">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center text-white font-bold text-xl">
                            R
                        </div>
                        <span className="ml-4 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
                            Admin
                        </span>
                    </Link>
                    
                    <div className="mt-6 flex flex-col items-center">
                        <div className="relative">
                            <img
                                src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                alt="Admin"
                                className="w-24 h-24 rounded-full border-2 border-yellow-500/30 object-cover shadow-md"
                            />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-800"></div>
                        </div>
                        <h2 className="mt-3 text-lg font-bold text-white">Creed</h2>
                        <p className="text-sm text-yellow-400">Administrator</p>
                    </div>
                </div>
                
                <div className="px-4 mt-4">
                    {/* Navigation Groups */}
                    {navigationGroups.map((group, index) => (
                        <div key={group.title} className="mb-6">
                            {index > 0 && (
                                <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4"></div>
                            )}
                            
                            <h3 className="text-xs uppercase text-gray-500 font-semibold px-4 mb-3">{group.title}</h3>
                            
                            <nav className="space-y-2">
                                {group.items.map((item) => (
                                    <Link 
                                        key={item.name}
                                        to={item.path} 
                                        className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                                            isActive(item.path) 
                                                ? 'bg-gradient-to-r from-yellow-500/20 to-red-500/20 text-white border-l-3 border-yellow-500' 
                                                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                                        }`}
                                    >
                                        <span className="mr-4 text-lg">{item.icon}</span>
                                        <span className="font-medium text-base">{item.name}</span>
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Logout button */}
            <div className="p-4 border-t border-gray-800">
                <Link 
                    to="/auth-page" 
                    className="flex items-center px-5 py-3 text-red-400 rounded-lg hover:bg-red-500/10 transition-all duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium text-base">Logout</span>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;