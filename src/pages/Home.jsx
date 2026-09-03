import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileText,
  GraduationCap,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* =========================
          Navbar
      ========================== */}

      {/* =========================
          Hero Section
      ========================== */}
      <main>
        <section className="overflow-hidden bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div className="mx-auto max-w-3xl text-center">
              {/* Academic Session Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                <CheckCircle2 size={16} />
                2026/2027 Academic Session
              </div>

              {/* Heading */}
              <h2 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Manage Your School
                <span className="block text-emerald-600">
                  Smarter & Simpler
                </span>
              </h2>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Golden Heritage School Management Portal helps administrators
                manage students, teachers, classes, subjects and academic
                results — all from one place.
              </p>

              {/* CTA Buttons */}
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  to="/login"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
                >
                  Login to Portal
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/register"
                  className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 sm:w-auto"
                >
                  Register Your School
                </Link>
              </div>
            </div>

            {/* Hero Stats */}
            <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
              <HeroStat
                icon={<Users size={20} />}
                value="Students"
                label="Organized student records"
              />

              <HeroStat
                icon={<BookOpen size={20} />}
                value="Academics"
                label="Classes & subjects"
              />

              <HeroStat
                icon={<FileText size={20} />}
                value="Results"
                label="Professional report cards"
              />
            </div>
          </div>
        </section>

        {/* =========================
            Features
        ========================== */}
        <section className="border-y border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Powerful & Simple
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Everything Your School Needs
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Manage important academic activities from a clean and easy-to-
                use school management portal.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <Feature
                icon={<Users size={22} />}
                title="Student Management"
                text="Create and manage student records, admission numbers, classes and essential student information."
              />

              <Feature
                icon={<BookOpen size={22} />}
                title="Classes & Subjects"
                text="Organize classes, subjects and teacher assignments so every teacher knows exactly what they are responsible for."
              />

              <Feature
                icon={<FileText size={22} />}
                title="Academic Results"
                text="Teachers can enter scores while administrators review, approve and generate professional student report cards."
              />
            </div>
          </div>
        </section>

        {/* =========================
            How It Works
        ========================== */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-emerald-600">
                Simple Workflow
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                From Scores to Report Cards
              </h2>

              <p className="mt-4 text-slate-600">
                A straightforward process designed for school administrators and
                teachers.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-4">
              <Step
                number="01"
                title="Assign Teachers"
                text="Assign teachers to their classes and subjects."
              />

              <Step
                number="02"
                title="Enter Results"
                text="Teachers enter CA and examination scores."
              />

              <Step
                number="03"
                title="Review Results"
                text="Administrators review and approve submitted results."
              />

              <Step
                number="04"
                title="Generate Reports"
                text="Create professional report cards for students."
              />
            </div>
          </div>
        </section>

        {/* =========================
            CTA
        ========================== */}
        <section className="px-5 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-3xl bg-emerald-600 px-6 py-14 text-center shadow-lg sm:px-10">
              <div className="mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to manage your school better?
                </h2>

                <p className="mt-4 leading-7 text-emerald-50">
                  Login to your school portal or create an account to get
                  started.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    Login to Portal
                    <ArrowRight size={18} />
                  </Link>

                  <Link
                    to="/register"
                    className="inline-flex items-center justify-center rounded-lg border border-emerald-400 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-500"
                  >
                    Register Your School
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================
          Footer
      ========================== */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-7 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <GraduationCap size={17} />
            </div>

            <span className="text-sm font-semibold text-slate-700">
              Golden Heritage School
            </span>
          </div>

          <p className="text-sm text-slate-400">
            © 2026 Golden Heritage School. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* =========================
   Feature Component
========================== */

function Feature({ icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-6 text-lg font-bold text-slate-900">{title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

/* =========================
   Hero Stat Component
========================== */

function HeroStat({ icon, value, label }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
        {icon}
      </div>

      <div>
        <p className="font-semibold text-slate-900">{value}</p>
        <p className="mt-0.5 text-xs text-slate-500">{label}</p>
      </div>
    </div>
  );
}

/* =========================
   Step Component
========================== */

function Step({ number, title, text }) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-slate-50 p-6">
      <span className="text-sm font-bold text-emerald-600">{number}</span>

      <h3 className="mt-4 font-bold text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}
