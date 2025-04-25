import React, { useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Menu() {
  const [activeCategory, setActiveCategory] = useState('ramen');

  // Menu categories
  const categories = [
    { id: 'ramen', name: 'Ramen' },
    { id: 'sides', name: 'Side Dishes' },
    { id: 'beverages', name: 'Beverages' },
    { id: 'desserts', name: 'Desserts' }
  ];

  // Menu items by category
  const menuItems = {
    ramen: [
      {
        id: 1,
        name: 'Tonkotsu Ramen',
        description: 'Rich pork bone broth simmered for 24 hours, topped with char siu, soft-boiled egg, green onions, and nori.',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1617196034183-421b4917c92d',
        tags: ['Popular', 'Signature']
      },
      {
        id: 2,
        name: 'Spicy Miso Ramen',
        description: 'Savory miso broth with chili oil, tender pork belly, bean sprouts, corn, and ajitama egg.',
        price: 15.99,
        image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624',
        tags: ['Spicy']
      },
      {
        id: 3,
        name: 'Shoyu Ramen',
        description: 'Light soy sauce-based broth with chashu pork, menma, and seasonal vegetables.',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e',
        tags: []
      },
      {
        id: 4,
        name: 'Vegetable Ramen',
        description: 'Kombu and shiitake mushroom broth with tofu, seasonal vegetables, and plant-based noodles.',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1',
        tags: ['Vegetarian']
      },
    ],
    sides: [
      {
        id: 5,
        name: 'Gyoza',
        description: 'Pan-fried dumplings filled with seasoned pork and vegetables (6 pieces).',
        price: 6.99,
        image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c',
        tags: ['Popular']
      },
      {
        id: 6,
        name: 'Takoyaki',
        description: 'Octopus-filled battered balls topped with takoyaki sauce and bonito flakes.',
        price: 7.99,
        image: 'https://images.unsplash.com/photo-1511689660979-10d2b1aada96',
        tags: []
      },
    ],
    beverages: [
      {
        id: 7,
        name: 'Japanese Beer',
        description: 'Asahi, Sapporo, or Kirin (12 oz bottle).',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1603824255830-9514f964d7f6',
        tags: []
      },
      {
        id: 8,
        name: 'Green Tea',
        description: 'Traditional Japanese green tea, hot or iced.',
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9',
        tags: []
      },
    ],
    desserts: [
      {
        id: 9,
        name: 'Matcha Mochi Ice Cream',
        description: 'Green tea ice cream wrapped in a sweet rice dough.',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1561845730-208ad5910553',
        tags: ['Popular']
      },
      {
        id: 10,
        name: 'Taiyaki',
        description: 'Fish-shaped cake filled with sweet red bean paste.',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1558326218-1e0ead4a2b81',
        tags: []
      },
    ]
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      {/* <Header /> */}
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-red-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-yellow-500 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-orange-400 blur-3xl"></div>
      </div>
      
      {/* Main menu content */}
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Menu Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 rounded-full text-sm font-medium mb-3">
              Explore Our Offerings
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-extrabold">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Menu</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mt-4"></div>
          </div>
          
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center mb-10 gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-500 to-red-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
            {menuItems[activeCategory].map((item) => (
              <div 
                key={item.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 shadow-lg flex flex-col sm:flex-row hover:shadow-xl transition duration-300"
              >
                {/* Item Image */}
                <div className="sm:w-1/3 relative">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover object-center"
                    style={{ height: '100%', minHeight: '140px' }}
                  />
                  {item.tags.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {item.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className={`text-xs font-bold px-2 py-1 rounded-full ${
                            tag === 'Popular' ? 'bg-yellow-500 text-yellow-900' :
                            tag === 'Spicy' ? 'bg-red-600 text-white' :
                            tag === 'Vegetarian' ? 'bg-green-500 text-green-900' :
                            tag === 'Signature' ? 'bg-purple-500 text-white' :
                            'bg-blue-500 text-white'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Item Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{item.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-yellow-400 font-bold">${item.price.toFixed(2)}</span>
                    <button className="bg-gradient-to-r from-yellow-500 to-red-500 text-white text-sm font-bold py-1.5 px-4 rounded-lg hover:from-yellow-600 hover:to-red-600 transition">
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default Menu;