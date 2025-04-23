import React from 'react';

const CardTitle = ({ children, className = '' }) => {
  return <h2 className={`text-xl font-bold mb-2 ${className}`}>{children}</h2>;
};

export default CardTitle;