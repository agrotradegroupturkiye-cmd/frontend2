export async function getOrders() {
  return [
    { id: 1, customer: 'Иван', status: 'new', items: ['Уборка квартиры', 'Мытьё окон'] },
    { id: 2, customer: 'Мария', status: 'in-progress', items: ['Мытьё ковра'] },
    { id: 3, customer: 'Алексей', status: 'completed', items: ['Уборка офиса'] },
  ];
}

export async function takeOrder(id: number) {
  console.log('Order taken:', id);
}

export async function updateOrderStatus(id: number, status: string) {
  console.log('Order updated:', id, status);
}

export async function getApartments() {
  return [
    { id: 1, name: 'Апартаменты A', area: 50 },
    { id: 2, name: 'Апартаменты B', area: 80 },
  ];
}

export async function getCarpets() {
  return [
    { id: 1, name: 'Ковер Красный', size: '2x3' },
    { id: 2, name: 'Ковер Синий', size: '3x4' },
  ];
}

export async function getOffices() {
  return [
    { id: 1, name: 'Офис 1', area: 100 },
    { id: 2, name: 'Офис 2', area: 200 },
  ];
}

export async function getServices() {
  return [
    { id: 1, name: 'Экспресс уборка' },
    { id: 2, name: 'Глубокая уборка' },
  ];
}

export async function getWindows() {
  return [
    { id: 1, name: 'Окно 1', floor: 1 },
    { id: 2, name: 'Окно 2', floor: 2 },
  ];
}
