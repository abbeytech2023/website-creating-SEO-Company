import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

import { ShoppingCart } from "lucide-react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCartContext } from "../hooks/useCartContext";
import useLogout from "../hooks/useLogout";

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCartContext();

  return (
    <header className="bg-white shadow-md sticky top-0 left-0 w-full z-50">
      <div className="max-w-7xl  mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black tracking-wide text-center md:text-left">
            ShoeMarketHub
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600 ">
            Home
          </Link>
          {user && (
            <Link to="/dashboard" className="block hover:text-blue-600">
              Dashboard
            </Link>
          )}

          <Link to="/shop" className="hover:text-blue-600">
            Shop
          </Link>
          <Link to="/cart" className="hover:text-blue-600 flex items-center">
            <ShoppingCart className="h-5 w-5 mr-1" />
            Cart
            {cart.length > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          {!user && (
            <Link to="/signup" className="hover:text-blue-600">
              Signup
            </Link>
          )}
          {!user && (
            <Link to="/login" className="hover:text-blue-600">
              Login
            </Link>
          )}
          {user && (
            <button
              onClick={logout}
              className="hover:text-blue-600 cursor-pointer"
            >
              Logout
            </button>
          )}
        </nav>

        {/* Mobile Menu Button */}

        {!isOpen && (
          <button
            className="md:hidden flex flex-col space-y-1"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
            <span className="w-6 h-0.5 bg-gray-800"></span>
          </button>
        )}
        {isOpen && (
          <button
            className="font-medium text-gray-700 text-2xl"
            onClick={() => setIsOpen(false)}
          >
            <IoCloseOutline />
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 px-6 py-4 space-y-4 font-medium text-gray-700">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block hover:text-indigo-600"
          >
            Home
          </Link>
          {user && (
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="block hover:text-indigo-600"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/shop"
            onClick={() => setIsOpen(false)}
            className="block hover:text-indigo-600"
          >
            Shop
          </Link>
          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="block  items-center hover:text-indigo-600"
          >
            <ShoppingCart className="h-5 w-5 mr-1" />
            Cart
            {cart.length > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
          {!user && (
            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block hover:text-blue-600 items-center"
            >
              Signup
            </Link>
          )}
          {!user && (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block hover:text-blue-600 items-center"
            >
              Login
            </Link>
          )}
          {user && (
            <button
              onClick={logout}
              className="hover:text-blue-600 cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
