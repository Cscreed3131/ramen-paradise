import React from 'react';
import { Link } from 'react-router-dom';

function SideBar() {
    return (
        <div className="h-screen p-4 bg-gray-900 flex flex-col justify-between">
            <div>
                <div className="flex flex-col justify-center items-center mb-4">
                    <img
                        src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                        alt="Admin-Image"
                        className="w-32 h-32 rounded-full border-4 border-gray-700"
                    />
                    <div>
                        <h2 className="text-lg font-bold">Creed</h2>
                        <p className="text-sm text-gray-400 text-center">Admin</p>
                    </div>
                    <hr className="w-full border-t-2 border-gray-700 mt-4" />
                </div>
                <ul className="space-y-2">
                    <li className="p-2 rounded-r-full hover:bg-gray-700 flex items-center transition-all duration-200">
                        <Link to="/admin/dashboard/products" className="flex items-center w-full">
                            <span className="mr-2">📊</span> Dashboard
                        </Link>
                    </li>
                    <li className="p-2 rounded-r-full hover:bg-gray-700 flex items-center transition-all duration-200">
                        <Link to="/admin/settings" className="flex items-center w-full">
                            <span className="mr-2">⚙️</span> Settings
                        </Link>
                    </li>
                    <li className="p-2 rounded-r-full hover:bg-gray-700 flex items-center transition-all duration-200">
                        <Link to="/admin/profile" className="flex items-center w-full">
                            <span className="mr-2">👤</span> Profile
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="p-2 rounded-r-full hover:bg-gray-700 flex items-center transition-all duration-200">
                <Link to="/logout" className="flex items-center w-full">
                    <span className="mr-2">🚪</span> Logout
                </Link>
            </div>
        </div>
    );
}

export default SideBar;