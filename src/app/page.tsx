'use client';
import React from 'react';
import { Card } from '@/components/ui/UIWrapper';
import Button from '@/components/ui/Button';

const categories = [
  { name: 'Уборка квартир', link: '/apartments' },
  { name: 'Уборка офисов', link: '/offices' },
  { name: 'Мытье окон', link: '/windows' },
  { name: 'Мойка ковров', link: '/carpets' },
];

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {categories.map((cat, i) => (
        <Card
          key={cat.name}
          className="transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer flex items-center justify-center p-8 text-center"
        >
          <Button onClick={() => window.location.href = cat.link} className="w-full h-full text-xl font-semibold">
            {cat.name}
          </Button>
        </Card>
      ))}
    </div>
  );
}
