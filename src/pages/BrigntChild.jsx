// import React, { useState } from "react";
// import {
//   ArrowRight,
//   BookOpen,
//   CheckCircle2,
//   GraduationCap,
//   Heart,
//   Menu,
//   Users,
//   X,
// } from "lucide-react";

// export default function BrightChildSchool() {
//   const [open, setOpen] = useState(false);

//   return (
//     <main className="min-h-screen bg-[#fffdf7] text-slate-800">
//       {/* ================= NAVBAR ================= */}
//       <header className="sticky top-0 z-50 border-b border-yellow-100 bg-white/95 backdrop-blur">
//         <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
//           {/* Logo */}
//           <a href="#" className="flex items-center gap-3">
//             <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ffb703]">
//               <GraduationCap className="h-6 w-6 text-white" />
//             </div>

//             <div>
//               <h1 className="font-black leading-none text-[#164e63]">
//                 Bright Child
//               </h1>

//               <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-[#fb7185]">
//                 Nursery & Primary School
//               </p>
//             </div>
//           </a>

//           {/* Desktop Navigation */}
//           <nav className="hidden items-center gap-7 md:flex">
//             <a
//               href="#about"
//               className="text-sm font-semibold text-slate-600 transition hover:text-[#fb7185]"
//             >
//               About
//             </a>

//             <a
//               href="#programs"
//               className="text-sm font-semibold text-slate-600 transition hover:text-[#fb7185]"
//             >
//               Programs
//             </a>

//             <a
//               href="#why-us"
//               className="text-sm font-semibold text-slate-600 transition hover:text-[#fb7185]"
//             >
//               Why Choose Us
//             </a>

//             <a
//               href="#contact"
//               className="rounded-full bg-[#fb7185] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#f43f5e]"
//             >
//               Enquire Now
//             </a>
//           </nav>

//           {/* Mobile Menu */}
//           <button
//             onClick={() => setOpen(!open)}
//             className="rounded-xl p-2 text-[#164e63] md:hidden"
//           >
//             {open ? <X /> : <Menu />}
//           </button>
//         </div>

//         {open && (
//           <nav className="border-t border-yellow-100 bg-white px-5 py-5 md:hidden">
//             <div className="flex flex-col gap-5">
//               <a href="#about" onClick={() => setOpen(false)}>
//                 About
//               </a>

//               <a href="#programs" onClick={() => setOpen(false)}>
//                 Programs
//               </a>

//               <a href="#why-us" onClick={() => setOpen(false)}>
//                 Why Choose Us
//               </a>

//               <a href="#contact" onClick={() => setOpen(false)}>
//                 Contact
//               </a>
//             </div>
//           </nav>
//         )}
//       </header>

//       {/* ================= HERO ================= */}
//       <section className="relative overflow-hidden">
//         <div className="mx-auto grid min-h-[650px] max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2">
//           {/* Hero Text */}
//           <div>
//             <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#fff1c2] px-4 py-2 text-sm font-bold text-[#a16207]">
//               <span className="text-lg">⭐</span>
//               Where Little Minds Shine
//             </div>

//             <h2 className="text-5xl font-black leading-[1.05] text-[#164e63] sm:text-6xl">
//               Helping Children
//               <span className="block text-[#fb7185]">Learn & Grow.</span>
//             </h2>

//             <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
//               Welcome to Bright Child Nursery & Primary School — a caring,
//               engaging and inspiring environment where children build strong
//               foundations for a bright future.
//             </p>

//             <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//               <a
//                 href="#contact"
//                 className="inline-flex items-center justify-center gap-2 rounded-full bg-[#fb7185] px-7 py-4 font-black text-white shadow-lg transition hover:bg-[#f43f5e]"
//               >
//                 Admission Enquiry
//                 <ArrowRight className="h-5 w-5" />
//               </a>

//               <a
//                 href="#about"
//                 className="inline-flex items-center justify-center rounded-full border-2 border-[#164e63] px-7 py-4 font-bold text-[#164e63] transition hover:bg-[#164e63] hover:text-white"
//               >
//                 Discover Our School
//               </a>
//             </div>
//           </div>

//           {/* Hero Image */}
//           <div className="relative">
//             {/* Decorative shapes */}
//             <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-[#ffb703]" />

