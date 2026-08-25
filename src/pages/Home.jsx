import {
  ArrowRight,
  BookOpen,
  FileText,
  GraduationCap,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <GraduationCap size={22} />
            </div>

            <div>
              <h1 className="font-bold text-lg">Golden Heritage School</h1>
              <p className="text-xs text-slate-400">School Management Portal</p>
            </div>
          </div>

          <Link
            to="/login"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
            <CheckCircle2 size={16} />
            2026/2027 Academic Session
          </div>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
            Welcome to
            <span className="text-emerald-600"> Golden Heritage School</span>
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-slate-600 leading-7">
            Our school management portal makes it easy to manage students,
            teachers, classes and academic results in one place.
          </p>

          <button className="mt-8 inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-lg font-semibold">
            Login to Portal
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold">School Management Made Simple</h2>

          <p className="mt-3 text-slate-600">
            Everything staff need to manage academic activities.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <Feature
            icon={<Users />}
            title="Students"
            text="Manage student records and keep information organized."
          />

          <Feature
            icon={<BookOpen />}
            title="Classes & Subjects"
            text="Manage classes, subjects and teacher assignments."
          />

          <Feature
            icon={<FileText />}
            title="Student Results"
            text="Enter scores, calculate results and generate PDF report cards."
          />
        </div>
      </section>

      {/* Simple CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-emerald-600 rounded-2xl px-6 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>

          <p className="mt-3 text-emerald-50">
            Teachers and administrators can access the school portal below.
          </p>

          <Link
            to="login"
            className="mt-6 bg-white text-emerald-700 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50"
          >
            Login to School Portal
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center">
          <p className="text-sm text-slate-400">
            © 2026 Golden Heritage School
          </p>
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 hover:border-emerald-300 transition">
      <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
        {icon}
      </div>

      <h3 className="mt-5 font-bold text-lg">{title}</h3>

      <p className="mt-2 text-sm text-slate-600 leading-6">{text}</p>
    </div>
  );
}
