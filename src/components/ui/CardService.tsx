"use client"
import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export default function CardService({ children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      {children}
    </div>
  );
}
