import React from 'react';
import Button from '../../../../components/Button';

const Card = ({ icon, title }) => (
    <div className='flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md'>
        <h3 className='text-xl font-semibold flex items-center gap-2'>
            <span>{icon}</span> {title}
        </h3>
        <Button className='px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:scale-105 transition duration-300'>
            {'>'}
        </Button>
    </div>
);

function Products() {
    const cards = [
        { icon: '📦', title: 'Product List' },
        { icon: '➕', title: 'Add Product' },
        { icon: '❌', title: 'Remove Product' },
        { icon: '✏️', title: 'Edit Product' },
        { icon: '🔍', title: 'Best Selling Items' },
    ];

    return (
        <div className='flex flex-wrap flex-col h-full w-full'>
            <h2 className='text-2xl font-bold'>Products</h2>
            <p className='my-2'>Manage your products here.</p>
            <div className='flex flex-col gap-3'>
                {cards.map((card, index) => (
                    <Card key={index} icon={card.icon} title={card.title} />
                ))}
            </div>
        </div>
    );
}

export default Products;
