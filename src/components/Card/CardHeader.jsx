import React from 'react';

const CardHeader = ({ children, className = '' }) => {
  return <div className={`text-lg font-semibold mb-2 ${className}`}>{children}</div>;
};

export default CardHeader;