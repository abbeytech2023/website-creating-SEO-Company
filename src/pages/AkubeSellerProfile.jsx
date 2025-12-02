import React from "react";

const seller = {
  name: "Abdul Vintage Collection",
  location: "Tejuosho Market, Lagos",
  rating: 4.8,
  reviews: 227,
  avatar: "https://images.unsplash.com/photo-1596558450269-9e3f605ec76e",
  description:
    "Premium fairly used foreign footwear collection. Specializing in Air Force, Jordans, Italian leather, and rare releases.",
  products: [
    {
      name: "Nike Air Force 1 — UK Used",
      price: "₦13,500",
      image: "https://images.unsplash.com/photo-1593032457868-6f6a27fb8c03",
    },
    {
      name: "Italian Leather Loafers",
      price: "₦22,000",
      image: "https://images.unsplash.com/photo-1588361861054-0e8ee2639bcf",
    },
    {
      name: "Timberland Boot — Grade A",
      price: "₦19,500",
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4",
    },
    {
      name: "Retro Jordan 4",
      price: "₦25,000",
      image: "https://images.unsplash.com/photo-1534126511673-b6899657816a",
    },
  ],
};

export default function AkubeSellerProfile() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* HEADER */}
      <div className="flex items-center gap-6 mb-8">
        <img
          src={seller.avatar}
          alt={seller.name}
          className="w-28 h-28 object-cover rounded-xl shadow"
        />

        <div>
          <h1 className="text-2xl font-bold text-gray-800">{seller.name}</h1>
          <p className="text-gray-500">{seller.location}</p>
          <div className="text-yellow-500 font-semibold mt-1">
            ⭐ {seller.rating}{" "}
            <span className="text-gray-400">({seller.reviews} reviews)</span>
          </div>
        </div>
      </div>

      {/* BIO */}
      <p className="text-gray-700 leading-relaxed mb-6">{seller.description}</p>

      {/* SECTION TITLE */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Available Footwear
      </h2>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {seller.products.map((p, i) => (
          <div
            key={i}
            className="border bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition"
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-36 object-cover"
            />

            <div className="p-2">
              <p className="font-medium text-sm">{p.name}</p>
              <p className="font-bold text-indigo-600 text-sm">{p.price}</p>

              <button className="mt-2 w-full bg-indigo-600 text-white text-sm px-3 py-1 rounded hover:bg-indigo-800">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
