'use client';
import React, { useEffect, useState, useRef } from "react";
import { getOrders, takeOrder, updateOrderStatus } from "@/lib/api";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import TabGroup from "@/components/ui/TabGroup";

interface Order {
  id: number;
  customer: string;
  status: 'new' | 'in-progress' | 'completed';
  items: string[];
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'in-progress' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newOrdersIds, setNewOrdersIds] = useState<number[]>([]);
  const prevOrdersRef = useRef<Order[]>([]);

  const tabs = ['all', 'new', 'in-progress', 'completed'];

  const fetchOrders = async () => {
    try {
      const data = await getOrders();
      const prevIds = prevOrdersRef.current.map(o => o.id);
      const newIds = data.filter(o => !prevIds.includes(o.id)).map(o => o.id);
      if (newIds.length > 0) setNewOrdersIds(newIds);
      setOrders(data);
      prevOrdersRef.current = data;
    } catch (e) {
      console.error("Ошибка загрузки заказов:", e);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let result = [...orders];
    if (filterStatus !== 'all') result = result.filter(o => o.status === filterStatus);
    if (searchQuery.trim() !== '') result = result.filter(o => o.customer.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredOrders(result);
  }, [orders, filterStatus, searchQuery]);

  const handleTakeOrder = async (id: number) => {
    try {
      await takeOrder(id);
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'in-progress' } : o));
      setNewOrdersIds(prev => prev.filter(nid => nid !== id));
    } catch (e) {
      console.error("Ошибка при взятии заказа:", e);
    }
  };

  const handleCompleteOrder = async (id: number) => {
    try {
      await updateOrderStatus(id, 'completed');
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status: 'completed' } : o));
      setNewOrdersIds(prev => prev.filter(nid => nid !== id));
    } catch (e) {
      console.error("Ошибка при завершении заказа:", e);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'new': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return '';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <TabGroup tabs={tabs} activeTab={filterStatus} onChange={(tab) => setFilterStatus(tab as any)} />
        <input
          type="text"
          placeholder="Поиск по клиенту"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border rounded px-2 py-1"
        />
      </div>

      {filteredOrders.map(order => (
        <Card
          key={order.id}
          className={`p-4 shadow-md transition-colors duration-500 transform ${newOrdersIds.includes(order.id)?'animate-pulse scale-105':''}`}
        >
          <p><strong>Заказчик:</strong> {order.customer}</p>
          <p><strong>Товары:</strong> {order.items.join(', ')}</p>
          <p>
            <strong>Статус:</strong> 
            <span className={`ml-2 px-2 py-1 rounded ${getStatusClass(order.status)} transition-colors duration-500`}>
              {order.status}
            </span>
          </p>
          <div className="mt-2 flex gap-2">
            {order.status === 'new' && (
              <Button onClick={() => handleTakeOrder(order.id)}>Взять заказ</Button>
            )}
            {order.status === 'in-progress' && (
              <Button onClick={() => handleCompleteOrder(order.id)}>Завершить заказ</Button>
            )}
          </div>
        </Card>
      ))}
      {filteredOrders.length === 0 && <p>Нет заказов для отображения.</p>}
    </div>
  );
}
