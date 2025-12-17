// src/pages/ShoemakerProfile.jsx
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCartContext } from "../hooks/useCartContext";
import SpinnerMini from "../components/SpinnerMini";
import { supabase } from "../services/supabaseClients";
import { capitalize, formatPrice } from "../utility/utility";
import toast from "react-hot-toast";

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
  const { id } = useParams();
  console.log(id);

  const { addToCart } = useCartContext();

  const [shoemaker, setShoemaker] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchSellerProfile = async () => {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
      console.log(data);

      if (error) console.log(error);

      if (data) setData(data);

      const { data: footwears } = await supabase
        .from("Footwear")
        .select("*")
        .eq("uid", data?.uid);
      console.log(footwears);

      if (error) console.log(error);

      if (footwears) setShoemaker(footwears);
    };

    fetchSellerProfile();
  }, []);

  if (!shoemaker)
    return (
      <div className="flex items-center h-screen">
        <SpinnerMini />
      </div>
    );
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* HEADER */}
      <div className="flex gap-6 items-center">
        <img
          src={data.image}
          className="w-40 h-40 rounded-xl object-cover shadow-md"
        />
        <div>
          <h1 className="text-3xl font-serif text-[#03022a]">
            {capitalize(data.businessName)}
          </h1>
          <p className="text-gray-700">{capitalize(data.storeAddress)}</p>

          <p className="text-md text-gray-900 mt-2">{data.phone}</p>
          <p className="font-light  leading-relaxed">{data.bio}</p>

          {/* <p className="mt-1 text-sm text-gray-600">
            {shoemaker.followers} followers
          </p> */}
        </div>
      </div>

      {/* BIO SECTION */}
      {/* <div className="mt-6 bg-[#03022a] p-4 rounded-xl border border-[#C49A6C]">
        <p className="font-light text-[#fff] leading-relaxed">{data.bio}</p>
      </div> */}

      {/* SPECIALTIES */}
      {/* <div className="mt-6">
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
      </div> */}

      {/* MATERIALS */}
      {/* <div className="mt-6">
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
      </div> */}

      {/* STYLES */}
      {/* <div className="mt-6">
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
      </div> */}

      {/* VIEW PRODUCTS */}
      <button className="mt-8 bg-[#03022a] text-white py-3 px-6 rounded-xl w-full font-medium">
        View Products by {capitalize(data.businessName)}
      </button>

      {/* PRODUCTS GRID */}
      <>
        {shoemaker?.length === 0 && (
          <p className="text-center mt-16 text-2xl">
            This Store currently have a product for sell
          </p>
        )}

        <div className="grid grid-cols-2 bg-red-600 md:grid-cols-4 gap-5 mt-16">
          {shoemaker &&
            shoemaker?.map((p, i) => (
              <div
                key={i}
                className=" bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition"
              >
                <Link to={`/productdetails/${p.id}`}>
                  <img
                    src={p?.image}
                    alt={p?.name}
                    className="w-full h-36 object-cover"
                  />
                </Link>

                <div className="p-2">
                  <p className="font-medium text-sm uppercase">{p?.name}</p>
                  <p className="font-bold text-indigo-600 text-sm">
                    {formatPrice(p?.price)}
                  </p>

                  <button
                    onClick={() => {
                      console.log("red");

                      addToCart(p);
                      toast.success("product added to cart");
                    }}
                    className="mt-2 w-full bg-indigo-600 cursor-pointer text-white text-sm px-3 py-1 rounded hover:bg-indigo-800"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </>
    </div>
  );
}
