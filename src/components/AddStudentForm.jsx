import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Camera, User } from "lucide-react";

const Input = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        ref={ref}
        {...props}
        className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition
            focus:border-blue-500 focus:ring-2 focus:ring-blue-100
            ${error ? "border-red-400" : "border-slate-300"}`}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default function AddStudentForm() {
  const navigate = useNavigate();

  const [photoPreview, setPhotoPreview] = useState(null);
  const [photo, setPhoto] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Handle photo selection
  const handlePhotoChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setPhoto(file);

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);
  };

  const onSubmit = async (data) => {
    console.log("Student Data:", data);
    console.log("Student Photo:", photo);

    // Later:
    // 1. Upload photo to Supabase Storage
    // 2. Get photo URL
    // 3. Save student information + photo URL to students table

    reset();
    setPhoto(null);
    setPhotoPreview(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Add Student</h1>

            <p className="text-sm text-slate-500">
              Add a new student to the school
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {/* Section Header */}
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <UserPlus size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">
                Student Information
              </h2>

              <p className="text-sm text-slate-500">
                Enter the student's details below
              </p>
            </div>
          </div>

          {/* Student Photo */}
          <div className="mb-8 flex flex-col items-center border-b border-slate-100 pb-8">
            <div className="relative">
              {/* Photo */}
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-slate-100 bg-slate-100">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Student preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={55} className="text-slate-400" />
                )}
              </div>

              {/* Camera button */}
              <label
                htmlFor="student-photo"
                className="absolute bottom-1 right-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition hover:bg-blue-700"
              >
                <Camera size={18} />

                <input
                  id="student-photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>

            <h3 className="mt-3 text-sm font-semibold text-slate-800">
              Student Photo
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              Upload a clear passport photograph
            </p>

            <label
              htmlFor="student-photo"
              className="mt-3 cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              {photo ? "Change Photo" : "Upload Photo"}
            </label>
          </div>

          {/* Student Details */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* First Name */}
            <Input
              label="First Name"
              placeholder="Enter first name"
              {...register("firstName", {
                required: "First name is required",
              })}
              error={errors.firstName?.message}
            />

            {/* Last Name */}
            <Input
              label="Last Name"
              placeholder="Enter last name"
              {...register("lastName", {
                required: "Last name is required",
              })}
              error={errors.lastName?.message}
            />

            {/* Admission Number */}
            <Input
              label="Admission Number"
              placeholder="e.g. SCH/2026/001"
              {...register("admissionNumber", {
                required: "Admission number is required",
              })}
              error={errors.admissionNumber?.message}
            />

            {/* Gender */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Gender
              </label>

              <select
                {...register("gender", {
                  required: "Gender is required",
                })}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  ${errors.gender ? "border-red-400" : "border-slate-300"}`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {errors.gender && (
                <p className="text-xs text-red-500">{errors.gender.message}</p>
              )}
            </div>

            {/* Date of Birth */}
            <Input
              label="Date of Birth"
              type="date"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              error={errors.dateOfBirth?.message}
            />

            {/* Class */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Class
              </label>

              <select
                {...register("className", {
                  required: "Class is required",
                })}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  ${errors.className ? "border-red-400" : "border-slate-300"}`}
              >
                <option value="">Select class</option>
                <option value="JSS 1A">JSS 1A</option>
                <option value="JSS 1B">JSS 1B</option>
                <option value="JSS 2A">JSS 2A</option>
                <option value="JSS 2B">JSS 2B</option>
                <option value="JSS 3A">JSS 3A</option>
                <option value="JSS 3B">JSS 3B</option>
              </select>

              {errors.className && (
                <p className="text-xs text-red-500">
                  {errors.className.message}
                </p>
              )}
            </div>

            {/* Parent Name */}
            <Input
              label="Parent/Guardian Name"
              placeholder="Enter parent or guardian name"
              {...register("parentName", {
                required: "Parent/guardian name is required",
              })}
              error={errors.parentName?.message}
            />

            {/* Parent Phone */}
            <Input
              label="Parent/Guardian Phone"
              type="tel"
              placeholder="08012345678"
              {...register("parentPhone", {
                required: "Parent phone number is required",
                pattern: {
                  value: /^[0-9+\-\s()]{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              error={errors.parentPhone?.message}
            />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
