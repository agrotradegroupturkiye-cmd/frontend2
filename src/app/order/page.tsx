'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/UIWrapper';
import Button from '@/components/ui/Button';

export default function OrderPage() {
  const [form, setForm] = useState({ name:'', service:'', note:'' });
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Card>
        <h2 className="text-2xl font-bold mb-4">Новая заявка</h2>
        <div className="flex flex-col gap-2">
          <input type="text" placeholder="Имя" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border rounded px-2 py-1"/>
          <input type="text" placeholder="Услуга" value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className="border rounded px-2 py-1"/>
          <textarea placeholder="Примечание" value={form.note} onChange={e=>setForm({...form,note:e.target.value})} className="border rounded px-2 py-1"/>
          <Button onClick={()=>alert('Отправлено')} className="mt-2">Отправить</Button>
        </div>
      </Card>
    </div>
  );
}
