import { useState } from "react";
import toast from "react-hot-toast";

import { useClasses } from "../hooks/useClasses";
import { useSchool } from "../hooks/useSchool";

import ConfirmDelete from "../components/ConfirmDelete";

import { Plus, Pencil, Trash2, X, BookOpen, Search } from "lucide-react";

function Classes() {
  const [show_form, setShowForm] = useState(false);
  const [editing_class, setEditingClass] = useState(null);
  const [class_to_delete, setClassToDelete] = useState(null);
  const [class_name, setClassName] = useState("");
  const [search_term, setSearchTerm] = useState("");

  const { school } = useSchool();

  const {
    classes,
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
    setShowForm(true);
  }

  // OPEN EDIT FORM
  function handleEditClick(class_item) {
    setEditingClass(class_item);
    setClassName(class_item.class_name || class_item.name || "");
    setShowForm(true);
  }

  // CLOSE FORM
  function handleCloseForm() {
    setShowForm(false);
    setEditingClass(null);
    setClassName("");
  }

  // ADD OR UPDATE CLASS
  async function handleSubmit(e) {
    e.preventDefault();

    if (!class_name.trim()) return;

    try {
      if (editing_class) {
        await edit_class_async({
          class_id: editing_class.id,
          name: class_name.trim(),
        });

        toast.success("Class updated successfully!");
      } else {
        await add_class_async({
          name: class_name.trim(),
        });

        toast.success("Class added successfully!");
      }

      handleCloseForm();
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    }
  }

  // DELETE CLASS
  async function handleDelete() {
    if (!class_to_delete) return;

    try {
      await remove_class_async(class_to_delete.id);

      toast.success("Class deleted successfully!");
      setClassToDelete(null);
    } catch (error) {
      toast.error(error.message || "Unable to delete class.");
    }
  }

  // SEARCH CLASSES
  const filtered_classes = classes.filter((item) =>
    (item.class_name || item.name || "")
      .toLowerCase()
      .includes(search_term.toLowerCase()),
  );

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
          onClick={handleAddClick}
          disabled={!school?.id}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus size={18} />
          Add Class
        </button>
      </div>

      {/* STATISTICS */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
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
          placeholder="Search classes..."
          value={search_term}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      {/* ADD / EDIT FORM */}
      {show_form && (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">
              {editing_class ? "Edit Class" : "Add New Class"}
            </h2>

            <button
              type="button"
              onClick={handleCloseForm}
              disabled={isAdding || isUpdating}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={!class_name.trim() || isAdding || isUpdating}
                className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
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
                className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CLASSES LIST */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5">
          <h2 className="font-semibold text-gray-800">All Classes</h2>
        </div>

        {isPending ? (
          <div className="p-10 text-center text-gray-500">
            Loading classes...
          </div>
        ) : error ? (
          <div className="p-10 text-center text-red-500">
            Failed to load classes: {error.message}
          </div>
        ) : filtered_classes.length === 0 ? (
          <div className="p-10 text-center">
            <BookOpen size={40} className="mx-auto mb-3 text-gray-300" />

            <h3 className="font-semibold text-gray-700">
              {search_term ? "No matching classes" : "No classes found"}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {search_term
                ? "Try searching with a different class name."
                : "Add your first class to get started."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-sm text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-medium">#</th>

                  <th className="px-5 py-4 font-medium">Class Name</th>

                  <th className="px-5 py-4 text-right font-medium">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filtered_classes.map((item, index) => (
                  <tr key={item.id} className="transition hover:bg-gray-50">
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-medium text-gray-800">
                        {item.class_name || item.name}
                      </span>

                      {item.section && (
                        <span className="ml-2 rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-600">
                          Section {item.section}
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEditClick(item)}
                          disabled={isUpdating || isDeleting}
                          title="Edit class"
                          className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 disabled:opacity-50"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => setClassToDelete(item)}
                          disabled={isDeleting || isUpdating}
                          title="Delete class"
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION POPUP */}
      <ConfirmDelete
        isOpen={!!class_to_delete}
        onClose={() => setClassToDelete(null)}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
        title="Delete Class?"
        message={`Are you sure you want to delete ${
          class_to_delete?.class_name || class_to_delete?.name || "this class"
        }? This action cannot be undone.`}
      />
    </div>
  );
}

export default Classes;