//             <div className="absolute -bottom-5 -right-5 h-28 w-28 rounded-full bg-[#86efac]" />

//             <img
//               src="https://images.pexels.com/photos/34162709/pexels-photo-34162709.jpeg?auto=compress&cs=tinysrgb&w=1600"
//               alt="African school children learning"
//               className="relative h-[470px] w-full rounded-[2.5rem] object-cover shadow-2xl"
//             />

//             {/* Floating Card */}
//             <div className="absolute bottom-6 left-5 rounded-2xl bg-white p-4 shadow-xl">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
//                   <Heart className="h-5 w-5 fill-green-500 text-green-500" />
//                 </div>

//                 <div>
//                   <p className="text-sm font-black text-[#164e63]">
//                     A Caring Environment
//                   </p>

//                   <p className="text-xs text-slate-500">Every child matters</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= ABOUT ================= */}
//       <section id="about" className="bg-[#f0fdf4] px-5 py-20">
//         <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
//           {/* Image */}
//           <div>
//             <img
//               src="https://back.avsi.org/uploads/d0ea3fa3-dc29-4e6f-95fa-1a01511f1a44_large.jpg"
//               alt="African children learning in school"
//               className="h-[420px] w-full rounded-[2rem] object-cover shadow-xl"
//             />
//           </div>

//           {/* Text */}
//           <div>
//             <p className="font-black uppercase tracking-[0.2em] text-[#fb7185]">
//               About Bright Child
//             </p>

//             <h2 className="mt-3 text-4xl font-black leading-tight text-[#164e63]">
//               Building strong foundations for tomorrow.
//             </h2>

//             <p className="mt-5 leading-8 text-slate-600">
//               At Bright Child Nursery & Primary School, we believe that every
//               child deserves a strong beginning.
//             </p>

//             <p className="mt-4 leading-8 text-slate-600">
//               We provide a friendly and supportive learning environment where
//               children can develop academically, socially and emotionally while
//               discovering their unique abilities.
//             </p>

//             {/* Features */}
//             <div className="mt-7 grid gap-3 sm:grid-cols-2">
//               {[
//                 "Quality Education",
//                 "Caring Teachers",
//                 "Safe Environment",
//                 "Child Development",
//               ].map((item) => (
//                 <div key={item} className="flex items-center gap-2">
//                   <CheckCircle2 className="h-5 w-5 text-[#22c55e]" />

//                   <span className="text-sm font-bold text-slate-700">
//                     {item}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ================= PROGRAMS ================= */}
//       <section id="programs" className="px-5 py-20">
//         <div className="mx-auto max-w-6xl">
//           <div className="mx-auto max-w-2xl text-center">
//             <p className="font-black uppercase tracking-[0.2em] text-[#fb7185]">
//               Our Programs
//             </p>

//             <h2 className="mt-3 text-4xl font-black text-[#164e63]">
//               Learning at Every Stage
//             </h2>

//             <p className="mt-4 leading-7 text-slate-600">
//               Age-appropriate learning experiences designed to help every child
//               grow with confidence.
//             </p>
//           </div>

//           {/* Program Cards */}
//           <div className="mt-10 grid gap-6 md:grid-cols-2">
//             {/* Nursery */}
//             <ProgramCard
//               title="Nursery School"
//               description="Fun, creative and engaging learning experiences that help young children develop confidence, curiosity and essential early skills."
//               image="https://mma.prnewswire.com/media/2341416/Africa.jpg?p=twitter"
//               icon="🌈"
//             />

//             {/* Primary */}
//             <ProgramCard
//               title="Primary School"
//               description="Building strong academic foundations while developing creativity, discipline, confidence and independent thinking."
//               image="https://www.unesco.org/sites/default/files/styles/paragraph_medium_desktop/public/2022-08/Technology-enabled%20Open%20Schools%20for%20Al%20seminar-c-UNESCO%20Accra%20Office-George%20Koranteng.jpg.webp"
//               icon="📚"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ================= SCHOOL LIFE ================= */}
//       <section className="bg-[#fff7ed] px-5 py-20">
//         <div className="mx-auto max-w-6xl">
//           <div className="text-center">
//             <p className="font-black uppercase tracking-[0.2em] text-[#fb7185]">
//               School Life
//             </p>

