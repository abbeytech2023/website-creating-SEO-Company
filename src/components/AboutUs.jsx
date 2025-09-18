import React from "react";
import { motion } from "framer-motion";

// AboutUs page for Eassyway Electricals
// Tailwind CSS classes used — assumes Tailwind is configured in the project.

export default function AboutUs() {
  return (
    <main className="pt-32 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="inline-block px-3 py-1 bg-yellow-400 rounded-full text-sm font-semibold text-gray-800">
              Trusted • Electricians • Installations
            </p>
            <h1 className="text-3xl lg:text-4xl font-extrabold leading-tight">
              Eassyway Electricals — Powering Homes & Businesses Safely
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl">
              We provide reliable, efficient electrical services for residential
              and commercial customers — from wiring and maintenance to smart
              lighting and emergency repairs. Our mission is to deliver safe,
              timely, and affordable electrical solutions.
            </p>
            <div className="flex gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg bg-gray-900 text-white px-4 py-2 font-medium shadow hover:opacity-95"
              >
                Get a Quote
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 font-medium hover:bg-gray-100"
              >
                Our Services
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-700"
          >
            <img
              src="https://images.unsplash.com/photo-1581092795360-6b9a8e1e7b37?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder"
              alt="Electrician at work"
              className="w-full h-64 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white dark:bg-gray-900 border-t border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To deliver high-quality electrical services with a focus on
              safety, transparency and excellent customer experience. We train
              our team regularly and use certified materials to ensure
              long-lasting results.
            </p>

            <h3 className="text-lg font-semibold mt-4">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To be the go-to electrical partner in our community — known for
              integrity, responsiveness, and technical excellence.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Core Values</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Safety first</li>
              <li>• Honest pricing</li>
              <li>• Skilled technicians</li>
              <li>• Timely response</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">What We Do</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive electrical solutions tailored for homes and
            businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Electrical Installations",
              desc: "Wiring, circuit installation, and new builds.",
            },
            {
              title: "Repairs & Maintenance",
              desc: "Fault finding, replacements, and scheduled maintenance.",
            },
            {
              title: "Lighting & Smart Home",
              desc: "LED upgrades, smart lighting systems, automation.",
            },
            {
              title: "Commercial Fit-Outs",
              desc: "Office and retail electrical projects.",
            },
            {
              title: "Emergency Call-Outs",
              desc: "24/7 rapid response for urgent electrical issues.",
            },
            {
              title: "Safety Checks & Certification",
              desc: "Safety testing and compliance certificates.",
            },
          ].map((s) => (
            <article
              key={s.title}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-semibold">{s.title}</h4>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {s.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-6xl mx-auto px-6 py-12 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Meet the Team</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A group of certified electricians and support staff committed to
            doing the job right.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: "Ade Johnson", role: "Master Electrician" },
            { name: "Chinwe Okafor", role: "Project Manager" },
            { name: "Tunde Afolabi", role: "Field Technician" },
          ].map((p) => (
            <div
              key={p.name}
              className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-3 flex items-center justify-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    p.name
                  )}&background=0D8ABC&color=fff`}
                  alt={p.name}
                />
              </div>
              <h4 className="font-semibold">{p.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {p.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA / Contact */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-gray-900 text-white rounded-2xl p-8">
          <div>
            <h3 className="text-2xl font-bold">Ready to start your project?</h3>
            <p className="mt-2 text-gray-200">
              Request a free quote or schedule an inspection — we'll get back to
              you quickly.
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="tel:+2348000000000"
                className="inline-block px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-medium"
              >
                Call Us
              </a>
              <a
                href="mailto:hello@eassywayelectricals.com"
                className="inline-block px-4 py-2 border border-white/20 rounded-lg"
              >
                Email
              </a>
            </div>
          </div>

          <form className="bg-white text-gray-900 rounded-lg p-6 shadow">
            <div className="grid grid-cols-1 gap-3">
              <input
                className="px-3 py-2 border rounded"
                placeholder="Your name"
              />
              <input
                className="px-3 py-2 border rounded"
                placeholder="Phone or Email"
              />
              <textarea
                className="px-3 py-2 border rounded h-28"
                placeholder="Tell us about the job"
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 bg-gray-900 text-white rounded"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">
            © {new Date().getFullYear()} Eassyway Electricals. All rights
            reserved.
          </p>
          <div className="flex gap-4 mt-3 md:mt-0 text-sm text-gray-600 dark:text-gray-300">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
