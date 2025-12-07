"use client";

import OrderList from "@/components/ui/OrderList";

export default function ServiceOrdersPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Сервис: доступные заказы</h1>
      <OrderList role="service" />
    </main>
  );
}
