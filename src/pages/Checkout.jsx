import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return sum + price;
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address) {
      alert("Please fill in all fields.");
      return;
    }

    // In a real app → send data to backend / payment gateway
    clearCart();
    navigate("/success");
  };

  if (cart.length === 0) {
    return (
      <section className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty 🛒</h2>
      </section>
    );
  }

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold  mb-6">Checkout</h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block font-semibold mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Mobile</label>
          <input
            type="tel"
            name="phone"
            // value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Shipping Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            rows="3"
            required
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="font-bold text-lg">
            Total: <span className="text-blue-600">${total.toFixed(2)}</span>
          </p>
          <button
            type="submit"
            className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </form>
    </section>
  );
}
