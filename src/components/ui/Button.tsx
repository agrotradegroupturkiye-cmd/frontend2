'use client';
import React, { MouseEvent, useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className='', ...props }: ButtonProps) {
  const [ripples, setRipples] = useState<{x:number,y:number,id:number}[]>([]);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();
    setRipples(prev => [...prev, {x,y,id}]);
    setTimeout(()=>setRipples(prev => prev.filter(r => r.id !== id)), 500);
    if(props.onClick) props.onClick(e);
  };

  return (
    <button {...props} onClick={handleClick} className={`relative overflow-hidden rounded px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black font-semibold transition-all duration-300 ${className}`}>
      {children}
      {ripples.map(r=>(
        <span key={r.id} style={{
          top: r.y,
          left: r.x
        }} className="absolute w-6 h-6 bg-black/20 rounded-full animate-ripple pointer-events-none transform -translate-x-1/2 -translate-y-1/2"/>
      ))}
    </button>
  )
}
