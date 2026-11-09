import { useState } from "react";
import toast from "react-hot-toast";

import { useClasses } from "../hooks/useClasses";
import { useSchool } from "../hooks/useSchool";

import {
  Plus,
  Pencil,
  Trash2,
  X,
  BookOpen,
  Search,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import ClassesList from "../components/ClassesList";

function Classes() {
  const [show_form, setShowForm] = useState(false);
  const [editing_class, setEditingClass] = useState(null);
  const [class_to_delete, setClassToDelete] = useState(null);

  const [class_name, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [search_term, setSearchTerm] = useState("");

  const { school } = useSchool();

  const {
    classes = [],
    isPending,
    error,
    add_class_async,
    isAdding,
    edit_class_async,
    isUpdating,
    remove_class_async,
    isDeleting,
  } = useClasses(school?.id);

  // OPEN ADD FORM
  function handleAddClick() {
    setEditingClass(null);
    setClassName("");
    setSection("");
    setShowForm(true);
  }

  // OPEN EDIT FORM
  function handleEditClick(class_item) {
    setEditingClass(class_item);

    setClassName(class_item.class_name || "");

    setSection(class_item.section || "");
    setShowForm(true);
  }

  // CLOSE FORM
  function handleCloseForm() {
    if (isAdding || isUpdating) return;

    setShowForm(false);
    setEditingClass(null);
    setClassName("");
    setSection("");
  }

  // ADD OR UPDATE CLASS
  async function handleSubmit(e) {
    e.preventDefault();

    const trimmed_class_name = class_name.trim();
    const trimmed_section = section.trim();

    if (!trimmed_class_name) {
      toast.error("Please enter a class name.");
      return;
    }

    try {
      if (editing_class) {
        await edit_class_async({
          class_name: trimmed_class_name,
          class_id: editing_class.id,
          section: trimmed_section || null,
        });
      } else {
        await add_class_async({
          class_name: trimmed_class_name,
          section: trimmed_section || null,
        });
      }

      setShowForm(false);
      setEditingClass(null);
      setClassName("");
      setSection("");
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  }

  // OPEN DELETE CONFIRMATION
  function handleDeleteClick(class_item) {
    setClassToDelete(class_item);
  }

  // CLOSE DELETE CONFIRMATION
  function handleCloseDelete() {
    if (isDeleting) return;

    setClassToDelete(null);
  }

  // DELETE CLASS
  async function handleDelete() {
    if (!class_to_delete || isDeleting) return;

    try {
      await remove_class_async(class_to_delete.id);

      toast.success("Class deleted successfully!");
      setClassToDelete(null);
    } catch (error) {
      toast.error(error.message || "Unable to delete class.");
    }
  }

  // SEARCH CLASSES BY NAME OR SECTION
  const filtered_classes = classes.filter((item) => {
    const name = (item.class_name || item.name || "").toLowerCase();
    const class_section = (item.section || "").toLowerCase();
    const search = search_term.toLowerCase();

    return name.includes(search) || class_section.includes(search);
  });

  const selected_class_name =
    class_to_delete?.class_name || class_to_delete?.name || "this class";

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Classes</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your school's classes and sections.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddClick}
          disabled={!school?.id}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={18} />
          Add Class
        </button>
      </div>

      {/* STATISTICS */}
      <div className="rounded-xl border border-gray-100 p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <BookOpen size={25} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Classes</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {classes.length}
            </h2>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search
          size={19}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search classes or sections..."
          value={search_term}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* ADD / EDIT FORM */}
      {show_form && (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                {editing_class ? "Edit Class" : "Add New Class"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the class name and select a section.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseForm}
              disabled={isAdding || isUpdating}
              title="Close form"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* CLASS NAME */}
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
                value={class_name}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="e.g. JSS 1"
                required
                disabled={isAdding || isUpdating}
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* SECTION DROPDOWN */}
            <div>
              <label
                htmlFor="section"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Section
                <span className="ml-2 font-normal text-gray-400">
                  (Optional)
                </span>
              </label>

              <div className="relative">
                <select
                  id="section"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  disabled={isAdding || isUpdating}
                  className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 pr-10 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-gray-50"
                >
                  <option value="">Select Section</option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Select A, B, C, or D if the class has multiple sections.
              </p>
            </div>

            {/* FORM BUTTONS */}
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={!class_name.trim() || isAdding || isUpdating}
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isAdding || isUpdating
                  ? "Saving..."
                  : editing_class
                    ? "Update Class"
                    : "Save Class"}
              </button>

              <button
                type="button"
                onClick={handleCloseForm}
                disabled={isAdding || isUpdating}
                className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CLASSES LIST */}
      <ClassesList
        isDeleting={isDeleting}
        isPending={isPending}
        isUpdating={isUpdating}
        filtered_classes={filtered_classes}
        error={error}
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
      />

      {/* BUILT-IN DELETE CONFIRMATION MODAL */}
      {class_to_delete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleCloseDelete();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-class-title"
            aria-describedby="delete-class-description"
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* MODAL CONTENT */}
            <div className="flex items-start gap-4 p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle size={25} />
              </div>

              <div className="flex-1">
                <h2
                  id="delete-class-title"
                  className="text-lg font-bold text-gray-900"
                >
                  Delete Class?
                </h2>

                <p
                  id="delete-class-description"
                  className="mt-2 text-sm leading-6 text-gray-500"
                >
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-gray-800">
                    {selected_class_name}
                    {class_to_delete.section
                      ? ` - Section ${class_to_delete.section}`
                      : ""}
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseDelete}
                disabled={isDeleting}
                aria-label="Close delete confirmation"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL BUTTONS */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 p-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleCloseDelete}
                disabled={isDeleting}
                className="rounded-lg border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={17} />
                    Delete Class
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Classes;
