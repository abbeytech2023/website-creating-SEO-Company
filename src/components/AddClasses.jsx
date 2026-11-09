import { useState } from "react";
import toast from "react-hot-toast";

import { useSchool } from "../hooks/useSchool";
import { useClasses } from "../hooks/useClasses";

function AddClass({ onClose }) {
  const [name, setName] = useState("");
  const [section, setSection] = useState("");

  const { school } = useSchool();
  const { add_class_async, isAdding } = useClasses(school?.id);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!school?.id) {
      toast.error("School information is unavailable.");
      return;
    }

    if (!name.trim()) {
      toast.error("Please enter a class name.");
      return;
    }

    if (!section) {
      toast.error("Please select a section.");
      return;
    }

    try {
      await add_class_async({
        class_name: name.trim(),
        section,
      });

      toast.success("Class created successfully!");

      setName("");
      setSection("");

      if (onClose) onClose();
    } catch (error) {
      toast.error(error.message || "Failed to create class.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Class Name */}
      <div>
        <label
          htmlFor="class_name"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Class Name
        </label>

        <input
          id="class_name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. JSS 1 or Primary 3"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          //   required
        />
      </div>

      {/* Section */}
      <div>
        <label
          htmlFor="section"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Section
        </label>

        <select
          id="section"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          required
        >
          <option value="">Select a section</option>
          <option value="A">Section A</option>
          <option value="B">Section B</option>
          <option value="C">Section C</option>
          <option value="D">Section D</option>
          <option value="E">Section E</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isAdding || !school?.id}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isAdding ? "Creating class..." : "Create Class"}
      </button>
    </form>
  );
}

export default AddClass;
