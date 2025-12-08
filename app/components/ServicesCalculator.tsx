'use client';
import React, { useState } from 'react';

const services = [
  { title: 'Уборка квартир', unit: 'м²', baseRate: 150 },
  { title: 'Уборка офисов', unit: 'м²', baseRate: 200 },
  { title: 'Мойка ковров', unit: 'шт', baseRate: 500 },
  { title: 'Мойка окон', unit: 'шт', baseRate: 300 },
];

export default function ServicesCalculator() {
  const [service, setService] = useState(services[0].title);
  const [size, setSize] = useState(0);
  const [urgent, setUrgent] = useState(false);
  const [floor, setFloor] = useState(1);

  const selected = services.find(s => s.title === service)!;

  const calculatePrice = () => {
    let price = selected.baseRate;
    if (selected.unit === 'м²') price *= size;
    if (urgent) price *= 1.3;
    if (floor > 5) price *= 1.1;
    return Math.round(price);
  };

  return (
    <div className="max-w-lg w-full mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Калькулятор стоимости</h2>

      <div>
        <label className="block font-semibold mb-1">Выберите услугу</label>
        <select
          className="w-full border rounded p-2"
          value={service}
          onChange={e => setService(e.target.value)}
        >
          {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
        </select>
      </div>

      {selected.unit === 'м²' && (
        <div>
          <label className="block font-semibold mb-1">Площадь ({selected.unit})</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={size}
            onChange={e => setSize(Number(e.target.value))}
          />
        </div>
      )}

      <div>
        <label className="inline-flex items-center space-x-2">
          <input type="checkbox" checked={urgent} onChange={e => setUrgent(e.target.checked)} />
          <span>Срочно (+30%)</span>
        </label>
      </div>

      {(service === 'Уборка квартир' || service === 'Уборка офисов') && (
        <div>
          <label className="block font-semibold mb-1">Этаж</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={floor}
            onChange={e => setFloor(Number(e.target.value))}
          />
        </div>
      )}

      <div className="text-center text-xl font-bold mt-4">
        Цена: {calculatePrice()}₸
      </div>
    </div>
  );
}
