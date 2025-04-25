import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'Home',
            slug: '/home',
            active: true
        },
        {
            name: 'Menu',
            slug: '/menu',
            active: true
        },
        {
            name: 'Services',
            slug: '/services',
            active: true
        },
        {
            name: 'Location',
            slug: '/location',
            active: true
        },
        {
            name: 'Offers',
            slug: '/offers',
            active: true
        },
    ]
    
    return (
        <header className='sticky top-0 z-50 shadow-lg backdrop-blur-md'>
            <div className='bg-gray-900/95 text-white py-4 px-6 sm:px-10 flex flex-wrap justify-between items-center'>
                <Link to='/' className="flex items-center">
                    {/* Logo replaced with text-based styling */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center text-white font-bold text-xl">R</div>
                    <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Ramen Paradise</span>
                </Link>

                {/* Mobile menu button */}
                <button 
                    className="md:hidden rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                    </svg>
                </button>

                {/* Desktop Navigation */}
                <nav className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto mt-4 md:mt-0`}>
                    <ul className='flex flex-col md:flex-row md:items-center md:space-x-1 lg:space-x-2'>
                        {navItems.map(item => 
                            item.active ? (
                                <li key={item.name}>
                                    <button 
                                        onClick={()=> navigate(item.slug)}
                                        className='w-full text-left md:text-center
                                        inline-block 
                                        px-4 py-2 
                                        duration-300 
                                        hover:bg-gray-800
                                        hover:text-yellow-400
                                        rounded-lg
                                        my-1 md:my-0'>
                                            {item.name}
                                    </button>
                                </li>
                            ): null
                        )}
                        <li className="my-1 md:my-0 md:ml-4">
                            <button 
                                className="w-full md:w-auto bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold py-2 px-6 rounded-lg transform transition duration-300 hover:-translate-y-1"
                                onClick={() => navigate('/order')}
                            >
                                Order Now
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            
            {/* Decorative element - noodle-inspired line */}
            <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400"></div>
        </header>
    );
}