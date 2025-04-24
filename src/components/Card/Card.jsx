import React from 'react';

const Card = ({ className ='', children ,...props}) => {
    return (
      <div className={`border rounded-lg shadow-lg p-4 bg-white ${className}}`} {...props}>
        {children}
      </div>
    );
};

export default Card;