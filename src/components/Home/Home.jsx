import React from 'react';

function Home() {
    return (
        <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen relative overflow-hidden">
            {/* Ramen-inspired decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-red-500 blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-yellow-500 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-orange-400 blur-3xl"></div>
            </div>
            
            {/* Main Content Section */}
            <div className="h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
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
                            <button className="px-6 sm:px-8 py-3 bg-gradient-to-r from-yellow-500 to-red-500 text-white font-bold rounded-lg hover:from-yellow-600 hover:to-red-600 transition shadow-lg transform hover:-translate-y-1 w-full sm:w-auto">
                                Explore Menu
                            </button>
                            <button className="px-6 sm:px-8 py-3 bg-transparent border-2 border-gray-600 text-gray-300 font-semibold rounded-lg hover:border-gray-400 hover:text-white transition w-full sm:w-auto">
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
        </div>
    );
}

export default Home;