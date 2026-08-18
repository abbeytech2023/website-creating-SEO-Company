import React, { useState } from "react";
import {
  FaArrowRight,
  FaBaby,
  FaBars,
  FaCheck,
  FaCheckCircle,
  FaChevronRight,
  FaClock,
  FaFlask,
  FaHeartbeat,
  FaHome,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaProcedures,
  FaShieldAlt,
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
        "Professional medical consultation and general healthcare services for individuals and families.",
      icon: FaStethoscope,
    },
    {
      title: "Antenatal Care",
      description:
        "Compassionate antenatal care and support for expectant mothers throughout pregnancy.",
      icon: FaBaby,
    },
    {
      title: "Laboratory",
      description:
        "Reliable laboratory services to support accurate medical assessment and diagnosis.",
      icon: FaFlask,
    },
    {
      title: "Diagnostic Scan",
      description:
        "Diagnostic scanning services to support medical evaluation and patient care.",
      icon: FaHeartbeat,
    },
    {
      title: "Surgery",
      description:
        "Professional surgical care and treatment provided by qualified healthcare professionals.",
      icon: FaProcedures,
    },
    {
      title: "Home Care",
      description:
        "Convenient healthcare support delivered in the comfort of your home.",
      icon: FaHome,
    },
  ],
};

