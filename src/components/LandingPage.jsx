// import React from "react";

// export default function BeautifulBusinessLanding() {
//   return (
//     <section className="relative bg-gray-900 text-white">
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
//           alt="Business background"
//           className="w-full h-full object-cover opacity-40"
//         />
//       </div>

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-gray-900/90"></div>

//       <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32">
//         {/* Hero Content */}
//         <div className="text-center max-w-3xl mx-auto">
//           <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
//             Give Your Business the <br />
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">
//               Visibility It Deserves 🚀
//             </span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-200 mb-10">
//             We build powerful websites and optimize your online presence to
//             attract customers, grow your brand, and boost sales. It’s time to
//             stand out.
//           </p>
//           <div className="flex flex-wrap justify-center gap-6">
//             <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:bg-yellow-300 transition transform hover:scale-105">
//               Get Started Today
//             </button>
//             {/* <button className="border border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-900 transition transform hover:scale-105">
//               Watch Demo
//             </button> */}
//           </div>
//         </div>

//         {/* Feature Cards */}
//         <div className="mt-28 grid gap-10 md:grid-cols-3">
//           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
//             <h3 className="text-2xl font-bold mb-4">🌐 Custom Websites</h3>
//             <p className="text-gray-200">
//               Stunning, mobile-friendly websites designed to represent your
//               brand and capture attention from the very first click.
//             </p>
//           </div>
//           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
//             <h3 className="text-2xl font-bold mb-4">📈 SEO & Marketing</h3>
//             <p className="text-gray-200">
//               Get ranked on Google, boost visibility, and drive organic traffic
//               with cutting-edge SEO strategies tailored for your business.
//             </p>
//           </div>
//           <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
//             <h3 className="text-2xl font-bold mb-4">💡 Growth Support</h3>
//             <p className="text-gray-200">
//               Our experts provide continuous support and growth strategies to
//               ensure your business keeps scaling online.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { motion } from "framer-motion";

export default function EasyWayElectrical() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 py-28 px-6 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Text */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Welcome to{" "}
              <span className="text-yellow-400 drop-shadow-lg animate-pulse">
                EasyWay
              </span>{" "}
              <br />
              Electrical Engineers ⚡
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              We power homes, businesses, and industries with safe, reliable,
              and innovative electrical solutions. Efficiency and safety are our
              promise.
            </p>
            <div className="flex gap-4">
              <a
                href="#contact"
                className="bg-yellow-500 text-black px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-yellow-400 transition transform hover:scale-105"
              >
                Get a Quote
              </a>
              <a
                href="#services"
                className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-400 transition transform hover:scale-105"
              >
                Explore Services
              </a>
            </div>
          </div>

          {/* Image */}
          <div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1678766821881-9d6899c22e58?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Electrical Engineer"
              className="w-80 md:w-96 drop-shadow-2xl"
            />
          </div>
        </div>

        {/* Glow Effect Background */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent blur-3xl"></div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-24 px-6 md:px-16 bg-gray-800 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Our <span className="text-yellow-400">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            At EasyWay, we bring electrical engineering to life with modern
            solutions that keep your power systems running strong.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Service 1 */}
          <div
            // whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-gray-700 rounded-2xl p-8 shadow-xl cursor-pointer hover:shadow-yellow-500/40 transition"
          >
            <img
              src="https://img.icons8.com/fluency/96/electrical.png"
              alt="Residential"
              className="mb-6 mx-auto"
            />
            <h3 className="text-2xl font-semibold mb-3">Residential Wiring</h3>
            <p className="text-gray-300">
              Safe, efficient, and modern installations for homes — built to
              last.
            </p>
          </div>

          {/* Service 2 */}
          <div
            whileHover={{ scale: 1.05, rotate: -1 }}
            className="bg-gray-700 rounded-2xl p-8 shadow-xl cursor-pointer hover:shadow-blue-500/40 transition"
          >
            <img
              src="https://img.icons8.com/fluency/96/industrial.png"
              alt="Industrial"
              className="mb-6 mx-auto"
            />
            <h3 className="text-2xl font-semibold mb-3">Industrial Systems</h3>
            <p className="text-gray-300">
              Powering industries with robust electrical infrastructures
              designed for reliability.
            </p>
          </div>

          {/* Service 3 */}
          <div
            whileHover={{ scale: 1.05, rotate: 1 }}
            className="bg-gray-700 rounded-2xl p-8 shadow-xl cursor-pointer hover:shadow-yellow-400/40 transition"
          >
            <img
              src="https://img.icons8.com/fluency/96/maintenance.png"
              alt="Maintenance"
              className="mb-6 mx-auto"
            />
            <h3 className="text-2xl font-semibold mb-3">
              Maintenance & Repair
            </h3>
            <p className="text-gray-300">
              Quick troubleshooting and repairs to keep systems safe and
              efficient.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        id="contact"
        className="py-20 px-6 md:px-16 bg-gradient-to-r from-yellow-500 to-blue-500 text-black text-center"
      >
        <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
          Let's Power Your Vision ⚡
        </h2>
        <p className="max-w-2xl mx-auto mb-8">
          EasyWay Electrical Engineers are ready to bring reliable power to your
          home, business, or industry.
        </p>
        <a
          href="mailto:info@easywayelectrical.com"
          className="bg-black text-yellow-400 px-8 py-4 rounded-xl font-semibold shadow-lg hover:bg-gray-800 transition transform hover:scale-105"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
