"use client";

import OrderList from "@/components/ui/OrderList";

export default function ClientOrdersPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Клиент: мои заказы</h1>
      <OrderList role="client" />
    </main>
  );
}