export default function HospitalHome() {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    "Hello Besh LifeCare Hospital, I would like to make an enquiry or book an appointment.",
  );

  const whatsappLink = `https://wa.me/${hospital.whatsapp}?text=${whatsappMessage}`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="min-h-screen bg-white text-slate-800 overflow-x-hidden">
      {/* =====================================================
          TOP INFORMATION BAR
      ====================================================== */}
      <div className="hidden lg:block bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-11 flex items-center justify-between text-xs">
            <div className="flex items-center gap-7">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <FaClock className="text-emerald-400" />
                </span>

                <span className="font-medium text-slate-300">
                  24 Hours Resident Doctor
                </span>
              </div>

              <span className="w-px h-4 bg-slate-700" />

              <span className="text-slate-400">
                Compassionate Healthcare • Professional Service
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href={`tel:${hospital.phones[0]}`}
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
              >
                <FaPhoneAlt className="text-emerald-400" />
                {hospital.phones[0]}
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition"
              >
                <FaWhatsapp className="text-emerald-400 text-sm" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="h-[78px] flex items-center justify-between">
            {/* Logo */}
            <a
              href="#home"
              onClick={closeMenu}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-lg shadow-emerald-700/20 group-hover:scale-105 transition">
                  <FaHeartbeat className="text-2xl" />
                </div>

                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-white">
                  <span className="text-[10px] font-black">+</span>
                </div>
              </div>

              <div>
                <h1 className="font-black text-[17px] sm:text-lg tracking-tight leading-none text-slate-950">
                  BESH <span className="text-emerald-700">LIFECARE</span>
                </h1>

                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-400 mt-1.5 font-semibold">
                  Hospital Ltd
                </p>
              </div>
            </a>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {[
                ["Home", "#home", true],
                ["About", "#about"],
                ["Services", "#services"],
                ["Why Choose Us", "#why-us"],
                ["Contact", "#contact"],
              ].map(([title, link, active]) => (
                <a
                  key={title}
                  href={link}
                  className={`relative text-sm font-semibold transition group ${
                    active
                      ? "text-emerald-700"
                      : "text-slate-500 hover:text-emerald-700"
                  }`}
                >
                  {title}

                  <span
                    className={`absolute -bottom-2 left-0 h-0.5 bg-emerald-600 rounded-full transition-all ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              ))}
            </nav>

            {/* CTA */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-700/20 hover:-translate-y-0.5 transition"
            >
              <FaWhatsapp className="text-lg" />
              Book Appointment
            </a>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-11 h-11 rounded-xl bg-slate-100 hover:bg-emerald-50 flex items-center justify-center text-slate-800 transition"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile navigation */}
          {menuOpen && (
            <div className="lg:hidden border-t border-slate-100 py-5">
              <nav className="flex flex-col gap-1">
                {[
                  ["Home", "#home"],
                  ["About", "#about"],
                  ["Services", "#services"],
                  ["Why Choose Us", "#why-us"],
                  ["Contact", "#contact"],
                ].map(([title, link], index) => (
                  <a
                    key={title}
                    href={link}
                    onClick={closeMenu}
                    className={`px-4 py-3.5 rounded-xl font-semibold transition ${
                      index === 0
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {title}
                  </a>
                ))}

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  onClick={closeMenu}
                  className="mt-2 flex items-center justify-center gap-2 bg-emerald-700 text-white px-5 py-3.5 rounded-xl font-bold"
                >
                  <FaWhatsapp />
                  Book Appointment
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-[#f4fbf8] via-white to-[#eef9f5]"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-48 -right-48 w-[650px] h-[650px] rounded-full bg-emerald-200/25 blur-3xl" />

          <div className="absolute -bottom-64 -left-64 w-[650px] h-[650px] rounded-full bg-red-100/20 blur-3xl" />

          <div className="absolute top-40 right-[42%] w-2 h-2 bg-emerald-500 rounded-full" />
          <div className="absolute top-72 right-[30%] w-3 h-3 bg-red-400 rounded-full" />
          <div className="absolute bottom-40 left-[38%] w-2 h-2 bg-emerald-400 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_0.92fr] gap-12 lg:gap-16 items-center min-h-[720px] py-16 lg:py-20">
            {/* Hero text */}
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/90 border border-emerald-100 rounded-full px-4 py-2.5 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-600" />
                </span>

                <span className="text-xs sm:text-sm font-bold text-slate-700">
                  24 Hours Resident Doctor
                </span>
              </div>

              {/* Eyebrow */}
              <div className="mt-8 flex items-center gap-3">
                <span className="w-10 h-[2px] bg-emerald-600 rounded-full" />

                <p className="text-xs sm:text-sm font-black tracking-[0.16em] uppercase text-emerald-700">
                  Besh LifeCare Hospital Ltd
                </p>
              </div>

              {/* Heading */}
              <h2 className="mt-5 text-5xl sm:text-6xl lg:text-[70px] font-black tracking-[-0.045em] leading-[0.98] text-slate-950">
                Your Health.
                <span className="block mt-2 bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent">
                  Our Priority.
                </span>
              </h2>

              <p className="mt-7 text-lg lg:text-xl leading-8 text-slate-600 max-w-xl">
                Quality healthcare delivered with compassion, professionalism
                and a commitment to your wellbeing.
              </p>

              {/* Buttons */}
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 bg-emerald-700 hover:bg-emerald-800 text-white px-7 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-700/20 hover:-translate-y-1 transition-all"
                >
                  <FaWhatsapp className="text-xl" />
                  Book an Appointment
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition" />
                </a>

                <a
                  href={`tel:${hospital.phones[0]}`}
                  className="inline-flex items-center justify-center gap-3 bg-white border border-slate-200 hover:border-emerald-500 text-slate-800 px-7 py-4 rounded-2xl font-bold shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
                >
                  <FaPhoneAlt className="text-emerald-700" />
                  Call Us
                </a>
              </div>

              {/* Location */}
              <div className="mt-9 flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt />
                </div>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Find Us
                  </p>

                  <p className="text-sm text-slate-600 leading-6 mt-1 max-w-md">
                    {hospital.address}.
                  </p>
                </div>
              </div>

              {/* Trust row */}
              <div className="mt-9 pt-7 border-t border-slate-200/80">
                <div className="flex flex-wrap gap-x-7 gap-y-4">
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

            {/* =================================================
                HERO VISUAL
            ================================================== */}
            <div className="relative lg:pl-4">
              {/* Decorative shapes */}
              <div className="absolute -top-10 -right-8 w-32 h-32 border-[18px] border-emerald-100/70 rounded-full" />

              <div className="absolute -bottom-10 -left-8 w-28 h-28 bg-red-100/70 rounded-full" />

              {/* Main image/card */}
              <div className="relative">
                <div className="relative rounded-[2.7rem] bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-950 p-2.5 shadow-[0_30px_80px_-20px_rgba(4,120,87,0.45)]">
                  <div className="overflow-hidden rounded-[2.35rem] bg-white">
                    {/* Image area */}
                    <div className="relative h-[410px] overflow-hidden bg-gradient-to-br from-emerald-100 via-white to-emerald-50">
                      {/* Hospital image */}
                      <img
                        src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1200&q=85"
                        alt="Healthcare professional"
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* Image overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/75 via-emerald-900/10 to-transparent" />

                      {/* Top label */}
                      <div className="absolute top-6 left-6">
                        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 shadow-lg">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span className="text-xs font-black text-slate-700">
                            QUALITY HEALTHCARE
                          </span>
                        </div>
                      </div>

                      {/* Bottom text */}
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <p className="text-xs uppercase tracking-[0.18em] font-bold text-emerald-200">
                          Besh LifeCare Hospital
                        </p>

                        <h3 className="mt-2 text-3xl sm:text-4xl font-black leading-tight">
                          Caring for you,
                          <br />
                          every step of the way.
                        </h3>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 divide-x divide-slate-100">
                      <div className="p-5 text-center">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                          <FaUserMd />
                        </div>

                        <p className="text-xs font-black text-slate-900 mt-3">
                          Resident Doctor
                        </p>

                        <p className="text-[10px] text-emerald-600 font-bold mt-1">
                          24 Hours
                        </p>
                      </div>

                      <div className="p-5 text-center">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                          <FaShieldAlt />
                        </div>

                        <p className="text-xs font-black text-slate-900 mt-3">
                          Professional
                        </p>

                        <p className="text-[10px] text-slate-400 font-bold mt-1">
                          Quality Care
                        </p>
                      </div>

                      <div className="p-5 text-center">
                        <div className="w-10 h-10 mx-auto rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                          <FaHeartbeat />
                        </div>

                        <p className="text-xs font-black text-slate-900 mt-3">
                          Patient First
                        </p>

                        <p className="text-[10px] text-slate-400 font-bold mt-1">
                          Always
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating call card */}
                <div className="absolute -left-8 bottom-16 hidden sm:block">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                      <FaPhoneAlt />
                    </div>

                    <div>
                      <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400 font-black">
                        Call Us
                      </p>

                      <a
                        href={`tel:${hospital.phones[0]}`}
                        className="font-black text-slate-900 text-sm mt-1 block"
                      >
                        {hospital.phones[0]}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Floating appointment card */}
                <div className="absolute -right-5 top-20 hidden sm:block">
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-3 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <FaCheck />
                    </div>

                    <div>
                      <p className="text-xs font-black text-slate-900">
                        Patient-focused care
                      </p>

                      <p className="text-[10px] text-slate-400 mt-1">
                        Professional & compassionate
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom transition */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-white rounded-t-[50%]" />
      </section>

      {/* =====================================================
          QUICK TRUST SECTION
      ====================================================== */}
      <section className="relative bg-white py-8">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: FaClock,
                title: "24 Hours Care",
                text: "Resident doctor available",
              },
              {
                icon: FaUserMd,
                title: "Professional Care",
                text: "Qualified healthcare team",
              },
              {
                icon: FaHeartbeat,
                title: "Patient First",
                text: "Your wellbeing matters",
              },
              {
                icon: FaMapMarkerAlt,
                title: "Convenient Location",
                text: "Abeokuta, Ogun State",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/40 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-white text-emerald-700 flex items-center justify-center shadow-sm">
                    <Icon />
                  </div>

                  <div>
                    <h3 className="font-black text-slate-900 text-sm">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-500 mt-1">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT
      ====================================================== */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="absolute -top-5 -left-5 w-24 h-24 rounded-3xl bg-emerald-100" />

              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=1200&q=85"
                  alt="Medical care"
                  className="w-full h-[500px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5">
                    <p className="text-xs uppercase tracking-[0.18em] font-black text-emerald-600">
                      Besh LifeCare
                    </p>

                    <p className="text-xl font-black text-slate-950 mt-1">
                      Your health is our responsibility.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div>
              <p className="text-sm uppercase tracking-[0.18em] font-black text-emerald-700">
                About Besh LifeCare
              </p>

              <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight">
                Healthcare with
                <span className="text-emerald-700"> compassion.</span>
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-600">
                At Besh LifeCare Hospital Ltd, we are committed to providing
                quality healthcare services in a professional, welcoming and
                patient-focused environment.
              </p>

              <p className="mt-5 text-slate-600 leading-7">
                From general medical care and antenatal services to laboratory,
                diagnostic and home care services, our goal is to make quality
                healthcare accessible and convenient for individuals and
                families.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Patient-focused healthcare",
                  "Professional medical services",
                  "Compassionate approach to care",
                  "Convenient location in Abeokuta",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <FaCheck className="text-xs" />
                    </div>

                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 mt-9 text-emerald-700 font-black hover:gap-4 transition-all"
              >
                Speak with us
                <FaArrowRight className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICES
      ====================================================== */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.18em] font-black text-emerald-700">
              Our Services
            </p>

            <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
              Complete care for
              <span className="text-emerald-700"> your wellbeing.</span>
            </h2>

            <p className="mt-5 text-slate-500 text-lg leading-8">
              Professional healthcare services designed around the needs of
              individuals, mothers and families.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
            {hospital.services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="group relative p-7 rounded-[1.7rem] border border-slate-100 bg-white shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 hover:-translate-y-2 transition-all duration-300 overflow-hidden"
                >
                  {/* Number */}
                  <span className="absolute top-5 right-6 text-5xl font-black text-slate-50 group-hover:text-emerald-50 transition">
                    0{index + 1}
                  </span>

                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-all">
                      <Icon className="text-xl" />
                    </div>

                    <h3 className="mt-6 text-xl font-black text-slate-950">
                      {service.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {service.description}
                    </p>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 mt-6 text-sm font-black text-emerald-700 group-hover:gap-3 transition-all"
                    >
                      Make an enquiry
                      <FaArrowRight className="text-xs" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section id="why-us" className="py-24 bg-emerald-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] font-black text-emerald-300">
                Why Choose Us
              </p>

              <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight leading-tight">
                Healthcare you can feel
                <span className="text-emerald-300"> confident about.</span>
              </h2>

              <p className="mt-6 text-emerald-100/70 text-lg leading-8 max-w-xl">
                We combine professional healthcare services with a compassionate
                approach designed to make every patient feel respected, heard
                and cared for.
              </p>

              <div className="mt-9 grid sm:grid-cols-2 gap-4">
                {[
                  "24-hour resident doctor",
                  "Patient-focused service",
                  "Professional healthcare",
                  "Convenient location",
                  "Wide range of services",
                  "Compassionate care",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
                  >
                    <FaCheckCircle className="text-emerald-400 flex-shrink-0" />

                    <span className="text-sm font-semibold text-emerald-50">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400/10 rounded-[2rem] blur-2xl" />

              <div className="relative bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-sm">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center">
                  <FaHeartbeat className="text-2xl" />
                </div>

                <h3 className="mt-7 text-2xl font-black">
                  Your wellbeing matters to us.
                </h3>

                <p className="mt-4 text-emerald-100/70 leading-7">
                  Whether you need a routine consultation, antenatal care,
                  laboratory services, diagnostic support or home care, our team
                  is here to support you.
                </p>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 mt-8 bg-white text-emerald-900 px-6 py-3.5 rounded-xl font-black hover:bg-emerald-50 transition"
                >
                  Contact Us
                  <FaArrowRight className="text-xs" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT CTA
      ====================================================== */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-emerald-700 to-emerald-900 px-7 sm:px-12 lg:px-16 py-14">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-white/5" />

            <div className="absolute -left-20 -bottom-32 w-80 h-80 rounded-full bg-white/5" />

            <div className="relative grid lg:grid-cols-[1fr_auto] gap-10 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] font-black text-emerald-200">
                  Need Medical Assistance?
                </p>

                <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                  We're here when you need us.
                </h2>

                <p className="mt-4 text-emerald-100/80 max-w-xl leading-7">
                  Contact Besh LifeCare Hospital today to make an enquiry or
                  book an appointment.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-emerald-800 px-6 py-4 rounded-xl font-black hover:bg-emerald-50 transition"
                >
                  <FaWhatsapp />
                  WhatsApp Us
                </a>

                <a
                  href={`tel:${hospital.phones[0]}`}
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white border border-emerald-500 px-6 py-4 rounded-xl font-black hover:bg-emerald-500 transition"
                >
                  <FaPhoneAlt />
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}
      <footer className="bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-700 flex items-center justify-center shadow-lg">
                  <FaHeartbeat className="text-xl" />
                </div>

                <div>
                  <h3 className="font-black text-lg">BESH LIFECARE</h3>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">
                    Hospital Ltd
                  </p>
                </div>
              </div>

              <p className="text-slate-400 leading-7 text-sm mt-6 max-w-sm">
                {hospital.tagline}. Providing compassionate and professional
                healthcare services for individuals and families.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                <FaShieldAlt className="text-emerald-500" />
                <span>{hospital.rc}</span>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-black text-lg">Quick Links</h4>

              <div className="mt-6 space-y-4">
                {[
                  ["Home", "#home"],
                  ["About Us", "#about"],
                  ["Our Services", "#services"],
                  ["Why Choose Us", "#why-us"],
                  ["Contact", "#contact"],
                ].map(([title, link]) => (
                  <a
                    key={title}
                    href={link}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all"
                  >
                    <FaChevronRight className="text-[8px] text-emerald-500" />
                    {title}
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-black text-lg">Our Services</h4>

              <div className="mt-6 space-y-4">
                {hospital.services.map((service) => (
                  <a
                    key={service.title}
                    href="#services"
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all"
                  >
                    <FaChevronRight className="text-[8px] text-emerald-500" />
                    {service.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-black text-lg">Contact Us</h4>

              <div className="mt-6 space-y-6">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-emerald-500" />
                  </div>

                  <p className="text-sm text-slate-400 leading-6">
                    {hospital.address}
                  </p>
                </div>

                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <FaPhoneAlt className="text-emerald-500" />
                  </div>

                  <div className="space-y-2">
                    {hospital.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone}`}
                        className="block text-sm text-slate-400 hover:text-white transition"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <FaWhatsapp />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="border-t border-slate-800 mt-14 pt-7 flex flex-col lg:flex-row justify-between gap-4 text-xs">
            <p className="text-slate-500">
              © {new Date().getFullYear()} Besh LifeCare Hospital Ltd. All
              rights reserved.
            </p>

            <p className="text-slate-500">RC: 1376107</p>

            <p className="text-slate-500">
              Website by{" "}
              <span className="text-emerald-500 font-bold">
                Web Bridge Solutions
              </span>
            </p>
          </div>
        </div>
      </footer>

      {/* =====================================================
          FLOATING WHATSAPP
      ====================================================== */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Besh LifeCare Hospital on WhatsApp"
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center text-2xl shadow-2xl hover:scale-110 transition-all"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
}
