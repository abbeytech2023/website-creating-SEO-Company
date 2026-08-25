import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 lg:grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative hidden overflow-hidden bg-emerald-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          {/* Decorative circles */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/40" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-emerald-800/60" />

          <div className="relative">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-emerald-700 shadow-lg">
                <GraduationCap size={27} />
              </div>

              <div>
                <h1 className="font-bold text-lg">Golden Heritage School</h1>

                <p className="text-xs text-emerald-100">
                  School Management Portal
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur">
              <Sparkles size={16} className="text-amber-300" />
              2026/2027 Academic Session
            </div>

            <h2 className="max-w-md text-4xl font-bold leading-tight">
              Manage your school with confidence.
            </h2>

            <p className="mt-5 max-w-md leading-7 text-emerald-50">
              Manage teachers, students, classes and academic results from one
              simple and secure platform.
            </p>

            <div className="mt-8 space-y-4">
              <Benefit text="Manage student records" />
              <Benefit text="Prepare and approve results" />
              <Benefit text="Generate professional PDF reports" />
            </div>
          </div>

          <div className="relative flex items-center gap-2 text-sm text-emerald-100">
            <ShieldCheck size={18} />
            Secure school management
          </div>
        </div>

        {/* Right Side */}
        <div className="p-6 sm:p-10 lg:p-12">
          {/* Mobile Logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <GraduationCap size={24} />
            </div>

            <div>
              <h1 className="font-bold text-lg text-slate-900">
                Golden Heritage School
              </h1>

              <p className="text-xs text-slate-400">School Management Portal</p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-7">
            <p className="text-sm font-semibold text-emerald-600">
              Administrator Setup
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Create your account
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Set up your administrator account to access the Golden Heritage
              School management portal.
            </p>
          </div>

          <form className="space-y-4">
            {/* Name */}
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@example.com"
            />

            {/* Phone */}
            <Input label="Phone Number" type="tel" placeholder="08012345678" />

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-3 pt-2">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-slate-300 accent-emerald-600"
              />

              <span className="text-xs leading-5 text-slate-500">
                I agree to the school portal terms and understand that I am
                responsible for administrator access.
              </span>
            </label>

            {/* Button */}
            <button
              type="submit"
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700 hover:shadow-xl"
            >
              Create Administrator Account
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Login
              </a>
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            © 2026 Golden Heritage School
          </p>
        </div>
      </div>
    </div>
  );
}

/* Input Component */

function Input({ label, type, placeholder }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-50"
      />
    </div>
  );
}

/* Benefit Component */

function Benefit({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
        <ShieldCheck size={15} className="text-amber-300" />
      </div>

      <span className="text-sm text-emerald-50">{text}</span>
    </div>
  );
}
