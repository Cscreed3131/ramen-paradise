import React, { useState } from 'react';
import { Card, CardContent } from '../../../../components/index';
import Orders from './Orders';
import Products from './Products';
import Customers from './Customers';
import Restaurants from './Restaurants';

function Dashboard() {
  const [activeCard, setActiveCard] = useState(null);

  const cardItems = [
    {
      title: 'Products',
      content: <Products />,
      slug: 'products',
    },
    {
      title: 'Orders',
      content: <Orders />,
      slug: 'orders',
    },
    {
      title: 'Customers',
      content: <Customers />,
      slug: 'customers',
    },
    {
      title: 'Restaurants',
      content: <Restaurants />,
      slug: 'restaurants',
    },
  ];

  return (
    <>
      <div className="p-4 m-4 my-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p>Welcome to the admin dashboard!</p>
      </div>

      <div className="p-4 mx-4 my-1 bg-gray-900 rounded-lg shadow-md grid grid-cols-4 gap-4 grid-rows-1">
        {cardItems.map((item) => (
          <Card
            className={`flex justify-center items-center bg-gray-400 rounded-lg shadow-md 
              transition duration-300 ease-in-out ${
                activeCard === item.slug
                  ? ' scale-105 hover:scale-105 bg-green-500'
                  : 'hover:bg-green-600 hover:scale-105 transition duration-300'
              }`}
            key={item.slug}
            onClick={() => setActiveCard(item.slug)}
          >
            <CardContent>
              <h2 className="text-2xl">{item.title}</h2>
            </CardContent>
          </Card>
          ))
        }
      </div>

      <div className="p-4 mx-4 my-4 bg-gray-900 rounded-lg shadow-md flex flex-grow justify-center items-center">
        {activeCard ? (
            cardItems.find((item) => item.slug === activeCard)?.content
          ) : (
          <p className="text-gray-400">Click on a card to view its content.</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
