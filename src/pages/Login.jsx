import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const { login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  console.log(isPending);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* ================= LEFT SIDE ================= */}
        <div className="relative hidden overflow-hidden bg-indigo-700 lg:flex">
          {/* Decorative circles */}
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-white/10" />
          <div className="absolute -bottom-40 -left-32 h-[500px] w-[500px] rounded-full bg-indigo-500/40" />
          <div className="absolute right-20 top-1/2 h-40 w-40 rounded-full bg-white/5" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-indigo-700 shadow-xl">
                <GraduationCap size={27} />
              </div>

              <div>
                <h1 className="text-xl font-bold text-white">
                  School<span className="text-indigo-200">Flow</span>
                </h1>

                <p className="text-xs text-indigo-200">
                  Academic Management System
                </p>
              </div>
            </div>

            {/* Hero */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-indigo-100 backdrop-blur-sm">
                <Sparkles size={15} />
                Smarter school management
              </div>

              <h2 className="text-5xl font-bold leading-[1.1] tracking-tight text-white xl:text-6xl">
                Everything your school needs,
                <span className="block text-indigo-200">in one place.</span>
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-indigo-100">
                Manage students, teachers, classes and academic results
                effortlessly from one powerful school management platform.
              </p>

              {/* Features */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <CheckCircle2 size={18} />
                  </div>

                  <span className="text-sm font-medium text-white">
                    Student management
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <CheckCircle2 size={18} />
                  </div>

                  <span className="text-sm font-medium text-white">
                    Teacher management
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <CheckCircle2 size={18} />
                  </div>

                  <span className="text-sm font-medium text-white">
                    Result management
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <CheckCircle2 size={18} />
                  </div>

                  <span className="text-sm font-medium text-white">
                    Report card generation
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between text-xs text-indigo-200">
              <span>© 2026 SchoolFlow</span>

              <div className="flex items-center gap-2">
                <ShieldCheck size={15} />
                Secure & private
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-10 text-center lg:hidden">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-200">
                <GraduationCap size={31} />
              </div>

              <h1 className="mt-4 text-2xl font-bold text-slate-900">
                School<span className="text-indigo-600">Flow</span>
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Academic Management System
              </p>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold text-indigo-600">
                ADMIN PORTAL
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Welcome back 👋
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Sign in to manage your school and access your dashboard.
              </p>
            </div>

            {/* Login Card */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="admin@school.com"
                      autoComplete="email"
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Enter a valid email address",
                        },
                      })}
                      className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.email.message}
                    </p>
                  )}
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

                    <Link
                      to="/forgot-password"
                      className="text-xs font-semibold text-indigo-600 transition hover:text-indigo-700"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 ${
                        errors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-2 text-xs font-medium text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember */}
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <label htmlFor="remember" className="text-sm text-slate-500">
                    Remember me
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Register */}
              <div className="mt-7 border-t border-slate-100 pt-6 text-center">
                <p className="text-sm text-slate-500">
                  Don't have a school account?
                </p>

                <Link
                  to="/register"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 transition hover:text-indigo-700"
                >
                  Register your school
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Security */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck size={15} />
              Your information is securely protected
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-slate-400">
              By signing in, you agree to our terms of use and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
