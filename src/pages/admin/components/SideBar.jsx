import React from 'react';

function SideBar({ activeItem , setActiveItem }) {
    const handleItemClick = (item) => {
        if(item === 'Logout')
        {
            // Handle logout logic here
            console.log('Logging out...');
        }
        setActiveItem(item);
    };

    return (
        <div className="h-screen p-4 bg-gray-800 flex flex-col justify-between">
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
                    <li
                        className={`p-2 rounded-r-full hover:bg-gray-700 flex items-center transition-all duration-200 ${
                            activeItem === 'Dashboard' ? 'bg-green-500' : ''
                        }`}
                        onClick={() => handleItemClick('Dashboard')}
                    >
                        <span className="mr-2">📊</span> Dashboard
                    </li>
                    <li
                        className={`p-2 rounded-r-full hover:bg-gray-700 flex items-center transition-all duration-200 ${
                            activeItem === 'Settings' ? 'bg-green-500' : ''
                        }`}
                        onClick={() => handleItemClick('Settings')}
                    >
                        <span className="mr-2">⚙️</span> Settings
                    </li>
                    <li
                        className={`p-2 rounded-r-full hover:bg-gray-700 flex items-center transition-all duration-200 ${
                            activeItem === 'Profile' ? 'bg-green-500' : ''
                        }`}
                        onClick={() => handleItemClick('Profile')}
                    >
                        <span className="mr-2">👤</span> Profile
                    </li>
                </ul>
            </div>
            <div
                className="p-2 rounded-r-full hover:bg-gray-700 flex items-center transition-all duration-200"
                onClick={() => handleItemClick('Logout')}
            >
                <span className="mr-2">🚪</span> Logout
            </div>
        </div>
    );
}

export default SideBar;