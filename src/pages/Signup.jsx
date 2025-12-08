import React from "react";
import { Link } from "react-router-dom";
import SpinnerMini from "../components/SpinnerMini";
import { useForm } from "react-hook-form";
import FormRow from "../components/FormRow";
import { useSignup } from "../hooks/useSignup";

export default function Signup() {
  const { register, handleSubmit, getValues, formState } = useForm();

  const { signup, isPending } = useSignup();

  const { errors } = formState;

  const onSubmit = (data) => {
    signup({ ...data });
    console.log("Signup submitted:", { ...data });
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* LEFT PANEL WITH IMAGE */}
      <div
        className="hidden md:flex flex-col justify-start pt-44  w-1/2 px-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/2175079600/photo/different-female-shoes-abstract-arrangement-on-beige-carpet-flooring-fashion-shopping.webp?a=1&b=1&s=612x612&w=0&k=20&c=NAwagDCirr8DpSAvkkyaCm4-BcwD_8Y_ZZ4peegOJNU=')",
        }}
      >
        <div className="bg-black/60 p-10  rounded-xl">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            ShoeMarketHub
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            The marketplace for shoemakers & Akube sellers. Showcase. Sell. Gain
            customers.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className="flex justify-center items-center w-full md:w-1/2 px-8 py-14 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1606813904090-62d0b54d55a7?auto=format&fit=crop&w=1000&q=80')",
        }}
      >
        <div className="bg-black/80 max-w-md w-full p-8 rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <FormRow
              text="white"
              label="Full name"
              error={errors?.name?.message}
            >
              <input
                type="text"
                {...register("fullName", {
                  required: "your full name is required",
                })}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white"
                placeholder="Abdul Vintage Collection"
              />
            </FormRow>

            {/* Store Name */}
            <FormRow
              text="white"
              label="Store name"
              error={errors?.storeName?.message}
            >
              <input
                type="text"
                {...register("businessName", {
                  required: "Your store name is required",
                })}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white"
                placeholder="Abdul Vintage Collection"
              />
            </FormRow>

            {/* Email */}
            <FormRow
              text="white"
              label="Email address"
              error={errors?.email?.message}
            >
              <input
                type="email"
                {...register("email", { required: "enter your email address" })}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white"
                placeholder="you@example.com"
              />
            </FormRow>

            {/* Password */}
            <FormRow text="white" label="password">
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white"
                placeholder="Enter password"
              />
            </FormRow>
            <FormRow
              text="white"
              label="Confirm password"
              error={errors?.passwordConfirm?.message}
            >
              <input
                minLength="8"
                type="password"
                id="passwordConfirm"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white"
                placeholder="confirm your passwoed"
                name="password"
                {...register("passwordConfirm", {
                  validate: (value) => {
                    const password = getValues().password;
                    if (value != password) return "password needs to match";
                  },
                })}
              />
            </FormRow>

            {/* Category */}
            <FormRow text="white" label="Vendor/Shopper">
              <select
                {...register("role", { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white"
              >
                <option value="">Choose one</option>
                <option value="vendor-akube-store">Akube seller</option>
                <option value="vendor-shoe-maker">Shoemaker</option>
                <option value="shopper">Shopper</option>
              </select>
            </FormRow>

            {/* Phone */}
            <FormRow text="white" label="Phone number (WhatsApp)">
              <input
                type="tel"
                {...register("phone", { required: true })}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white"
                placeholder="+234..."
              />
            </FormRow>

            {/* Location */}
            <FormRow
              text="white"
              label="Store Location"
              error={errors?.location?.message}
            >
              <input
                type="text"
                {...register("storeAddress", {
                  required: "The location of your store is required",
                })}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white"
                placeholder="Tejuosho Market, Lagos"
              />
            </FormRow>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:opacity-90 transition tracking-wide"
            >
              {isPending ? <SpinnerMini /> : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center text-white/50 mt-4">
            Already a member?
            <Link
              to="/login"
              className="text-white font-medium ml-1 cursor-pointer hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
