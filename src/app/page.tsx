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
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map(cat=>(
        <Card key={cat.name} className="flex items-center justify-center cursor-pointer hover:scale-105 hover:shadow-xl">
          <Button onClick={()=>window.location.href=cat.link} className="w-full h-full text-xl font-semibold">
            {cat.name}
          </Button>
        </Card>
      ))}
    </div>
  );
}
