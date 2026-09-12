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
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* ================= LEFT SIDE ================= */}
        <div className="relative hidden overflow-hidden bg-indigo-600 lg:flex">
          {/* Background decoration */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-white/10" />
          <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-indigo-500" />
          <div className="absolute right-20 top-20 h-32 w-32 rounded-full bg-white/5" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-lg">
                <GraduationCap size={25} strokeWidth={2.3} />
              </div>

              <div>
                <h1 className="text-lg font-bold tracking-tight text-white">
                  Scholar
                </h1>

                <p className="text-xs text-indigo-200">School Management</p>
              </div>
            </div>

            {/* Hero */}
            <div className="max-w-xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-2 text-xs font-semibold text-indigo-100 backdrop-blur">
                <Sparkles size={14} />
                Built for modern schools
              </div>

              <h2 className="text-5xl font-bold leading-[1.08] tracking-tight text-white xl:text-6xl">
                Run your school
                <span className="block text-indigo-200">with confidence.</span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-indigo-100 xl:text-lg">
                Manage students, teachers, classes and academic results from one
                simple and powerful platform.
              </p>

              {/* Features */}
              <div className="mt-9 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <CheckCircle2 size={17} />
                  </div>

                  <span className="text-sm font-medium text-white">
                    Manage students and teachers
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <CheckCircle2 size={17} />
                  </div>

                  <span className="text-sm font-medium text-white">
                    Record and manage academic results
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                    <CheckCircle2 size={17} />
                  </div>

                  <span className="text-sm font-medium text-white">
                    Generate professional report cards
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between text-xs text-indigo-200">
              <span>© 2026 Scholar</span>

              <div className="flex items-center gap-2">
                <ShieldCheck size={14} />
                Secure & private
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-[430px]">
            {/* Mobile Logo */}
            <div className="mb-9 text-center lg:hidden">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                <GraduationCap size={28} />
              </div>

              <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                Scholar
              </h1>

              <p className="mt-1 text-sm text-slate-500">School Management</p>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <div className="mb-3 inline-flex rounded-lg bg-indigo-50 px-3 py-1.5">
                <span className="text-xs font-bold tracking-wide text-indigo-600">
                  ADMIN PORTAL
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-[34px]">
                Welcome back
              </h2>

              <p className="mt-2.5 text-sm leading-6 text-slate-500">
                Sign in to continue managing your school.
              </p>
            </div>

            {/* Login Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18)] sm:p-8">
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
                      size={18}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="you@school.com"
                      autoComplete="email"
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Enter a valid email address",
                        },
                      })}
                      className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:ring-4 ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                    />
                  </div>

                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-slate-700"
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
                      size={18}
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
                      className={`w-full rounded-xl border bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:bg-white focus:ring-4 ${
                        errors.password
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember */}
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />

                  <span className="text-sm text-slate-500">
                    Keep me signed in
                  </span>
                </label>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200/70 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
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
              <ShieldCheck size={14} />
              <span>Your information is securely protected</span>
            </div>

            <p className="mt-3 text-center text-[11px] leading-5 text-slate-400">
              By signing in, you agree to our terms of use and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
