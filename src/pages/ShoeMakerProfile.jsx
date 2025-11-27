// src/pages/ShoemakerProfile.jsx
import React from "react";

const shoemaker = {
  id: 1,
  name: "Adewale FootCraft",
  location: "Lagos, Nigeria",
  rating: 4.8,
  followers: 1280,
  yearsExperience: 12,
  specialties: ["Leather sandals", "Custom fittings", "Hand-stitched loafers"],
  bio: "I craft footwear using traditional Nigerian leatherworking techniques, blending heritage craftsmanship with modern style.",
  avatar: "https://images.unsplash.com/photo-1528701800489-20be3c2a9c59",
  materials: [
    "Full-grain leather",
    "Cowhide",
    "Recycled rubber soles",
    "Hand-dyed threads",
  ],
  styles: ["Contemporary", "Minimalist", "Classic", "Traditional West African"],
};

export default function ShoemakerProfile() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex gap-6 items-center">
        <img
          src={shoemaker.avatar}
          className="w-40 h-40 rounded-xl object-cover shadow-md"
        />
        <div>
          <h1 className="text-3xl font-serif text-[#03022a]">
            {shoemaker.name}
          </h1>
          <p className="text-gray-700">{shoemaker.location}</p>

          <p className="text-md text-gray-900 mt-2">
            ⭐ {shoemaker.rating} | {shoemaker.yearsExperience} yrs experience
          </p>

          <p className="mt-1 text-sm text-gray-600">
            {shoemaker.followers} followers
          </p>
        </div>
      </div>

      {/* BIO SECTION */}
      <div className="mt-6 bg-[#4c6fef] p-4 rounded-xl border border-[#C49A6C]">
        <p className="font-light text-[#fff] leading-relaxed">
          {shoemaker.bio}
        </p>
      </div>

      {/* SPECIALTIES */}
      <div className="mt-6">
        <h2 className="text-xl font-serif mb-2 text-[#03022a]">Specialties</h2>
        <div className="flex flex-wrap gap-2">
          {shoemaker.specialties.map((sp, i) => (
            <span
              key={i}
              className="bg-[#4c6fef] text-white px-3 py-1 rounded-full text-sm"
            >
              {sp}
            </span>
          ))}
        </div>
      </div>

      {/* MATERIALS */}
      <div className="mt-6">
        <h2 className="text-xl font-serif mb-2 text-[#03022a]">Materials</h2>
        <div className="flex flex-wrap gap-2">
          {shoemaker.materials.map((mat, i) => (
            <span
              key={i}
              className="bg-[#03022a] text-white px-3 py-1 rounded-full text-sm"
            >
              {mat}
            </span>
          ))}
        </div>
      </div>

      {/* STYLES */}
      <div className="mt-6">
        <h2 className="text-xl font-serif mb-2 text-[#03022a]">Style Themes</h2>
        <div className="flex flex-wrap gap-2">
          {shoemaker.styles.map((style, i) => (
            <span
              key={i}
              className="bg-[#4c6fef] text-[#fff] px-3 py-1 rounded-full text-sm border border-[#C49A6C]"
            >
              {style}
            </span>
          ))}
        </div>
      </div>

      {/* VIEW PRODUCTS */}
      <button className="mt-8 bg-[#03022a] text-white py-3 px-6 rounded-xl w-full font-medium">
        View Products by {shoemaker.name} →
      </button>
    </div>
  );
}
