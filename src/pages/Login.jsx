import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import SpinnerMini from "../components/SpinnerMini";
import FormRow from "../components/FormRow";
import { useForm } from "react-hook-form";

export default function Login() {
  const { register, getValues, reset, formState, handleSubmit } = useForm();

  const { login, isPending } = useLogin();

  const onSubmit = ({ email, password }) => {
    login({ email, password });
  };

  return (
    <div className="min-h-screen flex bg-black">
      {/* LEFT PANEL */}
      <div
        className="hidden md:flex flex-col justify-center w-1/2 px-16 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1580952394213-aa56ad417615?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHNob2VzJTIwYmFja2dyb3VuZCUyMGltYWdlJTIwYmxhY2slMjBtZW58ZW58MHx8MHx8fDA%3D')",
        }}
      >
        <div className="bg-black/60 p-8 rounded-xl">
          <h1 className="text-4xl font-bold text-white tracking-wide">
            ShoeMarketHub
          </h1>
          <p className="mt-4 text-white/80 text-lg">
            Welcome back! Sign in to continue browsing shoemakers & Akube
            sellers.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div
        className="flex justify-center items-center w-full md:w-1/2 px-8 py-14 bg-cover bg-center"
        style={{
          backgroundImage: "url('')",
        }}
      >
        <div className="bg-black/80 max-w-md w-full p-8 rounded-xl shadow-2xl border border-white/10 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* EMAIL */}
            <FormRow label="Email Address">
              <input
                type="email"
                {...register("email", { required: "enter your email address" })}
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white"
                placeholder="you@example.com"
              />
            </FormRow>

            {/* PASSWORD */}
            <FormRow label="Password">
              <input
                minLength="6"
                type="password"
                id="password"
                disabled={isPending}
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-black/50 text-white focus:ring-2 focus:ring-white/30 outline-none"
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "password needs a minimum of 8 characters",
                  },
                })}
              />
            </FormRow>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:opacity-90 transition tracking-wide"
            >
              {isPending ? <SpinnerMini /> : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-white/50 mt-4">
            Don't have an account?
            <Link
              to="/signup"
              className="text-white font-medium ml-1 cursor-pointer hover:underline"
            >
              Sign Up
            </Link>
          </p>

          {/* <p className="text-sm text-center text-white/50 mt-2">
            Forgot your password?
            <span className="text-white font-medium ml-1 cursor-pointer hover:underline">
              Reset
            </span>
          </p> */}
        </div>
      </div>
    </div>
  );
}
