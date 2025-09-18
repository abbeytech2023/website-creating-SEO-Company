import React from "react";

export default function ContactUsDark() {
  return (
    <section className="bg-gray-900 text-white py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Get in <span className="text-blue-400">Touch</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We’d love to hear from you! Whether you have a question about our
            SEO services, pricing, or anything else — our team is ready to
            answer.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <form className="bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-600 transition transform hover:scale-105"
            >
              Send Message
            </button>
          </form>

          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-3 text-blue-400">
                📍 Office
              </h3>
              <p className="text-gray-300">
                123 Business Street, Lagos, Nigeria
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-blue-400">
                📞 Phone
              </h3>
              <p className="text-gray-300">+234 800 123 4567</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-blue-400">
                📧 Email
              </h3>
              <p className="text-gray-300">support@yourbusiness.com</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 text-blue-400">
                🌐 Follow Us
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white"
                >
                  F
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-sky-400 hover:bg-sky-500 text-white"
                >
                  T
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-500 hover:bg-pink-600 text-white"
                >
                  I
                </a>
                <a
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 hover:bg-gray-700 text-white"
                >
                  in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dark Map Section */}
        <div className="mt-20">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127646.03085703005!2d3.350188!3d6.524379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b081a8d4c3b%3A0x6d3b2e7c4b4e6f0!2sLagos!5e0!3m2!1sen!2sng!4v1632588356231!5m2!1sen!2sng"
            className="w-full h-96 rounded-2xl shadow-lg border-4 border-gray-800"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
