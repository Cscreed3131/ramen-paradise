import React from 'react';

const CardContent = ({ children, className = '' ,...props}) => {
  return <div className={`text-sm text-gray-800 ${className}`} {...props}>{children}</div>;
};

export default CardContent;