//             <h2 className="mt-3 text-4xl font-black text-[#164e63]">
//               A Happy Place to Learn
//             </h2>

//             <p className="mx-auto mt-4 max-w-2xl text-slate-600">
//               Children learn best when they feel happy, safe and encouraged.
//             </p>
//           </div>

//           {/* Image Gallery */}
//           <div className="mt-10 grid gap-5 md:grid-cols-3">
//             <img
//               src="https://heleverdeniskole.dk/sites/default/files/2023-01/9.%20rahi_skole_moalaa_nordghana_hansbach%20%2842%29.jpg"
//               alt="African school children"
//               className="h-72 w-full rounded-3xl object-cover shadow-md"
//             />

//             <img
//               src="https://images.pexels.com/photos/8422135/pexels-photo-8422135.jpeg?auto=compress&cs=tinysrgb&w=1000"
//               alt="African students learning"
//               className="h-72 w-full rounded-3xl object-cover shadow-md"
//             />

//             <img
//               src="https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=1000"
//               alt="Children in classroom"
//               className="h-72 w-full rounded-3xl object-cover shadow-md"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ================= WHY CHOOSE US ================= */}
//       <section id="why-us" className="bg-[#164e63] px-5 py-20">
//         <div className="mx-auto max-w-6xl">
//           <div className="text-center">
//             <p className="font-black uppercase tracking-[0.2em] text-[#ffb703]">
//               Why Choose Us
//             </p>

//             <h2 className="mt-3 text-4xl font-black text-white">
//               More Than Just a School
//             </h2>
//           </div>

//           <div className="mt-10 grid gap-5 md:grid-cols-3">
//             <Feature
//               icon={<BookOpen />}
//               title="Quality Learning"
//               text="We provide engaging lessons that make learning enjoyable and meaningful."
//             />

//             <Feature
//               icon={<Heart />}
//               title="Caring Teachers"
//               text="Our teachers create a warm environment where children feel valued and supported."
//             />

//             <Feature
//               icon={<Users />}
//               title="Happy Community"
//               text="We encourage friendship, teamwork, confidence and positive social development."
//             />
//           </div>
//         </div>
//       </section>

//       {/* ================= CTA ================= */}
//       <section id="contact" className="px-5 py-20">
//         <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#ffb703] px-6 py-14 text-center">
//           {/* Decorative circles */}
//           <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/20" />

//           <div className="absolute -bottom-12 -right-8 h-40 w-40 rounded-full bg-white/20" />

//           <div className="relative">
//             <p className="font-black uppercase tracking-[0.2em] text-[#164e63]">
//               Admissions
//             </p>

//             <h2 className="mt-3 text-4xl font-black text-[#164e63] sm:text-5xl">
//               Give Your Child a Bright Start.
//             </h2>

//             <p className="mx-auto mt-4 max-w-xl leading-7 text-[#164e63]/80">
//               Discover a nurturing school where your child can learn, grow, make
//               friends and build a strong foundation for the future.
//             </p>

//             <a
//               href="#"
//               className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#fb7185] px-7 py-4 font-black text-white shadow-lg transition hover:bg-[#f43f5e]"
//             >
//               Enquire About Admission
//               <ArrowRight className="h-5 w-5" />
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <footer className="bg-[#164e63] px-5 py-8 text-center text-white">
//         <h3 className="font-black">Bright Child Nursery & Primary School</h3>

//         <p className="mt-2 text-sm text-white/70">Learn • Grow • Shine</p>

//         <div className="mt-5 flex justify-center gap-5 text-sm text-white/60">
//           <a href="#about" className="hover:text-white">
//             About
//           </a>

//           <a href="#programs" className="hover:text-white">
//             Programs
//           </a>

//           <a href="#contact" className="hover:text-white">
//             Contact
//           </a>
//         </div>

//         <p className="mt-5 text-xs text-white/40">
//           © 2026 Bright Child Nursery & Primary School
//         </p>
//       </footer>
//     </main>
//   );
// }

// /* ================= PROGRAM CARD ================= */

