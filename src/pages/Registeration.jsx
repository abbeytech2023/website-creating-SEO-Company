import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Phone,
  School,
  User,
} from "lucide-react";
import { useSignup } from "../hooks/useSignup";

export default function Register() {
  const navigate = useNavigate();
  const { signup, isPending } = useSignup();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      schoolName: "",
      adminName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      // Only send the fields required by Supabase.
      const signupData = {
        email: data.email.trim().toLowerCase(),
        adminName: data.adminName.trim(),
        schoolName: data.schoolName.trim(),
        phone: data.phone.trim(),
        password: data.password,
      };

      console.log("Signup data:", signupData);

      await signup(signupData);

      //   navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <GraduationCap size={22} />
            </div>

            <div>
              <h1 className="text-base font-bold text-slate-900 sm:text-lg">
                School Management Portal
              </h1>

              <p className="text-xs text-slate-500">
                Manage your school with ease
              </p>
            </div>
          </Link>

          <Link
            to="/login"
            className="text-sm font-semibold text-slate-600 transition hover:text-emerald-600"
          >
            <span className="hidden sm:inline">Already have an account? </span>
            <span className="text-emerald-600">Login</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="px-5 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl">
          <div className="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.85fr_1.15fr]">
            {/* Left Panel */}
            <div className="hidden bg-emerald-600 p-10 text-white lg:block">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                    <School size={25} />
                  </div>

                  <h2 className="mt-8 text-3xl font-bold leading-tight">
                    Create your school's account.
                  </h2>

                  <p className="mt-4 leading-7 text-emerald-50">
                    Set up your school management portal and start managing
                    students, teachers and academic results from one place.
                  </p>

                  <div className="mt-10 space-y-5">
                    <Benefit
                      title="Manage Students"
                      text="Keep student information organized and accessible."
                    />

                    <Benefit
                      title="Manage Teachers"
                      text="Create teacher accounts and assign subjects and classes."
                    />

                    <Benefit
                      title="Manage Results"
                      text="Review results and generate professional report cards."
                    />
                  </div>
                </div>

                <div className="mt-12 border-t border-emerald-500 pt-6">
                  <p className="text-sm text-emerald-100">
                    Your account will be created as the school's administrator.
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="p-6 sm:p-10">
              <div className="mb-8">
                <Link
                  to="/"
                  className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-emerald-600"
                >
                  <ArrowLeft size={16} />
                  Back to home
                </Link>

                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Register your school
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Create your administrator account to get started.
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* School Name */}
                <InputField
                  label="School Name"
                  name="schoolName"
                  placeholder="e.g. Golden Heritage School"
                  icon={<School size={18} />}
                  registration={register("schoolName", {
                    required: "School name is required",
                    minLength: {
                      value: 2,
                      message: "School name is too short",
                    },
                  })}
                  error={errors.schoolName?.message}
                  disabled={isPending}
                />

                {/* Admin Name */}
                <InputField
                  label="Administrator's Full Name"
                  name="adminName"
                  placeholder="Enter your full name"
                  icon={<User size={18} />}
                  registration={register("adminName", {
                    required: "Administrator name is required",
                    minLength: {
                      value: 2,
                      message: "Please enter your full name",
                    },
                  })}
                  error={errors.adminName?.message}
                  disabled={isPending}
                />

                {/* Email + Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="admin@school.com"
                    icon={<Mail size={18} />}
                    registration={register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    error={errors.email?.message}
                    disabled={isPending}
                  />

                  <InputField
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="08012345678"
                    icon={<Phone size={18} />}
                    registration={register("phone", {
                      required: "Phone number is required",
                      minLength: {
                        value: 7,
                        message: "Enter a valid phone number",
                      },
                    })}
                    error={errors.phone?.message}
                    disabled={isPending}
                  />
                </div>

                {/* Password */}
                <PasswordField
                  label="Password"
                  name="password"
                  placeholder="Create a password"
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  registration={register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  error={errors.password?.message}
                  disabled={isPending}
                />

                {/* Confirm Password */}
                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                  registration={register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  error={errors.confirmPassword?.message}
                  disabled={isPending}
                />

                {/* Terms */}
                <div className="flex items-start gap-3 pt-1">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    disabled={isPending}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />

                  <label
                    htmlFor="terms"
                    className="text-xs leading-5 text-slate-500"
                  >
                    I agree to the terms of use and confirm that I am authorized
                    to create an administrator account for this school.
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex w-full items-center justify-center rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Creating Account...
                    </>
                  ) : (
                    "Create School Account"
                  )}
                </button>
              </form>

              {/* Login */}
              <div className="mt-7 text-center text-sm text-slate-500">
                Already have a school account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-emerald-600 hover:text-emerald-700"
                >
                  Login here
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-5 pb-8 text-center">
        <p className="text-xs text-slate-400">
          © 2026 School Management Portal. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

/* =====================================================
   Input Field
===================================================== */

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  icon,
  registration,
  error,
  disabled,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </div>

        <input
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          {...registration}
          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-100"
          } disabled:cursor-not-allowed disabled:bg-slate-100`}
        />
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* =====================================================
   Password Field
===================================================== */

function PasswordField({
  label,
  name,
  placeholder,
  showPassword,
  setShowPassword,
  registration,
  error,
  disabled,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Lock size={18} />
        </div>

        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="new-password"
          {...registration}
          className={`w-full rounded-xl border bg-white py-3 pl-10 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 ${
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-100"
              : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-100"
          } disabled:cursor-not-allowed disabled:bg-slate-100`}
        />

        <button
          type="button"
          disabled={disabled}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600 disabled:cursor-not-allowed"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

/* =====================================================
   Benefit
===================================================== */

function Benefit({ title, text }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm text-white">
        ✓
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title}</h3>

        <p className="mt-1 text-sm leading-5 text-emerald-50">{text}</p>
      </div>
    </div>
  );
}
