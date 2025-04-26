import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const navigate = useNavigate();
    const profileDropdownRef = useRef(null);
    const cartDropdownRef = useRef(null);
    
    // Mock user state - replace with your actual auth implementation
    const [user, setUser] = useState(null);
    // Example user object: { uid: '123', displayName: 'John Doe', email: 'john@example.com', photoURL: 'https://...' }
    
    // Mock cart state - replace with your actual cart implementation
    const [cart, setCart] = useState({
        items: [],
        totalItems: 0,
        totalPrice: 0
    });

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
    
    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
                setIsCartOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [profileDropdownRef, cartDropdownRef]);

    // Handle login
    const handleLogin = () => {
        // Replace with your actual login logic
        navigate('/login');
        setIsProfileOpen(false);
    };

    // Handle logout
    const handleLogout = () => {
        // Replace with your actual logout logic
        setUser(null);
        setIsProfileOpen(false);
        navigate('/home');
    };

    // Handle profile click
    const handleProfileClick = () => {
        navigate('/profile');
        setIsProfileOpen(false);
    };

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };
    
    return (
        <header className='sticky top-0 z-50 shadow-lg backdrop-blur-md'>
            <div className='bg-gray-900/95 text-white py-4 px-6 sm:px-10'>
                <div className="flex flex-col md:flex-row md:items-center">
                    {/* Top Row - Logo and Action Buttons */}
                    <div className="flex justify-between items-center w-full">
                        {/* Logo */}
                        <Link to='/' className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center text-white font-bold text-xl">R</div>
                            <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Ramen Paradise</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:block flex-grow mx-10">
                            <ul className="flex items-center justify-center space-x-1 lg:space-x-2">
                                {navItems.map(item => 
                                    item.active ? (
                                        <li key={item.name}>
                                            <button 
                                                onClick={()=> navigate(item.slug)}
                                                className="text-center inline-block px-4 py-2 duration-300 hover:bg-gray-800 hover:text-yellow-400 rounded-lg"
                                            >
                                                {item.name}
                                            </button>
                                        </li>
                                    ): null
                                )}
                                <li className="ml-4">
                                    <button 
                                        className="bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold py-2 px-6 rounded-lg transform transition duration-300 hover:-translate-y-1"
                                        onClick={() => navigate('/order')}
                                    >
                                        Order Now
                                    </button>
                                </li>
                            </ul>
                        </nav>

                        {/* Action Buttons Group */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            {/* Desktop Cart Button */}
                            <button 
                                onClick={() => navigate('/cart')}
                                className="hidden md:flex items-center space-x-1 py-2 px-3 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-colors focus:outline-none relative"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                <span>Cart</span>
                                {cart.totalItems > 0 && (
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 to-red-500 text-white text-xs font-bold ml-1">
                                        {cart.totalItems}
                                    </span>
                                )}
                            </button>
                            
                            {/* Mobile Cart Dropdown */}
                            <div className="relative md:hidden" ref={cartDropdownRef}>
                                <button 
                                    onClick={() => setIsCartOpen(!isCartOpen)}
                                    className="flex items-center p-2 rounded-full hover:bg-gray-800 transition-colors focus:outline-none relative"
                                    aria-label="Open cart"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    {cart.totalItems > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            {cart.totalItems}
                                        </span>
                                    )}
                                </button>
                                
                                {/* Cart Dropdown */}
                                {isCartOpen && (
                                    <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-lg py-1 z-10 border border-gray-700">
                                        <div className="px-4 py-2 border-b border-gray-700">
                                            <h3 className="text-sm font-medium text-white">Your Cart</h3>
                                        </div>
                                        
                                        {cart.items.length > 0 ? (
                                            <>
                                                <div className="max-h-60 overflow-y-auto">
                                                    {cart.items.map((item, index) => (
                                                        <div key={index} className="px-4 py-2 border-b border-gray-700 flex items-center">
                                                            <div className="h-10 w-10 flex-shrink-0 rounded-md overflow-hidden">
                                                                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                            </div>
                                                            <div className="ml-3 flex-1">
                                                                <p className="text-sm font-medium text-white">{item.name}</p>
                                                                <div className="flex justify-between items-center mt-1">
                                                                    <p className="text-xs text-gray-400">{item.quantity} × {formatCurrency(item.price)}</p>
                                                                    <p className="text-xs font-medium text-yellow-400">{formatCurrency(item.price * item.quantity)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                
                                                <div className="px-4 py-2 border-b border-gray-700">
                                                    <div className="flex justify-between">
                                                        <p className="text-sm text-gray-300">Subtotal</p>
                                                        <p className="text-sm font-medium text-white">{formatCurrency(cart.totalPrice)}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="px-4 py-3">
                                                    <button 
                                                        onClick={() => { navigate('/cart'); setIsCartOpen(false); }}
                                                        className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300"
                                                    >
                                                        View Cart
                                                    </button>
                                                    <button 
                                                        onClick={() => { navigate('/checkout'); setIsCartOpen(false); }}
                                                        className="w-full mt-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-300"
                                                    >
                                                        Checkout
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="px-4 py-6 text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <p className="text-sm text-gray-400">Your cart is empty</p>
                                                <button 
                                                    onClick={() => { navigate('/menu'); setIsCartOpen(false); }}
                                                    className="mt-3 text-xs text-yellow-400 hover:text-yellow-300 font-medium transition duration-300"
                                                >
                                                    Browse our menu →
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            {/* User profile dropdown */}
                            <div className="relative" ref={profileDropdownRef}>
                                <button 
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center focus:outline-none"
                                    aria-label="Open profile menu"
                                >
                                    <div className="h-9 w-9 rounded-full overflow-hidden border-2 border-gray-700 hover:border-yellow-500 transition-colors">
                                        {user && user.photoURL ? (
                                            <img 
                                                src={user.photoURL} 
                                                alt="User Avatar" 
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gray-700 flex items-center justify-center text-gray-400">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </button>
                                
                                {/* Dropdown menu */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1 z-10 border border-gray-700">
                                        {user ? (
                                            <>
                                                <div className="px-4 py-2 border-b border-gray-700">
                                                    <p className="text-sm font-medium text-white">{user.displayName}</p>
                                                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                                </div>
                                                <button 
                                                    onClick={handleProfileClick}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                                >
                                                    Your Profile
                                                </button>
                                                <button 
                                                    onClick={() => navigate('/orders')}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                                >
                                                    Your Orders
                                                </button>
                                                <div className="border-t border-gray-700 my-1"></div>
                                                <button 
                                                    onClick={handleLogout}
                                                    className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300"
                                                >
                                                    Sign out
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button 
                                                    onClick={handleLogin}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                                >
                                                    Sign in
                                                </button>
                                                <button 
                                                    onClick={() => { navigate('/register'); setIsProfileOpen(false); }}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                                >
                                                    Create account
                                                </button>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            {/* Mobile menu button */}
                            <button 
                                className="md:hidden rounded-md p-2 text-gray-400 hover:bg-gray-800 hover:text-white"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                            >
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden w-full mt-4`}>
                        <ul className='flex flex-col'>
                            {navItems.map(item => 
                                item.active ? (
                                    <li key={item.name}>
                                        <button 
                                            onClick={()=> {
                                                navigate(item.slug);
                                                setIsMenuOpen(false);
                                            }}
                                            className='w-full text-left inline-block px-4 py-2 duration-300 hover:bg-gray-800 hover:text-yellow-400 rounded-lg my-1'
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ): null
                            )}
                            <li className="my-1">
                                <button 
                                    className="w-full bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-bold py-2 px-6 rounded-lg transform transition duration-300 hover:-translate-y-1"
                                    onClick={() => {
                                        navigate('/order');
                                        setIsMenuOpen(false);
                                    }}
                                >
                                    Order Now
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            
            {/* Decorative element - noodle-inspired line */}
            <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400"></div>
        </header>
    );
}