// function ProgramCard({ title, description, image, icon }) {
//   return (
//     <div className="overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
//       <img src={image} alt={title} className="h-64 w-full object-cover" />

//       <div className="p-7">
//         <div className="text-3xl">{icon}</div>

//         <h3 className="mt-3 text-2xl font-black text-[#164e63]">{title}</h3>

//         <p className="mt-3 leading-7 text-slate-600">{description}</p>

//         <a
//           href="#contact"
//           className="mt-5 inline-flex items-center gap-2 font-bold text-[#fb7185]"
//         >
//           Learn More
//           <ArrowRight className="h-4 w-4" />
//         </a>
//       </div>
//     </div>
//   );
// }

// /* ================= FEATURE CARD ================= */

// function Feature({ icon, title, text }) {
//   return (
//     <div className="rounded-3xl bg-white/10 p-7">
//       <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ffb703] text-[#164e63]">
//         {icon}
//       </div>

//       <h3 className="mt-5 text-xl font-black text-white">{title}</h3>

//       <p className="mt-3 leading-7 text-white/70">{text}</p>
//     </div>
//   );
// }

import React, { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Menu,
  Phone,
  Users,
  X,
} from "lucide-react";

const schoolImage =
  "https://heleverdeniskole.dk/sites/default/files/2023-01/9.%20rahi_skole_moalaa_nordghana_hansbach%20%2842%29.jpg";

