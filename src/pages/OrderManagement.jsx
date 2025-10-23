// src/pages/admin/OrdersPage.jsx
import React, { useState, useMemo } from "react";

/* -------------------------
  Orders Page (mock data + details modal)
  - No backend required
  - Replace mockOrders later with real API calls
--------------------------*/

const ORDER_STATUSES = [
  "pending",
  "paid",
  "processing",
  "packed",
  "shipped",
  "delivered",
  "canceled",
  "refunded",
];

function formatCurrency(n, currency = "NGN") {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    Number(n)
  );
}

/* Mock orders with items, shipping_address, metadata */
const mockOrders = [
  {
    id: "ORD-1001",
    customer: "John Doe",
    email: "john@example.com",
    phone: "+2348012345678",
    total_amount: 25000,
    status: "pending",
    payment_status: "unpaid",
    created_at: "2025-09-28T10:30:00Z",
    shipping_address: {
      line1: "12 Allen Ave",
      city: "Ikeja",
      state: "Lagos",
      postal_code: "100001",
      country: "NG",
    },
    items: [
      {
        id: "P-001",
        product: "Nike Air Max",
        sku: "NIKE-AIR-001",
        qty: 1,
        price: 15000,
      },
      {
        id: "P-002",
        product: "Adidas Yeezy",
        sku: "ADID-YEEZ-01",
        qty: 1,
        price: 10000,
      },
    ],
    metadata: {},
  },
  {
    id: "ORD-1002",
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "+2348098765432",
    total_amount: 18000,
    status: "shipped",
    payment_status: "paid",
    created_at: "2025-09-29T14:15:00Z",
    shipping_address: {
      line1: "45 Victoria Island",
      city: "Lagos",
      state: "Lagos",
      postal_code: "101241",
      country: "NG",
    },
    items: [
      {
        id: "P-010",
        product: "Puma Running Shoes",
        sku: "PUMA-RUN-010",
        qty: 2,
        price: 9000,
      },
    ],
    metadata: { tracking: "TRK-JAN1002" },
  },
  {
    id: "ORD-1003",
    customer: "Michael Johnson",
    email: "mike@example.com",
    phone: "+2348021112222",
    total_amount: 12000,
    status: "delivered",
    payment_status: "paid",
    created_at: "2025-09-30T09:00:00Z",
    shipping_address: {
      line1: "7 Isolo Rd",
      city: "Ikeja",
      state: "Lagos",
      postal_code: "100002",
      country: "NG",
    },
    items: [
      {
        id: "P-020",
        product: "Converse Chuck Taylor",
        sku: "CONV-CT-020",
        qty: 1,
        price: 12000,
      },
    ],
    metadata: { tracking: "TRK-MIC1003" },
  },
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  function updateOrder(orderId, changes) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, ...changes } : o))
    );
  }

  function updateStatus(orderId, newStatus) {
    // Basic business rules example:
    const payload = { status: newStatus };
    if (newStatus === "refunded") payload.payment_status = "refunded";
    if (newStatus === "delivered") payload.payment_status = "paid";
    updateOrder(orderId, payload);
  }

  function markShipped(orderId) {
    const tracking =
      "TRK-" + Math.random().toString(36).slice(2, 9).toUpperCase();
    updateOrder(orderId, {
      status: "shipped",
      metadata: { ...(getOrder(orderId).metadata || {}), tracking },
    });
  }

  function getOrder(id) {
    return orders.find((o) => o.id === id);
  }

  function exportToCSV(list) {
    const headers = [
      "Order ID",
      "Customer",
      "Email",
      "Status",
      "Payment",
      "Total",
      "Created At",
    ];
    const rows = list.map((o) => [
      o.id,
      o.customer,
      o.email,
      o.status,
      o.payment_status,
      o.total_amount,
      o.created_at,
    ]);
    const csv = [headers, ...rows]
      .map((r) =>
        r
          .map(String)
          .map((c) => '"' + c.replace(/"/g, '""') + '"')
          .join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus = statusFilter === "all" || o.status === statusFilter;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.customer.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        (o.phone || "").toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, search]);

  const analytics = useMemo(() => {
    const byStatus = {};
    let revenue = 0;
    for (const s of ORDER_STATUSES) byStatus[s] = 0;
    orders.forEach((o) => {
      byStatus[o.status] = (byStatus[o.status] || 0) + 1;
      if (o.payment_status === "paid") revenue += Number(o.total_amount || 0);
    });
    return { byStatus, revenue };
  }, [orders]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>

      <div className="flex gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All</option>
          {ORDER_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          className="border rounded p-2 flex-1"
          placeholder="Search by id, name, email, or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={() => exportToCSV(filteredOrders)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Export CSV
        </button>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 text-sm text-gray-600">
            <tr>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Payment</th>
              <th className="p-2 text-left">Created</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => (
              <tr
                key={o.id}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onDoubleClick={() => setSelectedOrder(o)} // quick open by double-click
              >
                <td
                  className="p-2 font-mono text-xs"
                  onClick={() => setSelectedOrder(o)}
                >
                  {o.id}
                </td>
                <td className="p-2" onClick={() => setSelectedOrder(o)}>
                  <div className="font-medium">{o.customer}</div>
                  <div className="text-xs text-gray-500">{o.email}</div>
                </td>
                <td className="p-2" onClick={() => setSelectedOrder(o)}>
                  {formatCurrency(o.total_amount)}
                </td>
                <td className="p-2">{o.status}</td>
                <td className="p-2">{o.payment_status}</td>
                <td className="p-2">
                  {new Date(o.created_at).toLocaleString()}
                </td>
                <td className="p-2">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => setSelectedOrder(o)}
                      className="px-2 py-1 border rounded text-sm"
                    >
                      View
                    </button>
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="border p-1 rounded text-sm"
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))}
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Analytics */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Analytics</h2>
        <div>Total revenue (paid): {formatCurrency(analytics.revenue)}</div>
        <div className="flex flex-wrap gap-4 mt-2 text-sm">
          {Object.entries(analytics.byStatus).map(([s, count]) => (
            <div key={s}>
              {s}: <strong>{count}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdate={(changes) => updateOrder(selectedOrder.id, changes)}
          onUpdateStatus={(newStatus) =>
            updateStatus(selectedOrder.id, newStatus)
          }
          onMarkShipped={() => {
            markShipped(selectedOrder.id);
            // refresh selectedOrder reference
            setSelectedOrder({ ...getOrder(selectedOrder.id) });
          }}
        />
      )}
    </div>
  );
}

