import React from "react";
import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
import { useCartContext } from "../hooks/useCartContext";
import { formatPrice } from "../utility/utility";

export default function ProductCard({ product }) {
  console.log(product);

  const { addToCart } = useCartContext();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition">
      <Link to={`/singleshoes/${product.id}`}>
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="font-semibold text-lg">{product?.name}</h3>
        <p className="text-blue-600 font-bold">{formatPrice(product?.price)}</p>
        <p>{product?.color}</p>
      </Link>

      <button
        onClick={() => addToCart(product)}
        className="mt-4 w-full bg-blue-600 cursor-pointer text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
