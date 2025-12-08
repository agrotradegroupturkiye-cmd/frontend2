import React from 'react';
import HomeSection from './components/HomeSection';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-50 p-6 space-y-12">
      <HomeSection />
      <Footer />
    </main>
  );
}
