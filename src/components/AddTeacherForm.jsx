import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Camera, User, Landmark } from "lucide-react";

export default function AddTeacherForm({ showAddTeacher, setShowAddTeacher }) {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    const teacherData = {
      first_name: data.first_name,
      middle_name: data.middle_name || null,
      last_name: data.last_name,

      gender: data.gender,
      date_of_birth: data.date_of_birth || null,

      phone: data.phone,
      email: data.email || null,
      address: data.address || null,

      employee_id: data.employee_id,
      qualification: data.qualification || null,
      status: data.status,

      bank_name: data.bank_name || null,
      account_name: data.account_name || null,
      account_number: data.account_number || null,
      account_type: data.account_type || null,
      sort_code: data.sort_code || null,

      photo: photo,
    };

    console.log("Teacher Data:", teacherData);

    // Later:
    // addTeacher(teacherData)

    reset();
    setPhoto(null);
    setPhotoPreview(null);

    onSuccess?.();
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setShowAddTeacher(false);
            }}
            className="rounded-lg border border-slate-200 bg-white p-2.5 hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">Add Teacher</h1>

            <p className="text-sm text-slate-500">
              Add a new teacher to your school.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="p-6">
            {/* Photo */}
            <div className="mb-8 flex flex-col items-center">
              <div className="relative">
                <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Teacher"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User size={45} className="text-slate-400" />
                  )}
                </div>

                <label
                  htmlFor="teacher-photo"
                  className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white"
                >
                  <Camera size={17} />

                  <input
                    id="teacher-photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="mt-3 text-sm font-medium text-slate-700">
                Teacher Photo
              </p>

              <p className="text-xs text-slate-400">Optional</p>
            </div>

            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Personal Information
              </h2>

              <div className="grid gap-5 md:grid-cols-3">
                <Input
                  label="First Name"
                  placeholder="First name"
                  {...register("first_name", {
                    required: "First name is required",
                  })}
                  error={errors.first_name?.message}
                />

                <Input
                  label="Middle Name"
                  placeholder="Middle name"
                  {...register("middle_name")}
                />

                <Input
                  label="Last Name"
                  placeholder="Last name"
                  {...register("last_name", {
                    required: "Last name is required",
                  })}
                  error={errors.last_name?.message}
                />

                <Select
                  label="Gender"
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                  error={errors.gender?.message}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Select>

                <Input
                  label="Date of Birth"
                  type="date"
                  {...register("date_of_birth")}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="08012345678"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  error={errors.phone?.message}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-8 border-t border-slate-100 pt-8">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Contact Information
              </h2>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Email"
                  type="email"
                  placeholder="teacher@example.com"
                  {...register("email")}
                />

                <Input
                  label="Residential Address"
                  placeholder="Residential address"
                  {...register("address")}
                />
              </div>
            </div>

            {/* Employment Information */}
            <div className="mb-8 border-t border-slate-100 pt-8">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">
                Employment Information
              </h2>

              <div className="grid gap-5 md:grid-cols-3">
                <Input
                  label="Employee ID"
                  placeholder="e.g. TCH001"
                  {...register("employee_id", {
                    required: "Employee ID is required",
                  })}
                  error={errors.employee_id?.message}
                />

                <Input
                  label="Qualification"
                  placeholder="e.g. B.Ed, B.Sc, NCE"
                  {...register("qualification")}
                />

                <Select
                  label="Status"
                  {...register("status", {
                    required: "Status is required",
                  })}
                  error={errors.status?.message}
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on_leave">On Leave</option>
                </Select>
              </div>
            </div>

            {/* Bank Details */}
            <div className="mb-8 border-t border-slate-100 pt-8">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
                  <Landmark size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Bank Details
                  </h2>

                  <p className="text-sm text-slate-500">
                    Used for teacher salary payments.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Input
                  label="Bank Name"
                  placeholder="e.g. First Bank"
                  {...register("bank_name")}
                />

                <Input
                  label="Account Name"
                  placeholder="Name on bank account"
                  {...register("account_name")}
                />

                <Input
                  label="Account Number"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Enter 10-digit account number"
                  {...register("account_number", {
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Account number must be 10 digits",
                    },
                  })}
                  error={errors.account_number?.message}
                />

                <Select label="Account Type" {...register("account_type")}>
                  <option value="">Select account type</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </Select>

                <Input
                  label="Sort Code"
                  placeholder="Optional"
                  {...register("sort_code")}
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 p-5">
            <button
              type="button"
              onClick={() => setShowAddTeacher(false)}
              className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Input */

const Input = React.forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        ref={ref}
        {...props}
        className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition
            ${
              error
                ? "border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

/* Select */

const Select = React.forwardRef(({ label, error, children, ...props }, ref) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <select
        ref={ref}
        {...props}
        className={`w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm outline-none transition
            ${
              error
                ? "border-red-400"
                : "border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            }`}
      >
        {children}
      </select>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
});

Select.displayName = "Select";
