'use client';
import React, { useState } from 'react';

type Service = {
  title: string;
  description: string;
  unit: 'м²' | 'шт';
  baseRate: number;
  icon: string;
  bg: string;
  text: string;
};

const services: Service[] = [
  { title: 'Уборка квартир', description: 'Быстро и качественно, под ключ.', unit: 'м²', baseRate: 150, icon: '🏠', bg: 'bg-blue-100', text: 'text-blue-700' },
  { title: 'Уборка офисов', description: 'Поддерживаем чистоту вашего бизнеса.', unit: 'м²', baseRate: 200, icon: '🏢', bg: 'bg-green-100', text: 'text-green-700' },
  { title: 'Мойка ковров', description: 'Удаляем пыль и загрязнения из ковров.', unit: 'шт', baseRate: 500, icon: '🧼', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  { title: 'Мойка окон', description: 'Чистые окна без разводов.', unit: 'шт', baseRate: 300, icon: '🪟', bg: 'bg-purple-100', text: 'text-purple-700' },
];

export default function HomeSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [size, setSize] = useState(0);
  const [floor, setFloor] = useState(1);
  const [urgent, setUrgent] = useState(false);

  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [cleaningType, setCleaningType] = useState('Поверхностная');

  const [offices, setOffices] = useState(1);

  const [carpetsCount, setCarpetsCount] = useState(1);
  const [carpetSize, setCarpetSize] = useState(1);
  const [carpetType, setCarpetType] = useState('Шерстяной');

  const [windowsCount, setWindowsCount] = useState(1);
  const [windowSize, setWindowSize] = useState(1);

  const toggleCard = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
    setSize(0); setFloor(1); setUrgent(false); setRooms(1); setBathrooms(1); setCleaningType('Поверхностная');
    setOffices(1); setCarpetsCount(1); setCarpetSize(1); setCarpetType('Шерстяной'); setWindowsCount(1); setWindowSize(1);
  };

  const calculatePrice = (s: Service) => {
    let price = s.baseRate;
    if (s.title === 'Уборка квартир') {
      price *= size || 1;
      price *= rooms;
      price += bathrooms * 100;
      if (cleaningType === 'Генеральная') price *= 1.5;
      if (floor > 5) price *= 1.1;
    } else if (s.title === 'Уборка офисов') {
      price *= size || 1;
      price *= offices;
      if (floor > 5) price *= 1.1;
    } else if (s.title === 'Мойка ковров') {
      price *= carpetsCount;
      price *= carpetSize;
      if (carpetType === 'Шерстяной') price *= 1.2;
    } else if (s.title === 'Мойка окон') {
      price *= windowsCount;
      price *= windowSize;
      if (floor > 3) price *= 1.1;
    }
    if (urgent) price *= 1.3;
    return Math.round(price);
  };

  const renderCounter = (value:number, setter:(n:number)=>void) => (
    <div className="flex items-center space-x-2 mt-1">
      <button className="bg-gray-200 hover:bg-gray-300 rounded px-2" onClick={()=>setter(Math.max(0,value-1))}>-</button>
      <span className="px-2">{value}</span>
      <button className="bg-gray-200 hover:bg-gray-300 rounded px-2" onClick={()=>setter(value+1)}>+</button>
    </div>
  );

  const progressColor = (price:number) => price < 500 ? 'bg-green-500' : price < 1500 ? 'bg-yellow-400' : 'bg-red-500';
  const progressPercent = (price:number) => Math.min(100,(price/3000)*100);

  return (
    <section className="w-full max-w-[1200px] mx-auto py-12 px-4 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Агрегатор клининговых услуг</h1>
        <p className="text-gray-700 text-lg">Кликните на услугу, чтобы рассчитать стоимость</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s,index)=>(
          <div key={s.title} onClick={()=>toggleCard(index)} className={`flex flex-col items-center p-6 rounded-2xl shadow-md transition-all duration-500 cursor-pointer ${s.bg} ${s.text} hover:scale-105 hover:shadow-xl`}>
            <div className="text-5xl mb-4">{s.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-gray-700">{s.description}</p>

            <div className={`w-full mt-4 overflow-hidden transition-all duration-500 ${activeIndex===index?'max-h-[2000px]':'max-h-0'}`}>
              {activeIndex===index && (
                <div className="p-4 bg-white rounded-lg shadow-inner space-y-4">
                  {s.title==='Уборка квартир' && <>
                    <label>Площадь (м²)</label>
                    <input type="number" className="w-full border rounded p-2 mt-1" value={size} onChange={e=>setSize(Number(e.target.value))} />
                    <label>Этаж</label>{renderCounter(floor,setFloor)}
                    <label>Тип уборки</label>
                    <select className="w-full border rounded p-2 mt-1" value={cleaningType} onChange={e=>setCleaningType(e.target.value)}>
                      <option>Поверхностная</option><option>Генеральная</option>
                    </select>
                    <label>Количество комнат</label>{renderCounter(rooms,setRooms)}
                    <label>Количество ванных</label>{renderCounter(bathrooms,setBathrooms)}
                  </>}

                  {s.title==='Уборка офисов' && <>
                    <label>Площадь (м²)</label><input type="number" className="w-full border rounded p-2 mt-1" value={size} onChange={e=>setSize(Number(e.target.value))} />
                    <label>Этаж</label>{renderCounter(floor,setFloor)}
                    <label>Количество кабинетов</label>{renderCounter(offices,setOffices)}
                  </>}

                  {s.title==='Мойка ковров' && <>
                    <label>Количество ковров</label>{renderCounter(carpetsCount,setCarpetsCount)}
                    <label>Площадь каждого ковра (м²)</label><input type="number" className="w-full border rounded p-2 mt-1" value={carpetSize} onChange={e=>setCarpetSize(Number(e.target.value))} />
                    <label>Материал ковра</label>
                    <select className="w-full border rounded p-2 mt-1" value={carpetType} onChange={e=>setCarpetType(e.target.value)}>
                      <option>Шерстяной</option><option>Полиэстер</option>
                    </select>
                  </>}

                  {s.title==='Мойка окон' && <>
                    <label>Количество окон</label>{renderCounter(windowsCount,setWindowsCount)}
                    <label>Площадь окон (м²)</label><input type="number" className="w-full border rounded p-2 mt-1" value={windowSize} onChange={e=>setWindowSize(Number(e.target.value))} />
                    <label>Этаж</label>{renderCounter(floor,setFloor)}
                  </>}

                  <div className="mt-2">
                    <label className="inline-flex items-center space-x-2">
                      <input type="checkbox" checked={urgent} onChange={e=>setUrgent(e.target.checked)} />
                      <span>Срочно (+30%)</span>
                    </label>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 h-6 rounded-lg overflow-hidden">
                      <div className={`h-6 rounded-lg transition-all duration-500 ${progressColor(calculatePrice(s))}`} style={{width:`${progressPercent(calculatePrice(s))}%`}}></div>
                    </div>
                    <div className="text-center font-bold text-xl mt-2">Цена: {calculatePrice(s)}₸</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
