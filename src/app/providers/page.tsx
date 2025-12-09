'use client';
import { useState, useEffect } from 'react';

type Order = {
    id: number;
    client: string;
    service: string;
    price: number;
    urgent: boolean;
    status: 'Новый' | 'В обработке' | 'Выполнен';
    date: string;
    vip?: boolean;
    repeat?: boolean;
    selected?: boolean;
    isNew?: boolean;
};

const mockOrders: Order[] = [
    { id: 1, client: 'Иван Иванов', service: 'Уборка квартиры', price: 1500, urgent: false, status: 'Новый', date: '2025-12-08T10:00:00', repeat: true, isNew: true },
    { id: 2, client: 'Мария Петрова', service: 'Мытьё окон', price: 2000, urgent: true, status: 'Новый', date: '2025-12-09T12:00:00', vip: true, isNew: true },
    { id: 3, client: 'Сергей Смирнов', service: 'Генеральная уборка', price: 3500, urgent: false, status: 'В обработке', date: '2025-12-07T09:00:00' },
];

export default function ProviderDashboard() {
    const [orders, setOrders] = useState<Order[]>(mockOrders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [filterStatus, setFilterStatus] = useState<'Все' | 'Новый' | 'В обработке' | 'Выполнен' | 'Срочный'>('Все');
    const [filterTag, setFilterTag] = useState<'Все' | 'VIP' | 'Повторный клиент'>('Все');
    const [sort, setSort] = useState<'dateAsc' | 'dateDesc' | 'priceAsc' | 'priceDesc'>('dateDesc');
    const [search, setSearch] = useState('');
    const [selectAll, setSelectAll] = useState(false);

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        setOrders(prev => prev.map(o => ({ ...o, selected: !selectAll })));
    };

    const updateStatus = (id: number, status: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status, isNew: false } : o));
    };

    const toggleTag = (id: number, tag: 'vip' | 'repeat') => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, [tag]: !o[tag] } : o));
    };

    const filteredOrders = orders.filter(o => {
        const statusMatch =
            filterStatus === 'Все' ? true :
            filterStatus === 'Срочный' ? o.urgent : o.status === filterStatus;
        const tagMatch =
            filterTag === 'Все' ? true :
            filterTag === 'VIP' ? o.vip : o.repeat;
        const searchMatch = o.client.toLowerCase().includes(search.toLowerCase()) ||
                            o.service.toLowerCase().includes(search.toLowerCase());
        return statusMatch && tagMatch && searchMatch;
    });

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        if (sort === 'dateAsc') return new Date(a.date).getTime() - new Date(b.date).getTime();
        if (sort === 'dateDesc') return new Date(b.date).getTime() - new Date(a.date).getTime();
        if (sort === 'priceAsc') return a.price - b.price;
        if (sort === 'priceDesc') return b.price - a.price;
        return 0;
    });

    const formatDateClient = (dateStr: string) => {
        if (typeof window === 'undefined') return dateStr; // на сервере оставляем ISO
        const d = new Date(dateStr);
        return d.toLocaleString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
    };

    const massUpdateStatus = (status: Order['status']) => {
        setOrders(prev => prev.map(o => o.selected ? { ...o, status, selected: false } : o));
        setSelectAll(false);
    };

    const newOrdersCount = orders.filter(o => o.isNew).length;

    return (
        <div className="p-6 space-y-6 font-sans">

            {newOrdersCount > 0 && (
                <div className="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-2xl shadow-lg animate-fadeInDown z-50">
                    {newOrdersCount} новый(е) заказ(ов)!
                </div>
            )}

            <h1 className="text-2xl font-semibold">Доска провайдера</h1>

            {/* Поиск, фильтры, сортировка */}
            <div className="flex flex-wrap gap-4 items-center">
                <input
                    type="text"
                    placeholder="Поиск по клиенту или услуге..."
                    className="px-4 py-2 border rounded-2xl flex-1"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {['Все', 'Новый', 'В обработке', 'Выполнен', 'Срочный'].map(f => (
                    <button key={f} className={`px-4 py-2 rounded-2xl font-medium transition duration-300 ${filterStatus === f ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`} onClick={() => setFilterStatus(f as any)}>{f}</button>
                ))}
                {['Все', 'VIP', 'Повторный клиент'].map(f => (
                    <button key={f} className={`px-3 py-1 rounded-2xl font-medium transition duration-300 ${filterTag === f ? 'bg-indigo-400 text-white' : 'bg-gray-200'}`} onClick={() => setFilterTag(f as any)}>{f}</button>
                ))}
                <select className="px-4 py-2 border rounded-2xl" value={sort} onChange={e => setSort(e.target.value as any)}>
                    <option value="dateDesc">Дата ↓</option>
                    <option value="dateAsc">Дата ↑</option>
                    <option value="priceDesc">Цена ↓</option>
                    <option value="priceAsc">Цена ↑</option>
                </select>
                <button className="px-4 py-2 bg-indigo-500 text-white rounded-2xl hover:scale-105 transition" onClick={toggleSelectAll}>
                    {selectAll ? 'Снять выделение' : 'Выбрать все'}
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-2xl hover:scale-105 transition" onClick={() => massUpdateStatus('Выполнено')}>
                    Выполнено для выбранных
                </button>
            </div>

            {/* Список заказов */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedOrders.map(order => (
                    <div key={order.id} className={`p-4 border shadow cursor-pointer relative rounded-3xl transform transition-all duration-300 ease-out ${order.urgent ? 'border-red-500 bg-red-50' : order.status==='Выполнено'?'bg-gray-100 border-gray-300 opacity-70':'border-gray-300 bg-white'} ${order.selected?'ring-2 ring-indigo-400':''}`} onClick={() => setSelectedOrder(order)}>
                        <input type="checkbox" className="absolute top-2 left-2" checked={order.selected || false} onChange={() => setOrders(prev => prev.map(o => o.id===order.id?{...o,selected:!o.selected}:o))}/>
                        {order.urgent && <span className="absolute top-2 right-2 text-red-600 font-bold text-sm">⚡ Срочно</span>}
                        {order.vip && <span className="absolute top-6 right-2 text-purple-600 font-bold text-sm">★ VIP</span>}
                        {order.repeat && <span className="absolute top-10 right-2 text-green-600 font-bold text-sm">♻ Повтор</span>}
                        <h2 className="font-semibold text-lg">{order.service}</h2>
                        <p>Клиент: {order.client}</p>
                        <p>Цена: {order.price}₸</p>
                        <p>Статус: <span className="font-medium">{order.status}</span></p>
                        <p>Дата: {typeof window !== 'undefined' ? new Date(order.date).toLocaleString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }) : order.date}</p>
                    </div>
                ))}
            </div>

            {/* Детали заказа */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-3xl shadow-2xl w-96 space-y-4 transition-all">
                        <h2 className="text-xl font-bold">{selectedOrder.service}</h2>
                        <p>Клиент: {selectedOrder.client}</p>
                        <p>Цена: {selectedOrder.price}₸</p>
                        <p>Статус: {selectedOrder.status}</p>
                        <p>Дата: {typeof window !== 'undefined' ? new Date(selectedOrder.date).toLocaleString('ru-RU', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' }) : selectedOrder.date}</p>
                        <p>Срочность: {selectedOrder.urgent ? 'Да' : 'Нет'}</p>
                        <p>VIP: {selectedOrder.vip ? 'Да' : 'Нет'}</p>
                        <p>Повторный клиент: {selectedOrder.repeat ? 'Да' : 'Нет'}</p>
                        <div className="flex justify-between mt-4 space-x-2 flex-wrap">
                            <button className="px-4 py-2 bg-green-500 text-white rounded-2xl hover:scale-105 transition" onClick={() => { updateStatus(selectedOrder.id, 'Выполнено'); setSelectedOrder(null); }}>Выполнено</button>
                            <button className="px-4 py-2 bg-yellow-400 text-white rounded-2xl hover:scale-105 transition" onClick={() => { updateStatus(selectedOrder.id, 'В обработке'); setSelectedOrder(null); }}>В обработке</button>
                            <button className="px-4 py-2 bg-gray-300 text-black rounded-2xl hover:scale-105 transition" onClick={() => setSelectedOrder(null)}>Закрыть</button>
                            <button className="px-4 py-2 bg-purple-500 text-white rounded-2xl hover:scale-105 transition" onClick={() => toggleTag(selectedOrder.id,'vip')}>VIP</button>
                            <button className="px-4 py-2 bg-green-500 text-white rounded-2xl hover:scale-105 transition" onClick={() => toggleTag(selectedOrder.id,'repeat')}>Повтор</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
