import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, UserPlus, Camera, User } from "lucide-react";
import { useAddStudent } from "../hooks/useStudents";

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

export default function AddStudentForm({ showAddStudent, setShowAddStudent }) {
  const navigate = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // =========================
  // ADD STUDENT HOOK
  // =========================

  const { addStudent, isPending, error: submitError } = useAddStudent();

  // =========================
  // REACT HOOK FORM
  // =========================

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // =========================
  // PHOTO
  // =========================

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setPhoto(file);

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);

    // For now, photo_url remains null.
    // Later we will upload the file to Supabase Storage.
    setValue("photo_url", null);
  };

  // =========================
  // SUBMIT
  // =========================

  const onSubmit = (data) => {
    const studentData = {
      first_name: data.first_name,
      middle_name: data.middle_name,
      last_name: data.last_name,
      admission_number: data.admission_number,
      gender: data.gender,
      date_of_birth: data.date_of_birth,
      class_name: data.class_name,
      parent_name: data.parent_name,
      parent_phone: data.parent_phone,
      photo_url: data.photo_url || null,
      status: data.status,
    };

    console.log("Student Data:", studentData);
    console.log("Student Photo:", photo);

    addStudent(studentData, {
      onSuccess: () => {
        reset();

        setPhoto(null);
        setPhotoPreview(null);

        // Optional: go back after successful submission
        // navigate(-1);
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setShowAddStudent(false)}
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

        {/* =========================
            FORM
        ========================== */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          {/* =========================
              FORM TITLE
          ========================== */}

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

          {/* =========================
              STUDENT PHOTO
          ========================== */}

          <div className="mb-8 flex flex-col items-center border-b border-slate-100 pb-8">
            <div className="relative">
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

          {/* =========================
              HIDDEN PHOTO URL
          ========================== */}

          <input type="hidden" {...register("photo_url")} />

          {/* =========================
              STUDENT DETAILS
          ========================== */}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* FIRST NAME */}

            <Input
              label="First Name"
              placeholder="Enter first name"
              {...register("first_name", {
                required: "First name is required",
              })}
              error={errors.first_name?.message}
            />
            {/* Middle NAME */}

            <Input
              label="Middle Name"
              placeholder="Enter Middle name"
              {...register("middle_name", {
                required: "middle name is required",
              })}
              error={errors.middle_name?.message}
            />

            {/* LAST NAME */}

            <Input
              label="Last Name"
              placeholder="Enter last name"
              {...register("last_name", {
                required: "Last name is required",
              })}
              error={errors.last_name?.message}
            />

            {/* ADMISSION NUMBER */}

            <Input
              label="Admission Number"
              placeholder="e.g. SCH/2026/001"
              {...register("admission_number", {
                required: "Admission number is required",
              })}
              error={errors.admission_number?.message}
            />

            {/* GENDER */}

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

            {/* DATE OF BIRTH */}

            <Input
              label="Date of Birth"
              type="date"
              {...register("date_of_birth", {
                required: "Date of birth is required",
              })}
              error={errors.date_of_birth?.message}
            />

            {/* CLASS NAME */}

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Class
              </label>

              <select
                {...register("class_name", {
                  required: "Class is required",
                })}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  ${errors.class_name ? "border-red-400" : "border-slate-300"}`}
              >
                <option value="">Select class</option>
                <option value="JSS 1A">JSS 1A</option>
                <option value="JSS 1B">JSS 1B</option>
                <option value="JSS 2A">JSS 2A</option>
                <option value="JSS 2B">JSS 2B</option>
                <option value="JSS 3A">JSS 3A</option>
                <option value="JSS 3B">JSS 3B</option>
              </select>

              {errors.class_name && (
                <p className="text-xs text-red-500">
                  {errors.class_name.message}
                </p>
              )}
            </div>

            {/* STATUS */}

            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                {...register("status", {
                  required: "Status is required",
                })}
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                  ${errors.status ? "border-red-400" : "border-slate-300"}`}
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
                <option value="withdrawn">Withdrawn</option>
              </select>

              {errors.status && (
                <p className="text-xs text-red-500">{errors.status.message}</p>
              )}
            </div>

            {/* PARENT NAME */}

            <Input
              label="Parent/Guardian Name"
              placeholder="Enter parent or guardian name"
              {...register("parent_name")}
              error={errors.parent_name?.message}
            />

            {/* PARENT PHONE */}

            <Input
              label="Parent/Guardian Phone"
              type="tel"
              placeholder="08012345678"
              {...register("parent_phone")}
              error={errors.parent_phone?.message}
            />
          </div>

          {/* =========================
              SUBMIT ERROR
          ========================== */}

          {submitError && (
            <div className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {submitError.message}
            </div>
          )}

          {/* =========================
              BUTTONS
          ========================== */}

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => setShowAddStudent(false)}
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Saving..." : "Add Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
