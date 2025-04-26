import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    // Sample customer reviews
    const reviews = [
        {
            id: 1,
            name: "Emily Chen",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            rating: 5,
            comment: "The tonkotsu ramen here is absolutely incredible! Rich, flavorful broth that's been simmered for hours. Will definitely be back!",
            date: "2 weeks ago"
        },
        {
            id: 2,
            name: "James Wilson",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            rating: 5,
            comment: "Finally found authentic Japanese ramen in town! The noodles have the perfect texture and the spicy miso broth is to die for.",
            date: "1 month ago"
        },
        {
            id: 3,
            name: "Sophia Martinez",
            avatar: "https://randomuser.me/api/portraits/women/67.jpg",
            rating: 4,
            comment: "Great atmosphere and even better food. The vegetarian ramen options are creative and delicious - not an afterthought like at most places.",
            date: "3 weeks ago"
        }
    ];

    // Featured menu items
    const featuredItems = [
        {
            id: 1,
            name: "Tonkotsu Ramen",
            image: "https://i.pinimg.com/originals/5e/71/f5/5e71f5ea8e767fbf4352fa2c82c7345f.jpg",
            price: 14.99,
            description: "Rich pork bone broth simmered for 12 hours with chashu pork, soft-boiled egg, green onions, and nori.",
            tag: "Bestseller"
        },
        {
            id: 2,
            name: "Spicy Miso Ramen",
            image: "https://i.pinimg.com/originals/12/5a/97/125a97872201fa79d1ffe654f5c987f9.jpg",
            price: 15.99,
            description: "Spicy miso-based broth with ground pork, corn, butter, bean sprouts, and a blend of secret spices.",
            tag: "Spicy"
        },
        {
            id: 3,
            name: "Vegetable Shoyu",
            image: "https://i.pinimg.com/originals/1e/d2/8d/1ed28d6099f1f55589a7e912fd779287.jpg",
            price: 13.99,
            description: "Soy sauce-based vegetarian broth with seasonal vegetables, tofu, corn, and bamboo shoots.",
            tag: "Vegetarian"
        }
    ];

    return (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen relative overflow-hidden">
            {/* Ramen-inspired decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-red-500 blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-yellow-500 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-orange-400 blur-3xl"></div>
            </div>
            
            {/* Hero Section */}
            <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8 pt-24 md:pt-32">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 md:gap-10 p-6 sm:p-8 md:p-10 lg:p-12 max-w-6xl mx-auto backdrop-blur-sm bg-gray-900/40 rounded-2xl shadow-2xl border border-gray-700">
                    {/* Text Section */}
                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <div className="inline-block mb-3 px-3 py-1 bg-red-600/20 border border-red-500/30 text-red-400 rounded-full text-sm font-medium">
                            Authentic Japanese Cuisine
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl text-white font-extrabold leading-tight">
                            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Ramen Paradise</span>
                        </h1>
                        <p className="text-gray-300 mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed">
                            Your one-stop destination for authentic, steaming bowls of ramen perfection. Savor the rich broths, handmade noodles, and carefully crafted toppings!
                        </p>
                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                            <button 
                                onClick={() => navigate('/menu')}
                                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-red-600 transition shadow-lg transform hover:-translate-y-1 w-full sm:w-auto"
                            >
                                Explore Menu
                            </button>
                            <button 
                                onClick={() => navigate('/order')}
                                className="px-6 sm:px-8 py-3 bg-transparent border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-400 hover:text-white transition w-full sm:w-auto"
                            >
                                Order Now
                            </button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="w-full md:w-1/2 mt-8 md:mt-0">
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_0_25px_rgba(255,165,0,0.2)] border-2 border-yellow-600/20">
                            <img
                                src="https://i.pinimg.com/736x/1e/d2/8d/1ed28d6099f1f55589a7e912fd779287.jpg"
                                alt="Delicious Ramen Bowl"
                                className="rounded-lg w-full h-auto object-cover max-h-[350px] sm:max-h-[400px] md:max-h-[500px] transform hover:scale-105 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-bold shadow-lg">Featured Dish</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Menu Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Popular Dishes</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mt-4"></div>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Explore our most loved ramen bowls, meticulously crafted with authentic flavors and fresh ingredients.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredItems.map((item) => (
                        <div key={item.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                            <div className="relative h-56 overflow-hidden">
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute top-3 right-3">
                                    <span className="px-2 py-1 bg-yellow-500/90 text-white text-xs font-bold rounded-full">
                                        {item.tag}
                                    </span>
                                </div>
                                <div className="absolute bottom-3 right-3">
                                    <span className="px-3 py-1 bg-gray-900/80 text-white text-sm font-bold rounded-full">
                                        ${item.price}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                                <button 
                                    onClick={() => navigate(`/menu/${item.id}`)}
                                    className="w-full bg-gradient-to-r from-yellow-500/20 to-red-500/20 hover:from-yellow-500/30 hover:to-red-500/30 text-white border border-yellow-500/30 rounded-lg py-2 transition duration-300"
                                >
                                    Order Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-10">
                    <button 
                        onClick={() => navigate('/menu')}
                        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700 inline-flex items-center"
                    >
                        View Full Menu
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* About Our Ramen Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 relative">
                <div className="absolute -top-20 right-0 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="w-full md:w-1/2 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4">
                                <div className="rounded-2xl overflow-hidden h-48 shadow-lg border border-gray-700">
                                    <img 
                                        src="https://i.pinimg.com/originals/b6/82/17/b68217a369d396742c94c69ca6b21ea9.jpg" 
                                        alt="Making noodles" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden h-64 shadow-lg border border-gray-700">
                                    <img 
                                        src="https://i.pinimg.com/originals/3d/74/cd/3d74cdf60dd7a7838a4fb1162e099bb2.jpg" 
                                        alt="Restaurant interior" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4 mt-6">
                                <div className="rounded-2xl overflow-hidden h-64 shadow-lg border border-gray-700">
                                    <img 
                                        src="https://i.pinimg.com/originals/7c/9c/01/7c9c01b5b0b38789e501ca792e098e6d.jpg" 
                                        alt="Chef preparing ramen" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden h-48 shadow-lg border border-gray-700">
                                    <img 
                                        src="https://i.pinimg.com/originals/71/7d/0f/717d0f94d5193d92373d539d92bc3d3d.jpg" 
                                        alt="Ingredients" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 text-center md:text-left">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
                            The Art of <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Perfect Ramen</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto md:mx-0 mb-6"></div>
                        
                        <div className="space-y-6 text-gray-300">
                            <p>
                                At Ramen Paradise, we believe that creating the perfect bowl of ramen is both an art and a science. Our master chefs have trained for years in Japan to perfect the techniques needed to create authentic, soul-warming ramen.
                            </p>
                            <p>
                                Our broths are simmered for 12-18 hours to extract maximum flavor and richness. We make our noodles fresh daily using a traditional recipe, and our toppings are prepared with meticulous attention to detail.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 text-center mt-8">
                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                                    <div className="text-yellow-400 text-2xl font-bold">12+</div>
                                    <div className="text-gray-400 text-sm">Hours of Broth Simmering</div>
                                </div>
                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                                    <div className="text-yellow-400 text-2xl font-bold">15+</div>
                                    <div className="text-gray-400 text-sm">Ramen Varieties</div>
                                </div>
                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                                    <div className="text-yellow-400 text-2xl font-bold">100%</div>
                                    <div className="text-gray-400 text-sm">Authentic Recipes</div>
                                </div>
                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                                    <div className="text-yellow-400 text-2xl font-bold">Daily</div>
                                    <div className="text-gray-400 text-sm">Fresh Noodles</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Special Offers Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                <div className="bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-2xl overflow-hidden shadow-xl border border-yellow-500/30">
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center">
                            <div>
                                <div className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium mb-4">
                                    Limited Time Offer
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                                    20% OFF Your First Online Order
                                </h2>
                                <p className="text-gray-300 mb-6">
                                    New customers get 20% off their first online order. Use promo code <span className="text-yellow-400 font-bold">NEWRAMEN20</span> at checkout.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button 
                                        onClick={() => navigate('/order')}
                                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold rounded-lg shadow-lg transform transition hover:-translate-y-1"
                                    >
                                        Order Now
                                    </button>
                                    <button 
                                        onClick={() => navigate('/offers')}
                                        className="px-6 py-3 bg-transparent border border-gray-600 text-gray-300 font-medium rounded-lg hover:border-gray-400 hover:text-white transition"
                                    >
                                        View All Offers
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 relative min-h-[300px]">
                            <img 
                                src="https://i.pinimg.com/originals/e9/31/6a/e9316a3418f11b55b5d881a88c37e1f6.jpg" 
                                alt="Ramen Special Offer" 
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 md:from-black/40 to-transparent"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Testimonials Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        What Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Customers Say</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mt-4"></div>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Don't just take our word for it. See what our customers have to say about their Ramen Paradise experience.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review) => (
                        <div key={review.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 shadow-lg">
                            {/* Rating Stars */}
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg 
                                        key={i} 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                                        viewBox="0 0 20 20" 
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            
                            <p className="text-gray-300 italic mb-6">"{review.comment}"</p>
                            
                            <div className="flex items-center">
                                <img 
                                    src={review.avatar} 
                                    alt={review.name} 
                                    className="h-10 w-10 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h4 className="text-white font-medium">{review.name}</h4>
                                    <p className="text-gray-500 text-sm">{review.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="text-center mt-10">
                    <button 
                        onClick={() => window.open('https://www.google.com/maps', '_blank')}
                        className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Leave a Review
                    </button>
                </div>
            </div>

            {/* Location & Hours Section */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-white mb-4">Visit Us</h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="text-white font-medium">Address</h3>
                                        <p className="text-gray-400">123 Noodle Street, Ramen District</p>
                                        <p className="text-gray-400">Tokyo, Japan 123-4567</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div>
                                        <h3 className="text-white font-medium">Hours</h3>
                                        <p className="text-gray-400">Monday - Friday: 11:00 AM - 10:00 PM</p>
                                        <p className="text-gray-400">Saturday - Sunday: 12:00 PM - 11:00 PM</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div>
                                        <h3 className="text-white font-medium">Contact</h3>
                                        <p className="text-gray-400">Phone: (123) 456-7890</p>
                                        <p className="text-gray-400">Email: info@ramen-paradise.com</p>
                                    </div>
                                </div>
                            </div>
                            
                            <button 
                                onClick={() => navigate('/location')}
                                className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-red-500/20 hover:from-yellow-500/30 hover:to-red-500/30 text-white border border-yellow-500/30 rounded-lg transition duration-300"
                            >
                                Get Directions
                            </button>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl overflow-hidden shadow-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-white mb-4">Subscribe to Our Newsletter</h2>
                            <p className="text-gray-400 mb-6">
                                Stay updated with new menu items, special offers, and exclusive events. Sign up for our newsletter!
                            </p>
                            
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="Your name"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                        placeholder="Your email address"
                                    />
                                </div>
                                
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        id="offers"
                                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-500 border-gray-600 rounded"
                                    />
                                    <label htmlFor="offers" className="ml-2 block text-sm text-gray-400">
                                        I want to receive special offers and promotions
                                    </label>
                                </div>
                                
                                <button 
                                    type="submit"
                                    className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-medium rounded-lg transition duration-300"
                                >
                                    Subscribe
                                </button>
                            </form>
                            
                            <p className="text-gray-500 text-xs mt-4">
                                By subscribing, you agree to our Privacy Policy and Terms of Service.
                                We'll never share your information with third parties.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;