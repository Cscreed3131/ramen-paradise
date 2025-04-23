import React from 'react';

const Card = ({ className ='', children}) => {
    return (
        <div className={`border rounded-lg shadow-lg p-4 bg-white ${className}`}>
            {children}
        </div>
    );
};

export default Card;