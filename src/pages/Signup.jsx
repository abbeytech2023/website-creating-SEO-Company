// import React, { useState } from "react";

// export default function Signup() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     category: "",
//     phone: "",
//     location: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Signup submitted:", formData);
//   };

//   return (
//     <div className="min-h-screen flex bg-black">
//       {/* LEFT PANEL */}
//       <div className="hidden md:flex flex-col  justify-center w-1/2 px-16 bg-black border-r border-white/10 ">
//         <h1 className="text-4xl font-bold text-white tracking-wide">
//           ShoeMarketHub
//         </h1>

//         <p className="mt-4 text-white/60 text-lg">
//           The marketplace for shoemakers & Akube sellers. Showcase. Sell. Gain
//           customers.
//         </p>
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="flex justify-center items-center w-full md:w-1/2 px-8 py-14">
//         <div className="bg-[#111] max-w-md w-full p-8 rounded-xl shadow-2xl border border-white/10">
//           <h2 className="text-2xl font-semibold text-white mb-6 text-center">
//             Create Your Account
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-white/70">
//                 Full name / Store name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black text-white focus:ring-2 focus:ring-white/20 outline-none"
//                 placeholder="Abdul Vintage Collection"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white/70">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black text-white focus:ring-2 focus:ring-white/20 outline-none"
//                 placeholder="you@example.com"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white/70">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black text-white focus:ring-2 focus:ring-white/20 outline-none"
//                 placeholder="Enter password"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white/70">
//                 Business category
//               </label>
//               <select
//                 name="category"
//                 required
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black text-white focus:ring-2 focus:ring-white/20 outline-none"
//               >
//                 <option value="">Choose one</option>
//                 <option value="akube">Akube seller</option>
//                 <option value="shoemaker">Shoemaker</option>
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white/70">
//                 Phone number (WhatsApp)
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 required
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black text-white focus:ring-2 focus:ring-white/20 outline-none"
//                 placeholder="+234..."
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-white/70">
//                 Store location
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 required
//                 value={formData.location}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-white/10 bg-black text-white focus:ring-2 focus:ring-white/20 outline-none"
//                 placeholder="Tejuosho Market, Lagos"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:opacity-90 transition tracking-wide"
//             >
//               Sign Up
//             </button>
//           </form>

//           <p className="text-sm text-center text-white/50 mt-4">
//             Already a member?
//             <span className="text-white font-medium ml-1 cursor-pointer hover:underline">
//               Log in
//             </span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
    phone: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted:", formData);
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* LEFT PANEL WITH IMAGE */}
      <div
        className="hidden md:flex flex-col justify-center w-1/2 px-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/2175079600/photo/different-female-shoes-abstract-arrangement-on-beige-carpet-flooring-fashion-shopping.webp?a=1&b=1&s=612x612&w=0&k=20&c=NAwagDCirr8DpSAvkkyaCm4-BcwD_8Y_ZZ4peegOJNU=')",
        }}
      >
        <div className="bg-black/60 p-8 rounded-xl">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            ShoeMarketHub
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            The marketplace for shoemakers & Akube sellers. Showcase. Sell. Gain
            customers.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL WITH FORM & SUBTLE BACKGROUND IMAGE */}
      <div
        className="flex justify-center items-center w-full md:w-1/2 px-8 py-14 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606813904090-62d0b54d55a7?auto=format&fit=crop&w=1000&q=80')",
        }}
      >
        <div className="bg-black/80 max-w-md w-full p-8 rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-white/70">
                Full name / Store name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white focus:ring-2 focus:ring-white/30 outline-none"
                placeholder="Abdul Vintage Collection"
              />
            </div>

            {/* Email */}
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

            {/* Password */}
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

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-white/70">
                Business category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white focus:ring-2 focus:ring-white/30 outline-none"
              >
                <option value="">Choose one</option>
                <option value="akube">Akube seller</option>
                <option value="shoemaker">Shoemaker</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-white/70">
                Phone number (WhatsApp)
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white focus:ring-2 focus:ring-white/30 outline-none"
                placeholder="+234..."
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-white/70">
                Store location
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white focus:ring-2 focus:ring-white/30 outline-none"
                placeholder="Tejuosho Market, Lagos"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:opacity-90 transition tracking-wide"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center text-white/50 mt-4">
            Already a member?
            <Link
              to="/login"
              className="text-white font-medium ml-1 cursor-pointer hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
