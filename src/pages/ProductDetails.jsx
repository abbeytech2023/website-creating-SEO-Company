import { useEffect, useState } from "react";
import SpinnerMini from "../components/SpinnerMini";
import { supabase } from "../services/supabaseClients";
import { useParams } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import toast from "react-hot-toast";
import { capitalize, formatPrice } from "../utility/utility";

export default function ProductDetails() {
  const { addToCart } = useCartContext();

  const [product, setProducts] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchShoeDetails = async () => {
      const { data, error } = await supabase
        .from("Footwear")
        .select("*")
        .eq("id", id)
        .single();

      if (error) console.log(error);

      if (data) setProducts(data);
    };
    fetchShoeDetails();
  }, []);

  // const [quantity, setQuantity] = useState(1);
  // const [selectedSize, setSelectedSize] = useState(null);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <>
      {!product && (
        <div className="h-screen flex items-center">
          <SpinnerMini />
        </div>
      )}
      {product && (
        <div className="min-h-screen  bg-white text-black flex flex-col items-center p-6">
          {/* IMAGE */}
          <img
            src={product.image}
            alt={product.name}
            className="w-80 h-80 object-cover rounded-xl shadow-lg"
          />

          {/* INFO */}
          <div className="mt-6 w-full max-w-md">
            <h1 className="text-2xl font-bold uppercase">{product.name}</h1>
            <p className="text-sm mt-5 text-black">
              Store: {capitalize(product.store)}
            </p>
            <p className="text-xl mt-2 text-indigo-700 font-semibold">
              {formatPrice(product.price)}
            </p>

            {/* SIZE SELECTOR */}
            <div className="mt-4">
              <p className="mb-2 text-gray-700">Select size:</p>
              <div className="flex gap-2 flex-wrap">
                <button>{product.size}</button>
              </div>
            </div>

            {/* QUANTITY SELECTOR */}
            {/* <div className="mt-6 flex items-center gap-4">
              <p className="text-gray-700">Quantity:</p>
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">
                <button onClick={decrease} className="text-xl font-bold">
                  −
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button onClick={increase} className="text-xl font-bold">
                  +
                </button>
              </div>
            </div> */}

            {/* DESCRIPTION */}
            <p className="mt-6 text-gray-600 leading-relaxed">
              {capitalize(product.description)}
            </p>

            {/* BUTTON */}
            <button
              onClick={() => {
                addToCart(product);
                toast.success("product added to cart");
              }}
              className="w-full mt-8 bg-indigo-600 text-white font-bold py-3 rounded-xl text-lg hover:opacity-90 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
}
