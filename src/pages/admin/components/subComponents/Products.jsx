import React from 'react';
import { useNavigate } from 'react-router-dom';

function Products() {
    const navigate = useNavigate();

    const cards = [
        { 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ), 
            title: 'Product List', 
            slug: 'product-list',
            description: 'View and manage all available products'
        },
        { 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            ), 
            title: 'Add Product', 
            slug: 'add-product',
            description: 'Add new products to your inventory'
        },
        { 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ), 
            title: 'Remove Product', 
            slug: 'remove-product',
            description: 'Remove products from your inventory'
        },
        { 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ), 
            title: 'Edit Product', 
            slug: 'edit-product',
            description: 'Update existing product information'
        },
        { 
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.915a1 1 0 00.95-.69l1.519-4.674z" />
                </svg>
            ), 
            title: 'Best Sellers', 
            slug: 'best-sellers',
            description: 'View your most popular products'
        }
    ];

    return (
        <div className='p-6 space-y-6'>
            {/* Header */}
            <div className="mb-6">
                <h2 className='text-2xl font-bold text-white'>
                    Product <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Management</span>
                </h2>
                <p className='text-gray-400 mt-2'>
                    Add, edit, remove, and view your products from this section.
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mt-4"></div>
            </div>
            
            {/* Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                {cards.map((card, index) => (
                    <div 
                        key={index} 
                        onClick={() => navigate(card.slug)}
                        className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group'
                    >
                        <div className="p-5">
                            <div className="flex items-center mb-4">
                                <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-yellow-500/20 to-red-500/20 flex items-center justify-center text-yellow-400 mr-3 group-hover:text-white transition-colors duration-300">
                                    {card.icon}
                                </div>
                                <h3 className='text-lg font-semibold text-white group-hover:text-yellow-400 transition-colors duration-300'>
                                    {card.title}
                                </h3>
                            </div>
                            <p className='text-gray-400 text-sm mb-4'>
                                {card.description}
                            </p>
                            <div className="flex justify-end">
                                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 group-hover:bg-gradient-to-r from-yellow-500 to-red-500 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="h-1 w-full bg-gradient-to-r from-yellow-500/0 via-yellow-500 to-red-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;