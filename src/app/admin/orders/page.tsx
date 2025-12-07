import React from "react";
import OrderList from "@/components/ui/OrderList";

export const metadata = {
  title: "Дашборд заказов CleanGo",
  description: "Админ панель заказов с live-update и анимацией",
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-green-50 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Дашборд заказов CleanGo
      </h1>
      <OrderList />
    </div>
  );
}
