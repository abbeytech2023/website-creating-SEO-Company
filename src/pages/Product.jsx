import React from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import products from "../data/product";

export default function Product() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();

  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="p-6 text-center">
      <img
        src={product.image}
        alt={product.name}
        className="mx-auto w-64 h-64 object-cover mb-6"
      />
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-lg text-gray-600 mb-4">{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
