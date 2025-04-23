import React from 'react';

export default function Button({
  children,
  type = 'button',
  bgColor = '',
  textColor = '',
  className = '',
  ...props
}) {
  return (
    <button
      className={`
        px-4 
        rounded-lg
        ${bgColor} 
        ${textColor} 
        ${className}`}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}
