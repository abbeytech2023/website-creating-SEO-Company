import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <section className="p-6 flex flex-col items-center justify-center text-center min-h-[70vh]">
      <div className="bg-green-100 p-8 rounded-full mb-6">
        <span className="text-green-600 text-6xl">✔</span>
      </div>
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Order Successful!
      </h2>
      <p className="text-gray-700 max-w-md mb-6">
        🎉 Thank you for shopping with{" "}
        <span className="font-semibold">ShoeShop</span>! Your order has been
        placed successfully and is now being processed.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/shop"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
        <Link
          to="/"
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
