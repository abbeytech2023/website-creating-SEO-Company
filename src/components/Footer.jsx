import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("$", "")); // convert "$120" → 120
    return sum + price;
  }, 0);

  if (cart.length === 0) {
    return (
      <section className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h2>
        <Link
          to="/shop"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Go Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Shopping Cart</h2>
      <div className="space-y-6">
        {cart.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white shadow p-4 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-blue-600 font-bold">{item.price}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <p className="mb-2">
          Items: <span className="font-medium">{cart.length}</span>
        </p>
        <p className="mb-4">
          Total:{" "}
          <span className="font-bold text-blue-600">${total.toFixed(2)}</span>
        </p>
        <div className="flex space-x-4">
          <button
            onClick={clearCart}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}
