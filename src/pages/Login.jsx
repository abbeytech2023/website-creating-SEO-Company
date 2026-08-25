import { Link } from "react-router-dom";
import { GraduationCap, Lock, Mail, ArrowRight } from "lucide-react";

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left side */}
        <div className="hidden bg-indigo-700 p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                <GraduationCap size={24} />
              </div>

              <div>
                <h1 className="text-xl font-bold">School Management</h1>
                <p className="text-sm text-indigo-200">
                  Academic Management System
                </p>
              </div>
            </div>

            <div className="mt-32 max-w-lg">
              <h2 className="text-4xl font-bold leading-tight">
                Manage your school.
                <br />
                Simplify your results.
              </h2>

              <p className="mt-6 text-lg leading-8 text-indigo-100">
                Manage students, teachers, classes and academic results from one
                simple platform.
              </p>
            </div>
          </div>

          <p className="text-sm text-indigo-200">
            © 2026 School Management System
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="mb-10 text-center lg:hidden">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">
                <GraduationCap size={28} />
              </div>

              <h1 className="mt-4 text-xl font-bold text-slate-900">
                School Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Academic Management System
              </p>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome back
              </h2>

              <p className="mt-2 text-slate-500">
                Sign in to access your school portal.
              </p>
            </div>

            {/* Login form */}
            <form className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              {/* Login button */}
              <Link
                to="/dashboard"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
              >
                Sign in
                <ArrowRight size={18} />
              </Link>
            </form>

            {/* Signup */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Footer */}
            <p className="mt-10 text-center text-xs leading-5 text-slate-400">
              By signing in, you agree to the school's terms of use and privacy
              policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
