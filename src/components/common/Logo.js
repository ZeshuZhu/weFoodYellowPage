// src/components/common/Logo.js
import React from 'react';

const Logo = ({ size = 'md', className = '' }) => {
  // Define sizes
  const sizes = {
    sm: { height: 30, fontSize: 18 },
    md: { height: 40, fontSize: 24 },
    lg: { height: 60, fontSize: 32 },
  };
  
  const { height, fontSize } = sizes[size] || sizes.md;
  
  return (
    <div className={`flex items-center ${className}`}>
      <div 
        style={{ height: `${height}px`, width: `${height}px` }}
        className="rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mr-2"
      >
        <span style={{ fontSize: `${fontSize * 0.6}px` }} className="font-bold text-white">W</span>
      </div>
      <span 
        style={{ fontSize: `${fontSize}px` }}
        className="font-bold text-gray-800"
      >
        <span className="text-blue-600">WE</span>FOOD
      </span>
    </div>
  );
};

export default Logo;