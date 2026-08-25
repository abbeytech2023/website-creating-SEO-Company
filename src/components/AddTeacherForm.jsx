import React, { useState } from "react";
import { ArrowLeft, Save, User, Upload } from "lucide-react";

export default function AddTeacherForm({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    staffId: "",
    gender: "",
    phone: "",
    email: "",
    subject: "",
    className: "",
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

    console.log("Teacher Data:", formData);

    // Later:
    // Save teacher to Supabase
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <User size={20} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">Add Teacher</h1>

            <p className="text-sm text-slate-500">
              Add a new teacher to the school
            </p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </button>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        {/* Teacher Information */}
        <section>
          <h2 className="mb-4 text-sm font-bold text-slate-900">
            Teacher Information
          </h2>

          {/* Photo */}
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <User size={26} />
            </div>

            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
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
              label="Staff ID"
              name="staffId"
              value={formData.staffId}
              onChange={handleChange}
              placeholder="e.g. TCH001"
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
          </div>
        </section>

        {/* Contact Information */}
        <section className="border-t pt-6">
          <h2 className="mb-4 text-sm font-bold text-slate-900">
            Contact Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 08012345678"
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="teacher@example.com"
            />
          </div>
        </section>

        {/* Teaching Assignment */}
        <section className="border-t pt-6">
          <h2 className="mb-1 text-sm font-bold text-slate-900">
            Teaching Assignment
          </h2>

          <p className="mb-4 text-sm text-slate-500">
            Select the main subject and class this teacher handles.
          </p>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Subject
              </label>

              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="English">English</option>
                <option value="Basic Science">Basic Science</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Computer Studies">Computer Studies</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
              </select>
            </div>

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

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            <Save size={17} />
            Save Teacher
          </button>
        </div>
      </form>
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
