import React, { useState } from "react";
import { ArrowLeft, Save, User, Upload } from "lucide-react";

export default function AddStudentForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    admissionNumber: "",
    gender: "",
    dateOfBirth: "",
    className: "",
    parentName: "",
    parentPhone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Student Data:", formData);

    // Later:
    // Save student to Supabase
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center gap-4 px-6 py-4">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 className="text-lg font-bold text-slate-900">Add Student</h1>

            <p className="text-sm text-slate-500">
              Add a new student to the school
            </p>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="mx-auto max-w-4xl px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <section className="rounded-2xl border bg-white p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <User size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Student Information
                </h2>

                <p className="text-sm text-slate-500">
                  Basic information about the student
                </p>
              </div>
            </div>

            {/* Photo */}
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <User size={30} />
              </div>

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                <Upload size={16} />
                Upload Photo
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />

              <Input
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />

              <Input
                label="Admission Number"
                name="admissionNumber"
                value={formData.admissionNumber}
                onChange={handleChange}
                placeholder="e.g. STU001"
                required
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Gender
                </label>

                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <Input
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Class
                </label>

                <select
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="">Select class</option>
                  <option value="JSS 1A">JSS 1A</option>
                  <option value="JSS 1B">JSS 1B</option>
                  <option value="JSS 2A">JSS 2A</option>
                  <option value="JSS 2B">JSS 2B</option>
                  <option value="JSS 3A">JSS 3A</option>
                  <option value="SS 1A">SS 1A</option>
                  <option value="SS 2A">SS 2A</option>
                  <option value="SS 3A">SS 3A</option>
                </select>
              </div>
            </div>
          </section>

          {/* Parent Information */}
          <section className="rounded-2xl border bg-white p-6">
            <div className="mb-6">
              <h2 className="font-bold text-slate-900">Parent / Guardian</h2>

              <p className="text-sm text-slate-500">
                Contact information for the student's parent or guardian
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label="Parent / Guardian Name"
                name="parentName"
                value={formData.parentName}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />

              <Input
                label="Phone Number"
                name="parentPhone"
                value={formData.parentPhone}
                onChange={handleChange}
                placeholder="e.g. 08012345678"
                type="tel"
                required
              />
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              <Save size={17} />
              Save Student
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

/* Reusable Input */

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}
