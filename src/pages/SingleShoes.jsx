import { useState } from "react";

export default function ProductDetail() {
  const product = {
    id: 1,
    name: "Deluxe Premium Sneaker",
    store: "GoldenFoot Store",
    price: 45000,
    description:
      "High-quality handcrafted sneaker made with durable materials and designed for comfort.",
    sizes: ["39", "40", "41", "42", "43", "44"],
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHx8MHx8fDA%3D",
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      {/* IMAGE */}
      <img
        src={product.image}
        alt={product.name}
        className="w-80 h-80 object-cover rounded-xl shadow-lg"
      />

      {/* INFO */}
      <div className="mt-6 w-full max-w-md">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-sm text-gray-400">Store: {product.store}</p>
        <p className="text-xl mt-2 text-yellow-400">
          ₦{product.price.toLocaleString()}
        </p>

        {/* SIZE SELECTOR */}
        <div className="mt-4">
          <p className="mb-2 text-gray-300">Select size:</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSize(s)}
                className={`px-4 py-2 rounded-lg border ${
                  selectedSize === s
                    ? "bg-yellow-400 text-black border-yellow-400"
                    : "border-gray-600"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* QUANTITY SELECTOR */}
        <div className="mt-6 flex items-center gap-4">
          <p className="text-gray-300">Quantity:</p>
          <div className="flex items-center gap-3 bg-gray-900 px-4 py-2 rounded-lg border border-gray-700">
            <button onClick={decrease} className="text-xl">
              −
            </button>
            <span className="text-lg">{quantity}</span>
            <button onClick={increase} className="text-xl">
              +
            </button>
          </div>
        </div>

        {/* DESCRIPTION */}
        <p className="mt-6 text-gray-400 leading-relaxed">
          {product.description}
        </p>

        {/* BUTTON */}
        <button className="w-full mt-8 bg-yellow-400 text-black font-bold py-3 rounded-xl text-lg hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
