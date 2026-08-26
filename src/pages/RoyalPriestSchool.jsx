import React from "react";
import { ArrowRight, GraduationCap, Menu, X, CheckCircle2 } from "lucide-react";

export default function RoyalPriesthoodHighSchool() {
  const [open, setOpen] = React.useState(false);

  return (
    <main className="min-h-screen bg-[#fffaf3] text-slate-800">
      {/* NAVBAR */}
      <header className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#075e54]">
              <GraduationCap className="h-6 w-6 text-[#f9b233]" />
            </div>

            <div>
              <h1 className="font-black text-[#064e3b]">Royal Priesthood</h1>

              <p className="text-[11px] font-bold uppercase tracking-widest text-[#f97316]">
                High School
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#about"
              className="text-sm font-semibold hover:text-[#075e54]"
            >
              About
            </a>

            <a
              href="#academics"
              className="text-sm font-semibold hover:text-[#075e54]"
            >
              Academics
            </a>

            <a
              href="#school-life"
              className="text-sm font-semibold hover:text-[#075e54]"
            >
              School Life
            </a>

            <a
              href="#contact"
              className="rounded-full bg-[#f97316] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#ea580c]"
            >
              Admission Enquiry
            </a>
          </nav>

          <button onClick={() => setOpen(!open)} className="md:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <nav className="border-t border-emerald-100 bg-white px-5 py-5 md:hidden">
            <div className="flex flex-col gap-5">
              <a href="#about" onClick={() => setOpen(false)}>
                About
              </a>

              <a href="#academics" onClick={() => setOpen(false)}>
                Academics
              </a>

              <a href="#school-life" onClick={() => setOpen(false)}>
                School Life
              </a>

              <a href="#contact" onClick={() => setOpen(false)}>
                Admission Enquiry
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section className="relative min-h-[600px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/12448839/pexels-photo-12448839.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Students at Royal Priesthood High School"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#064e3b]/95 via-[#075e54]/75 to-transparent" />

        <div className="relative mx-auto flex min-h-[600px] max-w-6xl items-center px-5">
          <div className="max-w-2xl text-white">
            <p className="font-bold uppercase tracking-[0.2em] text-[#f9b233]">
              Royal Priesthood High School
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Raising Confident Students.
              <span className="block text-[#f9b233]">
                Preparing Future Leaders.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/90">
              A focused secondary school committed to academic excellence,
              character development and preparing young people for the future.
            </p>

            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f97316] px-7 py-4 font-bold text-white shadow-lg hover:bg-[#ea580c]"
            >
              Admission Enquiry
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <img
            src="https://images.pexels.com/photos/34162709/pexels-photo-34162709.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt="Secondary school students in class"
            className="h-[380px] w-full rounded-3xl object-cover shadow-xl"
          />

          <div>
            <p className="font-bold uppercase tracking-widest text-[#f97316]">
              About Our School
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#064e3b] sm:text-4xl">
              Developing knowledge, character and confidence.
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Royal Priesthood High School provides a supportive and engaging
              environment where students are encouraged to achieve their
              academic potential while developing strong personal values.
            </p>

            <div className="mt-6 space-y-3">
              {[
                "Strong academic foundation",
                "Dedicated and experienced teachers",
                "Character and leadership development",
                "Supportive learning environment",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#f97316]" />

                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMICS */}
      <section id="academics" className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-bold uppercase tracking-widest text-[#f97316]">
              Academics
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#064e3b] sm:text-4xl">
              Preparing Students for Excellence
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Our academic programme is designed to give students the knowledge,
              skills and confidence they need for their next step.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <AcademicCard
              title="Junior Secondary"
              text="Building strong foundations across core academic subjects."
            />

            <AcademicCard
              title="Senior Secondary"
              text="Focused learning and preparation for higher education."
            />

            <AcademicCard
              title="WAEC Preparation"
              text="Helping students develop the knowledge and confidence needed for examinations."
            />
          </div>
        </div>
      </section>

      {/* SCHOOL LIFE */}
      <section id="school-life" className="px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Students learning"
                className="h-[420px] w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b]/80 to-transparent" />

              <div className="absolute bottom-6 left-6">
                <p className="text-sm font-bold uppercase tracking-widest text-[#f9b233]">
                  School Life
                </p>

                <h3 className="mt-2 text-3xl font-black text-white">
                  Learn. Connect. Grow.
                </h3>
              </div>
            </div>

            <div className="grid gap-5">
              <img
                src="https://images.pexels.com/photos/8422135/pexels-photo-8422135.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Students in school"
                className="h-[198px] w-full rounded-3xl object-cover"
              />

              <img
                src="https://images.pexels.com/photos/8535214/pexels-photo-8535214.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="School students"
                className="h-[198px] w-full rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-5 pb-20 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#075e54] px-6 py-14 text-center">
          <p className="font-bold uppercase tracking-widest text-[#f9b233]">
            Admissions
          </p>

          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
            Give Your Child a Stronger Future
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/80">
            Interested in Royal Priesthood High School? Contact us to learn more
            about admission and our programmes.
          </p>

          <a
            href="#"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#f97316] px-7 py-4 font-bold text-white hover:bg-[#ea580c]"
          >
            Contact the School
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#064e3b] px-5 py-8 text-center text-white">
        <h3 className="font-black">Royal Priesthood High School</h3>

        <p className="mt-2 text-sm text-white/70">
          Excellence • Character • Leadership
        </p>

        <p className="mt-4 text-xs text-white/50">
          © 2026 Royal Priesthood High School
        </p>
      </footer>
    </main>
  );
}

function AcademicCard({ title, text }) {
  return (
    <div className="rounded-2xl bg-[#fffaf3] p-7 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e7f5ef] text-[#075e54]">
        <GraduationCap className="h-6 w-6" />
      </div>

      <h3 className="mt-5 text-xl font-black text-[#064e3b]">{title}</h3>

      <p className="mt-3 leading-7 text-slate-600">{text}</p>
    </div>
  );
}
