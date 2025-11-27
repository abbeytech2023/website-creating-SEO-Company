// src/components/ShoemakersDirectory.jsx
import React from "react";
import { Link } from "react-router-dom";

const shoemakers = [
  {
    id: 1,
    name: "Adewale FootCraft",
    location: "Lagos, Nigeria",
    rating: 4.8,
    products: 122,
    avatar:
      "https://unsplash.com/photos/shoes-hang-on-a-wall-at-a-market-wQ_GYXEfoyY",
  },
  {
    id: 2,
    name: "Heritage Leatherworks",
    location: "Abuja, Nigeria",
    rating: 4.6,
    products: 98,
    avatar:
      "https://images.unsplash.com/photo-1645862327209-1ea4220f9b05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZSUyMHN0b3JlJTIwYWZyaWNhfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    name: "Ben & Sons Shoemaking",
    location: "Ibadan, Nigeria",
    rating: 4.9,
    products: 144,
    avatar:
      "https://plus.unsplash.com/premium_photo-1699555730185-06ae7d1e0b4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hvZSUyMHN0b3JlJTIwYWZyaWNhfGVufDB8fDB8fHww",
  },
  {
    id: 4,
    name: "RoyalStep Creations",
    location: "Kano, Nigeria",
    rating: 4.7,
    products: 77,
    avatar: "/images/creators/royalstep.jpg",
  },
  {
    id: 5,
    name: "Crafted Sole Studio",
    location: "Port Harcourt, Nigeria",
    rating: 4.5,
    products: 83,
    avatar:
      "https://plus.unsplash.com/premium_photo-1699555730185-06ae7d1e0b4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2hvZSUyMHN0b3JlJTIwYWZyaWNhfGVufDB8fDB8fHww",
  },
  {
    id: 6,
    name: "Lagos Leather Guild",
    location: "Lagos, Nigeria",
    rating: 4.9,
    products: 200,
    avatar:
      "https://unsplash.com/photos/shoes-hang-on-a-wall-at-a-market-wQ_GYXEfoyY",
  },
  {
    id: 7,
    name: "UrbanWalk Footwear",
    location: "Abuja, Nigeria",
    rating: 4.4,
    products: 61,
    avatar:
      "https://images.unsplash.com/photo-1645862327209-1ea4220f9b05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZSUyMHN0b3JlJTIwYWZyaWNhfGVufDB8fDB8fHww",
  },
  {
    id: 8,
    name: "MasterCobbler Studio",
    location: "Benin, Nigeria",
    rating: 4.8,
    products: 112,
    avatar: "/images/creators/mastercobbler.jpg",
  },
  {
    id: 9,
    name: "Soul & Sole Designs",
    location: "Enugu, Nigeria",
    rating: 4.6,
    products: 95,
    avatar: "/images/creators/soulandsole.jpg",
  },
  {
    id: 10,
    name: "ClassicHand ShoeWorks",
    location: "Akure, Nigeria",
    rating: 4.7,
    products: 101,
    avatar:
      "https://images.unsplash.com/photo-1645862327209-1ea4220f9b05?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2hvZSUyMHN0b3JlJTIwYWZyaWNhfGVufDB8fDB8fHww",
  },
];

export default function ShoemakersDirectory() {
  return (
    <>
      <h1 className="text-3xl md:text-5xl text-center mt-7 font-extrabold text-[#0B0B0B] tracking-tight">
        <span className=" px-3 py-1  inline-block">SHOE MAKERS</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {shoemakers.map((maker) => (
          <div
            key={maker.id}
            className="border rounded-xl bg-white shadow-sm p-4 hover:shadow-lg transition"
          >
            <img
              src={maker.avatar}
              alt={maker.name}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h2 className="font-semibold text-xl">{maker.name}</h2>
            <p className="text-gray-600">{maker.location}</p>
            <p className="text-gray-800 font-medium mt-2">
              ⭐ {maker.rating} / 5.0
            </p>
            <p className="text-gray-700 mb-4 text-sm">
              {maker.products} products
            </p>

            <Link
              to="/shoe-maker-profile"
              className="mt-4 bg-black text-white py-2 px-4 rounded-lg w-full"
            >
              View Shop →
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
