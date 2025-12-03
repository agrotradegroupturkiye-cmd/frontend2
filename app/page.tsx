'use client'
import React from 'react';
import Hero from './components/Hero';
import Services from './components/Services';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <Hero />
      <Services />
      <Footer />
    </main>
  );
}
