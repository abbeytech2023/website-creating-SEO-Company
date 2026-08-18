// import React from "react";
// import { Link } from "react-router-dom";
// import { useAuthContext } from "../hooks/useAuthContext";

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">
//       {/* Header (simple logo centered) */}

//       {/* Hero Section */}
//       <section
//         className="relative w-full h-[70vh] flex items-center justify-center bg-cover bg-center"
//         style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
//       >
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//         <div className="relative text-center text-white px-6">
//           <h2 className="text-5xl font-bold mb-4">Find Your Perfect Fit</h2>
//           <p className="text-lg mb-8 max-w-2xl mx-auto">
//             Step into confidence with our stylish range of shoes and slippers.
//             Designed for comfort, made for you.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Link
//               to="/shoemakers"
//               className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 rounded-full font-semibold text-white transition"
//             >
//               Shoes-Makers
//             </Link>

//             <Link
//               to="/akube-stores"
//               className="bg-white text-indigo-700 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition"
//             >
//               Akube-Sellers
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Featured Section */}
//       <section className="py-16 px-6 bg-white text-center">
//         <h3 className="text-3xl font-bold text-gray-800 mb-4">
//           Why Shop With Us?
//         </h3>
//         <p className="text-gray-500 max-w-xl mx-auto mb-10">
//           Experience the perfect blend of comfort, style, and affordability.
//           Every pair is crafted to make you look and feel your best.
//         </p>
//         <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//           <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
//             <h4 className="font-semibold text-lg mb-2">Premium Quality</h4>
//             <p className="text-gray-500">
//               We handpick top brands and materials to ensure lasting durability.
//             </p>
//           </div>
//           <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
//             <h4 className="font-semibold text-lg mb-2">Fast Delivery</h4>
//             <p className="text-gray-500">
//               Nationwide delivery straight to your doorstep in record time.
//             </p>
//           </div>
//           <div className="bg-gray-100 rounded-xl p-6 shadow hover:shadow-lg transition">
//             <h4 className="font-semibold text-lg mb-2">Affordable Prices</h4>
//             <p className="text-gray-500">
//               Enjoy top-quality footwear at pocket-friendly prices.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-900 text-gray-300 text-center py-4 mt-auto">
//         <p>© 2025 Shoe&Slipper. Designed with ❤️ for every step.</p>
//       </footer>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  FaArrowRight,
  FaBaby,
  FaBars,
  FaCheckCircle,
  FaClock,
  FaFlask,
  FaHeartbeat,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaStethoscope,
  FaTimes,
  FaUserMd,
  FaWhatsapp,
} from "react-icons/fa";

const hospital = {
  name: "BESH LIFECARE HOSPITAL LTD",
  shortName: "BLCH",
  tagline: "Your Health, Our Care",
  rc: "RC: 1376107",

  address:
    "Off Lantoro Roundabout, Road Beside Tubor Pharmacy, Abeokuta, Ogun State",

  phones: ["09164455400", "09163464467"],

  whatsapp: "2349164455400",

  services: [
    {
      title: "General Practice",
      description:
        "Professional medical consultation and quality healthcare for individuals and families.",
      icon: FaStethoscope,
    },
    {
      title: "Antenatal Care",
      description:
        "Compassionate care and support for expectant mothers throughout pregnancy.",
      icon: FaBaby,
    },
    {
      title: "Laboratory",
      description:
        "Reliable laboratory services to support medical assessment and diagnosis.",
      icon: FaFlask,
    },
  ],
};

