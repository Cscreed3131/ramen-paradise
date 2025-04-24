import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {
  const cardItems = [
    { title: 'Products', slug: 'products' },
    { title: 'Orders', slug: 'orders' },
    { title: 'Customers', slug: 'customers' },
    { title: 'Restaurants', slug: 'restaurants' },
  ];

  return (
    <div className='flex flex-col overflow-y-auto max-h-screen'>
      <div className="p-4 m-4 my-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p>Welcome to the admin dashboard!</p>
      </div>

      {/* Navigation Cards */}
      <div className="p-4 mx-4 my-1 bg-gray-900 rounded-lg shadow-md grid grid-cols-4 gap-4 grid-rows-1">
        {cardItems.map((item) => (
          <Link
            to={item.slug}
            key={item.slug}
            className="flex justify-center items-center bg-gray-400 rounded-lg shadow-md 
              hover:bg-green-600 hover:scale-105 transition duration-300"
          >
            <div className="p-4">
              <h2 className="text-2xl">{item.title}</h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Dynamic Content */}
      <div className="p-4 mx-4 my-4 bg-gray-900 rounded-lg shadow-md flex flex-grow justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;