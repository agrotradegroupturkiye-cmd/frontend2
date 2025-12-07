'use client';
import React from 'react';
import { Card, TabGroup } from './UIWrapper';
interface AdminPageTemplateProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}
export default function AdminPageTemplate({ tabs, activeTab, onTabChange, children }: AdminPageTemplateProps) {
  return (
    <div className="p-4 space-y-4">
      <TabGroup tabs={tabs} activeTab={activeTab} onChange={onTabChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}
