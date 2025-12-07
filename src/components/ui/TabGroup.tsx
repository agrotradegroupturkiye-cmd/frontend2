'use client';
import React from 'react';
interface TabGroupProps {
  tabs: string[];
  activeTab: string;
  onChange: (tab: string) => void;
}
export default function TabGroup({ tabs, activeTab, onChange }: TabGroupProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`
            px-4 py-3 min-w-[80px] h-12
            rounded-xl
            shadow-md
            flex items-center justify-center
            text-gray-800 font-medium
            transition-all duration-300 transform
            ${activeTab === tab ? 'bg-gray-200 shadow-lg' : 'bg-white hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1'}
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
