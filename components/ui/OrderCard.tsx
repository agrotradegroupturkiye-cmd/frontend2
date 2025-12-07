export default function OrderCard({ order }) { return <div className="border p-2 rounded">{order.name} - {order.status}</div>; }
