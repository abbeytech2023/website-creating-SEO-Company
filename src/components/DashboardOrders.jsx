export default function DashboardOrders({ orders }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-serif mb-4">Recent Orders</h2>
      {orders.map((o) => (
        <div
          key={o.id}
          className="bg-white p-4 rounded-xl shadow flex justify-between items-center mb-3"
        >
          <p>Order ID: {o.id}</p>
          <p>Status: {o.status}</p>
          <p>Total: ${o.total_amount}</p>
        </div>
      ))}
    </div>
  );
}
