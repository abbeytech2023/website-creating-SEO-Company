import React from "react";

export default function BeautifulBusinessLanding() {
  return (
    <section className="relative bg-gray-900 text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80"
          alt="Business background"
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-gray-900/90"></div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32">
        {/* Hero Content */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
            Give Your Business the <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">
              Visibility It Deserves 🚀
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10">
            We build powerful websites and optimize your online presence to
            attract customers, grow your brand, and boost sales. It’s time to
            stand out.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:bg-yellow-300 transition transform hover:scale-105">
              Get Started Today
            </button>
            {/* <button className="border border-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-gray-900 transition transform hover:scale-105">
              Watch Demo
            </button> */}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-28 grid gap-10 md:grid-cols-3">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-4">🌐 Custom Websites</h3>
            <p className="text-gray-200">
              Stunning, mobile-friendly websites designed to represent your
              brand and capture attention from the very first click.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-4">📈 SEO & Marketing</h3>
            <p className="text-gray-200">
              Get ranked on Google, boost visibility, and drive organic traffic
              with cutting-edge SEO strategies tailored for your business.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <h3 className="text-2xl font-bold mb-4">💡 Growth Support</h3>
            <p className="text-gray-200">
              Our experts provide continuous support and growth strategies to
              ensure your business keeps scaling online.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
