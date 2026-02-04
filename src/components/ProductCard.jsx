import React from "react";
import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
import { useCartContext } from "../hooks/useCartContext";
import { formatPrice } from "../utility/utility";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addToCart } = useCartContext();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center hover:shadow-lg transition">
      <Link to={`/productdetails/${product.id}`}>
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-60 object-cover rounded-md mb-4"
        />
        <h3 className="font-semibold text-lg uppercase">{product?.name}</h3>
        <p className="text-blue-600 font-bold">{formatPrice(product?.price)}</p>
        <p>{product?.color}</p>
      </Link>

      <button
        onClick={() => {
          addToCart(product);
          toast.success("product added to cart");
        }}
        className="mt-4 w-full bg-indigo-600 cursor-pointer text-white py-2 rounded-md hover:bg-indigo-800 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