/* ---------------------------
  Modal component showing items, shipping, metadata + actions
----------------------------*/
function OrderDetailModal({
  order,
  onClose,
  onUpdate,
  onUpdateStatus,
  onMarkShipped,
}) {
  const subtotal = order.items.reduce((s, it) => s + it.price * it.qty, 0);
  const shipping = order.total_amount - subtotal; // may be 0 or included
  const tracking = order.metadata?.tracking;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white w-full max-w-3xl rounded shadow p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-3">
          <div>
            <h3 className="text-lg font-semibold">Order {order.id}</h3>
            <div className="text-xs text-gray-500">
              {new Date(order.created_at).toLocaleString()}
            </div>
            <div className="mt-2 text-sm">
              Status: <strong>{order.status}</strong> — Payment:{" "}
              <strong>{order.payment_status}</strong>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-1 border rounded">
              Close
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <section>
            <h4 className="font-medium">Customer</h4>
            <div className="mt-1">{order.customer}</div>
            <div className="text-xs text-gray-500">
              {order.email} • {order.phone}
            </div>

            <h4 className="font-medium mt-4">Shipping Address</h4>
            <div className="mt-1 text-sm">
              <div>{order.shipping_address.line1}</div>
              <div>
                {order.shipping_address.city}, {order.shipping_address.state}{" "}
                {order.shipping_address.postal_code}
              </div>
              <div>{order.shipping_address.country}</div>
            </div>

            {tracking && (
              <div className="mt-3">
                <h4 className="font-medium">Tracking</h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="font-mono text-sm">{tracking}</div>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(tracking);
                      alert("Tracking copied");
                    }}
                    className="px-2 py-1 border rounded text-xs"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </section>

          <section>
            <h4 className="font-medium">Items</h4>
            <div className="space-y-2 mt-2">
              {order.items.map((it) => (
                <div
                  key={it.id}
                  className="p-2 border rounded flex justify-between items-center"
                >
                  <div>
                    <div className="font-medium">{it.product}</div>
                    <div className="text-xs text-gray-500">{it.sku}</div>
                    <div className="text-xs text-gray-500">Qty: {it.qty}</div>
                  </div>
                  <div className="text-sm">
                    {formatCurrency(it.price * it.qty)}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-sm">
              <div>
                Items subtotal: <strong>{formatCurrency(subtotal)}</strong>
              </div>
              <div>
                Shipping / fees: <strong>{formatCurrency(shipping)}</strong>
              </div>
              <div className="mt-2 text-lg">
                Total: <strong>{formatCurrency(order.total_amount)}</strong>
              </div>
            </div>
          </section>
        </div>

        {/* Actions */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => onUpdateStatus("processing")}
            className="px-3 py-2 border rounded"
          >
            Mark Processing
          </button>
          <button
            onClick={() => onUpdateStatus("packed")}
            className="px-3 py-2 border rounded"
          >
            Mark Packed
          </button>
          <button
            onClick={() => {
              onMarkShipped();
            }}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            Mark Shipped
          </button>
          <button
            onClick={() => onUpdateStatus("delivered")}
            className="px-3 py-2 bg-green-600 text-white rounded"
          >
            Mark Delivered
          </button>
          <button
            onClick={() => onUpdateStatus("canceled")}
            className="px-3 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => onUpdateStatus("refunded")}
            className="px-3 py-2 border rounded"
          >
            Refund
          </button>

          {/* Quick payment toggle for testing */}
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-600">Payment:</span>
            <select
              value={order.payment_status}
              onChange={(e) => onUpdate({ payment_status: e.target.value })}
              className="border p-1 rounded text-sm"
            >
              <option value="unpaid">unpaid</option>
              <option value="paid">paid</option>
              <option value="refunded">refunded</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
