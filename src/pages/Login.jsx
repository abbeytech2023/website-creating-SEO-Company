import React, { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* LEFT PANEL */}
      <div
        className="hidden md:flex flex-col justify-center w-1/2 px-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580952394213-aa56ad417615?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2VzJTIwYmFja2dyb3VuZCUyMGltYWdlJTIwYmxhY2slMjBtZW58ZW58MHx8MHx8fDA%3D')",
        }}
      >
        <div className="bg-black/60 p-8 rounded-xl">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            ShoeMarketHub
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            Welcome back! Sign in to continue browsing shoemakers & Akube
            sellers.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className="flex justify-center items-center w-full md:w-1/2 px-8 py-14 bg-cover bg-center"
        style={{
          backgroundImage: "url('')",
        }}
      >
        <div className="bg-black/80 max-w-md w-full p-8 rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-white/70">
                Email address
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white focus:ring-2 focus:ring-white/30 outline-none"
                placeholder="you@example.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-white/70">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white focus:ring-2 focus:ring-white/30 outline-none"
                placeholder="Enter password"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:opacity-90 transition tracking-wide"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-white/50 mt-4">
            Don't have an account?
            <span className="text-white font-medium ml-1 cursor-pointer hover:underline">
              Sign Up
            </span>
          </p>

          {/* <p className="text-sm text-center text-white/50 mt-2">
            Forgot your password?
            <span className="text-white font-medium ml-1 cursor-pointer hover:underline">
              Reset
            </span>
          </p> */}
        </div>
      </div>
    </div>
  );
}
