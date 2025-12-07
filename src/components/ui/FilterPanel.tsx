"use client"
import React from "react";

export default function FilterPanel() {
  const filters = ["Срочно", "Экспресс", "Глубокая уборка", "Мытье окон", "Мойка ковров"];
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filters.map((f) => (
        <button
          key={f}
          className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200"
        >
          {f}
        </button>
      ))}
    </div>
  );
}
