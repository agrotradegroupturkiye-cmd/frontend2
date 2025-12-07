'use client';
import React from 'react';

export function Card({ children, className='' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out ${className}`}>
      {children}
    </div>
  );
}

export default Card;
