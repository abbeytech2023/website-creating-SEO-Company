import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header (simple logo centered) */}
      {/* <header className="bg-white py-6 shadow-sm flex justify-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-wide">
          Shoe<span className="text-indigo-600">&</span>Slipper
        </h1>
      </header> */}

      {/* Hero Section */}
      <section
        className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative text-center text-white px-6">
          <h2 className="text-5xl font-bold mb-4">Find Your Perfect Fit</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Step into confidence with our stylish range of shoes and slippers.
            Designed for comfort, made for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shoemakers"
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full font-semibold text-white transition"
            >
              Shoes-Makers
            </Link>
            {/* <Link
              to="/slippers"
              className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition"
            >
              Slippers
            </Link> */}
            <Link
              to="/akube-stores"
              className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition"
            >
              Akube-Sellers
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-16 px-6 bg-white text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">
          Why Shop With Us?
        </h3>
        <p className="text-gray-500 max-w-xl mx-auto mb-10">
          Experience the perfect blend of comfort, style, and affordability.
          Every pair is crafted to make you look and feel your best.
        </p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg mb-2">Premium Quality</h4>
            <p className="text-gray-500">
              We handpick top brands and materials to ensure lasting durability.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg mb-2">Fast Delivery</h4>
            <p className="text-gray-500">
              Nationwide delivery straight to your doorstep in record time.
            </p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
            <h4 className="font-semibold text-lg mb-2">Affordable Prices</h4>
            <p className="text-gray-500">
              Enjoy top-quality footwear at pocket-friendly prices.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="py-16 bg-gray-100 px-6">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
           Shoes Banner
          <Link
            to="/shoes"
            className="relative rounded-2xl overflow-hidden group shadow-md"
          >
            <img
              src="/images/shoe-banner.jpg"
              alt="Shoes"
              className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white group-hover:text-indigo-400 transition">
                Explore Shoes
              </h3>
            </div>
          </Link>

          <Link
            to="/slippers"
            className="relative rounded-2xl overflow-hidden group shadow-md"
          >
            <img
              src="/images/slipper-banner.jpg"
              alt="Slippers"
              className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white group-hover:text-indigo-400 transition">
                Explore Slippers
              </h3>
            </div>
          </Link>

          <Link
            to="/akube"
            className="relative rounded-2xl overflow-hidden group shadow-md"
          >
            <img
              src="/images/slipper-banner.jpg"
              alt="Slippers"
              className="h-72 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-3xl font-bold text-white group-hover:text-indigo-400 transition">
                Explore Akube
              </h3>
            </div>
          </Link>
        </div>
      </section>  */}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-4 mt-auto">
        <p>© 2025 Shoe&Slipper. Designed with ❤️ for every step.</p>
      </footer>
    </div>
  );
}
