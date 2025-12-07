'use client';
import React from 'react';
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export default function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      {...props}
      className={`
        bg-white rounded-xl shadow-md p-4
        transition-shadow duration-300
        hover:shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
}
