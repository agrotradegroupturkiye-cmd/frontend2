'use client'
import React from 'react';
import ServiceCard from './ServiceCard';

export default function Services() {
  const services = [
    {
      title: "Уборка квартир",
      desc: "Быстро и качественно, под ключ.",
      icon: <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
    },
    {
      title: "Уборка офисов",
      desc: "Поддерживаем чистоту вашего бизнеса.",
      icon: <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4V4z M8 8h8v8H8V8z" /></svg>
    },
    {
      title: "Чистка ковров",
      desc: "Профессиональная чистка любых ковров.",
      icon: <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
    },
    {
      title: "Мойка окон",
      desc: "Прозрачные окна без разводов.",
      icon: <svg className="w-10 h-10 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4V4z" /></svg>
    }
  ];

  return (
    <section className="w-full max-w-6xl mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {services.map((s) => (
        <ServiceCard key={s.title} title={s.title} desc={s.desc} icon={s.icon} />
      ))}
    </section>
  );
}
