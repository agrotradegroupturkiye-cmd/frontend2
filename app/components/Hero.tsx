'use client'
import React from 'react';

export default function Hero() {
  return (
    <section className="w-full max-w-6xl mt-12 p-8 bg-white rounded-2xl shadow-xl text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">CleanGo — клининг без забот</h1>
      <p className="text-gray-700 text-lg md:text-xl mb-6">
        Агрегатор профессиональных услуг по уборке квартир, офисов, ковров и окон. Найди исполнителя быстро и удобно.
      </p>
      <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md">
        Заказать уборку
      </button>
    </section>
  );
}