export default function LantoroHighSchool() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fffdf6] text-slate-800">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#eadfba] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          {/* BRAND */}
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#711b35]">
              <GraduationCap className="h-6 w-6 text-[#f5e6a3]" />
            </div>

            <div>
              <h1 className="text-lg font-black leading-none text-[#711b35]">
                Lantoro High School
              </h1>

              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-[#92721b]">
                Oke-Lantoro • Abeokuta
              </p>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-7 md:flex">
            <a
              href="#about"
              className="text-sm font-semibold text-slate-600 hover:text-[#711b35]"
            >
              About
            </a>

            <a
              href="#academics"
              className="text-sm font-semibold text-slate-600 hover:text-[#711b35]"
            >
              Academics
            </a>

            <a
              href="#contact"
              className="rounded-full bg-[#711b35] px-5 py-3 text-sm font-bold text-[#f5e6a3]"
            >
              Contact Us
            </a>
          </nav>

          {/* MOBILE */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#711b35] md:hidden"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-[#eadfba] bg-white px-5 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>

              <a href="#academics" onClick={() => setMenuOpen(false)}>
                Academics
              </a>

              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="bg-[#fff8d9]">
        <div className="mx-auto grid min-h-[600px] max-w-6xl items-center gap-10 px-5 py-14 lg:grid-cols-2">
          {/* HERO TEXT */}
          <div>
            <span className="inline-block rounded-full bg-white px-4 py-2 text-sm font-bold text-[#711b35] shadow-sm">
              Welcome to Lantoro High School
            </span>

            <h2 className="mt-5 text-5xl font-black leading-[1.05] text-[#711b35] sm:text-6xl">
              Inspiring Minds.
              <span className="block text-[#92721b]">Building Futures.</span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              A secondary school committed to academic excellence, character
              development and preparing students for a successful future.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#711b35] px-7 py-4 font-bold text-[#f5e6a3] shadow-lg hover:bg-[#581429]"
              >
                Admission Enquiry
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center justify-center rounded-full border-2 border-[#711b35] px-7 py-4 font-bold text-[#711b35] hover:bg-[#711b35] hover:text-white"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* HERO IMAGE */}
          <div className="relative">
            <div className="absolute -left-4 -top-4 h-20 w-20 rounded-full bg-[#e6cf65]" />

            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-[#711b35]" />

            <img
              src={schoolImage}
              alt="Students in Lantoro High School uniform"
              className="relative h-[440px] w-full rounded-[2rem] object-cover shadow-2xl"
            />

            {/* IMAGE LABEL */}
            <div className="absolute bottom-5 left-5 rounded-xl bg-white px-4 py-3 shadow-lg">
              <p className="text-sm font-black text-[#711b35]">
                Lantoro High School
              </p>

              <p className="text-xs text-slate-500">Oke-Lantoro, Abeokuta</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-5 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-black uppercase tracking-[0.2em] text-[#92721b]">
            About Us
          </p>

          <h2 className="mt-3 text-4xl font-black text-[#711b35]">
            A School for Learning and Growth
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
            Lantoro High School provides students with a supportive learning
            environment where they can develop academically, build confidence
            and grow into responsible members of society.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <SmallFeature icon={<BookOpen />} text="Quality Education" />

            <SmallFeature icon={<Users />} text="Student Development" />

            <SmallFeature icon={<GraduationCap />} text="Future Preparation" />
          </div>
        </div>
      </section>

      {/* ACADEMICS */}
      <section id="academics" className="bg-[#fff8d9] px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-black uppercase tracking-[0.2em] text-[#92721b]">
              Academics
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#711b35]">
              Preparing Students for Success
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
              Our academic programme is designed to help students develop
              knowledge, confidence and skills for the next stage of life.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <AcademicCard
              title="Junior Secondary"
              text="Strong foundations across core subjects and essential learning skills."
            />

            <AcademicCard
              title="Senior Secondary"
              text="Focused academic development and preparation for higher education."
            />

            <AcademicCard
              title="Student Development"
              text="Encouraging discipline, leadership, confidence and good character."
            />
          </div>
        </div>
      </section>

      {/* SCHOOL IMAGE */}
      <section className="px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem]">
            <img
              src={schoolImage}
              alt="Lantoro High School students"
              className="h-[420px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#711b35]/90 via-[#711b35]/20 to-transparent" />

            <div className="absolute bottom-8 left-6 max-w-xl sm:left-10">
              <p className="font-bold uppercase tracking-widest text-[#f5e6a3]">
                Lantoro High School
              </p>

              <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Learn. Grow. Excel.
              </h2>

              <p className="mt-3 text-white/80">
                Creating an environment where students can discover their
                potential and prepare for the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-5 pb-20">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            <p className="font-black uppercase tracking-[0.2em] text-[#92721b]">
              Why Lantoro?
            </p>

            <h2 className="mt-3 text-4xl font-black text-[#711b35]">
              Helping students become their best.
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              We believe every student has the potential to succeed. Our goal is
              to provide the guidance, education and environment needed to help
              them achieve it.
            </p>
          </div>

          <div className="space-y-4">
            <Reason text="Strong academic foundation" />

            <Reason text="Supportive learning environment" />

            <Reason text="Character and leadership development" />

            <Reason text="Preparation for higher education" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-5 pb-20">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#711b35]">
          <div className="px-6 py-14 text-center">
            <p className="font-black uppercase tracking-[0.2em] text-[#f5e6a3]">
              Admissions
            </p>

            <h2 className="mt-3 text-4xl font-black text-white sm:text-5xl">
              Give Your Child a Stronger Future
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-white/75">
              Interested in Lantoro High School? Contact us to learn more about
              admission and our academic programmes.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f5e6a3] px-7 py-4 font-black text-[#711b35]"
              >
                Admission Enquiry
                <ArrowRight className="h-5 w-5" />
              </a>

              <a
                href="tel:+2340000000000"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/30 px-7 py-4 font-bold text-white"
              >
                <Phone className="h-5 w-5" />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#4e1025] px-5 py-8 text-center text-white">
        <h3 className="font-black">Lantoro High School</h3>

        <p className="mt-1 text-sm text-white/60">Oke-Lantoro, Abeokuta</p>

        <p className="mt-4 text-xs text-white/40">© 2026 Lantoro High School</p>
      </footer>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SmallFeature({ icon, text }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl bg-white p-5 shadow-sm">
      <div className="text-[#711b35]">{icon}</div>

      <span className="text-sm font-bold text-[#711b35]">{text}</span>
    </div>
  );
}

function AcademicCard({ title, text }) {
  return (
    <div className="rounded-3xl bg-white p-7 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#711b35]">
        <BookOpen className="h-6 w-6 text-[#f5e6a3]" />
      </div>

      <h3 className="mt-5 text-xl font-black text-[#711b35]">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function Reason({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#fff8d9] p-4">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-[#711b35]" />

      <span className="font-semibold text-slate-700">{text}</span>
    </div>
  );
}