export default function HospitalHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hello Besh LifeCare Hospital, I would like to make an enquiry or book an appointment.",
  );

  // const whatsappLink = `https://wa.me/${hospital.whatsapp}?text=${whatsappMessage}`;
  const whatsappLink = "";
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden">
      {/* ================= TOP BAR ================= */}
      <div className="hidden md:block bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <FaClock className="text-emerald-400" />
            <span>24 Hours Resident Doctor</span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${hospital.phones[0]}`}
              className="flex items-center gap-2 hover:text-emerald-400 transition"
            >
              <FaPhoneAlt className="text-emerald-400" />
              {hospital.phones[0]}
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 hover:text-emerald-400 transition"
            >
              <FaWhatsapp className="text-emerald-400" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="h-[76px] flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={closeMenu}
              className="flex items-center gap-3"
            >
              <div className="relative w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-lg shadow-emerald-700/20">
                <FaHeartbeat className="text-2xl" />

                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-white flex items-center justify-center text-[9px] font-black">
                  +
                </span>
              </div>

              <div>
                <h1 className="font-black text-lg leading-none text-slate-950">
                  BESH <span className="text-emerald-700">LIFECARE</span>
                </h1>

                <p className="text-[9px] uppercase tracking-[0.22em] text-slate-400 mt-1">
                  Hospital Ltd
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#home" className="text-sm font-bold text-emerald-700">
                Home
              </a>

              <a
                href="#about"
                className="text-sm font-medium text-slate-500 hover:text-emerald-700 transition"
              >
                About
              </a>

              <a
                href="#services"
                className="text-sm font-medium text-slate-500 hover:text-emerald-700 transition"
              >
                Services
              </a>

              <a
                href="#contact"
                className="text-sm font-medium text-slate-500 hover:text-emerald-700 transition"
              >
                Contact
              </a>
            </nav>

            {/* CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-lg shadow-emerald-700/20 transition"
            >
              <FaWhatsapp />
              Book Appointment
            </a>

            {/* Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="lg:hidden border-t border-slate-100 py-4">
              <nav className="flex flex-col gap-1">
                {[
                  ["Home", "#home"],
                  ["About", "#about"],
                  ["Services", "#services"],
                  ["Contact", "#contact"],
                ].map(([name, link]) => (
                  <a
                    key={name}
                    href={link}
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl hover:bg-emerald-50 hover:text-emerald-700 font-medium"
                  >
                    {name}
                  </a>
                ))}

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 flex justify-center items-center gap-2 bg-emerald-700 text-white px-5 py-3 rounded-xl font-bold"
                >
                  <FaWhatsapp />
                  Book Appointment
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-[#f2fbf8] via-white to-[#eef9f5]"
      >
        {/* Decorative circles */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 w-[450px] h-[450px] rounded-full bg-red-100/30 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[650px] py-16 lg:py-20">
            {/* Hero Content */}
            <div>
              <div className="inline-flex items-center gap-3 bg-white border border-emerald-100 rounded-full px-4 py-2.5 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-ping opacity-60" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-600" />
                </span>

                <span className="text-sm font-bold text-slate-700">
                  24 Hours Resident Doctor
                </span>
              </div>

              <p className="mt-8 text-sm uppercase tracking-[0.18em] font-black text-emerald-700">
                Besh LifeCare Hospital Ltd
              </p>

              <h2 className="mt-4 text-5xl sm:text-6xl lg:text-[68px] font-black tracking-tight leading-[1] text-slate-950">
                Your Health.
                <span className="block text-emerald-700 mt-2">Our Care.</span>
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
                Quality healthcare delivered with compassion, professionalism
                and a commitment to your wellbeing.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-700/20 hover:-translate-y-1 transition"
                >
                  <FaWhatsapp className="text-xl" />
                  Book an Appointment
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition" />
                </a>

                <a
                  href={`tel:${hospital.phones[0]}`}
                  className="inline-flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-emerald-500 px-7 py-4 rounded-2xl font-bold shadow-sm transition"
                >
                  <FaPhoneAlt className="text-emerald-700" />
                  Call Us
                </a>
              </div>

              {/* Location */}
              <div className="mt-8 flex gap-3 items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider font-black text-slate-400">
                    Visit Us
                  </p>

                  <p className="text-sm text-slate-600 leading-6 mt-1 max-w-md">
                    {hospital.address}
                  </p>
                </div>
              </div>

              {/* Trust */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <div className="flex flex-wrap gap-x-6 gap-y-3">
                  {["General Practice", "Antenatal Care", "Laboratory"].map(
                    (item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm font-semibold text-slate-600"
                      >
                        <FaCheckCircle className="text-emerald-600" />
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-28 h-28 border-[15px] border-emerald-100 rounded-full" />

              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-red-100 rounded-full" />

              <div className="relative rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-emerald-950 p-2.5 shadow-2xl">
                <div className="overflow-hidden rounded-[2.1rem] bg-white">
                  {/* Image */}
                  <div className="relative h-[390px]">
                    <img
                      src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85"
                      alt="Medical professional"
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                    {/* Badge */}
                    <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-full shadow-lg">
                      <span className="text-xs font-black text-emerald-700">
                        QUALITY HEALTHCARE
                      </span>
                    </div>

                    {/* Bottom Text */}
                    <div className="absolute bottom-7 left-7 right-7 text-white">
                      <p className="text-xs uppercase tracking-[0.18em] font-bold text-emerald-200">
                        Besh LifeCare Hospital
                      </p>

                      <h3 className="mt-2 text-3xl font-black leading-tight">
                        Caring for you,
                        <br />
                        every step of the way.
                      </h3>
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="grid grid-cols-3 divide-x divide-slate-100">
                    <div className="p-5 text-center">
                      <FaUserMd className="mx-auto text-emerald-600 text-xl" />

                      <p className="text-xs font-black mt-2 text-slate-900">
                        Resident Doctor
                      </p>

                      <p className="text-[10px] text-emerald-600 mt-1">
                        24 Hours
                      </p>
                    </div>

                    <div className="p-5 text-center">
                      <FaHeartbeat className="mx-auto text-emerald-600 text-xl" />

                      <p className="text-xs font-black mt-2 text-slate-900">
                        Patient First
                      </p>

                      <p className="text-[10px] text-slate-400 mt-1">Always</p>
                    </div>

                    <div className="p-5 text-center">
                      <FaStethoscope className="mx-auto text-emerald-600 text-xl" />

                      <p className="text-xs font-black mt-2 text-slate-900">
                        Professional
                      </p>

                      <p className="text-[10px] text-slate-400 mt-1">Care</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating call card */}
              <div className="absolute -left-7 bottom-16 hidden sm:flex bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                  <FaPhoneAlt />
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-black">
                    Call Us
                  </p>

                  <p className="text-sm font-black text-slate-900 mt-1">
                    {hospital.phones[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ABOUT PREVIEW ================= */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] font-black text-emerald-700">
                About Us
              </p>

              <h2 className="mt-3 text-4xl sm:text-5xl font-black text-slate-950 leading-tight">
                Healthcare built around
                <span className="text-emerald-700"> you.</span>
              </h2>

              <p className="mt-6 text-slate-600 leading-8 text-lg">
                Besh LifeCare Hospital is committed to providing quality,
                compassionate and professional healthcare services to
                individuals, mothers and families.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Professional healthcare services",
                  "Compassionate patient care",
                  "24-hour resident doctor",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-600" />
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-emerald-700 text-white p-7 min-h-[190px]">
                <FaUserMd className="text-3xl" />

                <h3 className="mt-8 text-xl font-black">Professional Care</h3>

                <p className="mt-2 text-sm text-emerald-100">
                  Healthcare services delivered with professionalism.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-7 min-h-[190px]">
                <FaHeartbeat className="text-emerald-700 text-3xl" />

                <h3 className="mt-8 text-xl font-black text-slate-950">
                  Patient First
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Your comfort and wellbeing remain our priority.
                </p>
              </div>

              <div className="col-span-2 rounded-3xl bg-slate-950 text-white p-7">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center">
                    <FaClock />
                  </div>

                  <div>
                    <h3 className="font-black text-xl">
                      24 Hours Resident Doctor
                    </h3>

                    <p className="text-sm text-slate-400 mt-1">
                      Healthcare support when you need it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SERVICES ================= */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm uppercase tracking-[0.18em] font-black text-emerald-700">
              Our Services
            </p>

            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-slate-950">
              Quality care for
              <span className="text-emerald-700"> every need.</span>
            </h2>

            <p className="mt-5 text-slate-500 leading-7">
              A range of healthcare services designed to support individuals and
              families.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {hospital.services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition">
                    <Icon className="text-xl" />
                  </div>

                  <h3 className="mt-6 text-xl font-black text-slate-950">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-500 leading-7">
                    {service.description}
                  </p>

                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-black text-emerald-700"
                  >
                    Enquire Now
                    <FaArrowRight className="text-xs" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Small CTA */}
          <div className="text-center mt-10">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-4 rounded-xl font-bold shadow-lg transition"
            >
              View All Services
              <FaArrowRight className="text-sm" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= CONTACT CTA ================= */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-emerald-700 to-emerald-900 px-7 sm:px-12 py-12">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/5" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-black text-emerald-200">
                  Need Medical Care?
                </p>

                <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">
                  We're here when you need us.
                </h2>

                <p className="mt-3 text-emerald-100/80">
                  Contact Besh LifeCare Hospital to make an enquiry or book an
                  appointment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 bg-white text-emerald-800 px-6 py-4 rounded-xl font-black hover:bg-emerald-50 transition"
                >
                  <FaWhatsapp />
                  WhatsApp Us
                </a>

                <a
                  href={`tel:${hospital.phones[0]}`}
                  className="flex items-center justify-center gap-2 bg-emerald-600 border border-emerald-500 text-white px-6 py-4 rounded-xl font-black hover:bg-emerald-500 transition"
                >
                  <FaPhoneAlt />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-700 flex items-center justify-center">
                  <FaHeartbeat />
                </div>

                <div>
                  <h3 className="font-black">BESH LIFECARE</h3>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500">
                    Hospital Ltd
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm text-slate-400 leading-7 max-w-sm">
                {hospital.tagline}. Providing professional and compassionate
                healthcare services for individuals and families.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-black text-lg">Contact Us</h3>

              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <FaMapMarkerAlt className="text-emerald-500 mt-1" />

                  <p className="text-sm text-slate-400 leading-6">
                    {hospital.address}
                  </p>
                </div>

                <div className="flex gap-3">
                  <FaPhoneAlt className="text-emerald-500 mt-1" />

                  <div>
                    {hospital.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="block text-sm text-slate-400 hover:text-white mb-2"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <h3 className="font-black text-lg">Book an Appointment</h3>

              <p className="mt-4 text-sm text-slate-400 leading-6">
                Speak with Besh LifeCare Hospital through WhatsApp for
                appointments and enquiries.
              </p>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-5 bg-emerald-600 hover:bg-emerald-500 px-5 py-3 rounded-xl font-bold text-sm transition"
              >
                <FaWhatsapp />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-500">
            <p>
              © {new Date().getFullYear()} Besh LifeCare Hospital Ltd. All
              rights reserved.
            </p>

            <p>RC: 1376107</p>

            <p>
              Website by{" "}
              <span className="text-emerald-500 font-bold">
                Web Bridge Solutions
              </span>
            </p>
          </div>
        </div>
      </footer>

      {/* ================= FLOATING WHATSAPP ================= */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Besh LifeCare Hospital"
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center text-2xl shadow-2xl hover:scale-110 transition"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
