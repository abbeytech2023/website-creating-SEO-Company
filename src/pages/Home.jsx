import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="text-center py-20 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to ShoeShop</h1>
      <p className="mb-6">Find the best sneakers, boots, and casual shoes.</p>
      <Link
        to="/shop"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Shop Now
      </Link>
    </section>
  );
}
