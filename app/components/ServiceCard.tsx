'use client'
import React from 'react';

interface ServiceCardProps {
  title: string;
  desc: string;
  icon: JSX.Element;
}

export default function ServiceCard({ title, desc, icon }: ServiceCardProps) {
  return (
    <div className="p-6 bg-white rounded-2xl shadow hover:shadow-2xl transition-all duration-300 flex flex-col justify-between items-center text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{desc}</p>
      <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-md">
        Заказать услугу
      </button>
    </div>
  );
}
