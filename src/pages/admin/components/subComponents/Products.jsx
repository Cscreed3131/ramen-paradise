import React, { useState } from 'react';
import Button from '../../../../components/Button';
import { useNavigate } from 'react-router-dom';

function Products() {
    const navigate= useNavigate();

    const cards = [
        { icon: '📦', title: 'Product List', slug: 'product-list' },
        { icon: '➕', title: 'Add Product', slug: 'add-product' },
        { icon: '❌', title: 'Remove Product', slug: 'remove-product' },
        { icon: '✏️', title: 'Edit Product', slug: 'edit-product' },
        { icon: '🔍', title: 'Best Selling Items', slug: 'best-selling-items' }
    ];

    return (
        <div className='flex flex-wrap flex-col h-full w-full'>
            <h2 className='text-2xl font-bold'>Products</h2>
            <p className='my-2'>Manage your products here.</p>
            <div className='flex flex-col gap-3'>
                {cards.map((card, index) => (
                    <div key={index} className='flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md'>
                        <h3 className='text-xl font-semibold flex items-center gap-2'>
                            <span>{card.icon}</span> {card.title}
                        </h3>
                        <Button 
                            className='px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-300' 
                            onClick={() => navigate(card.slug)}
                        >
                            {'>'}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
