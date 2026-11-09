import { useState } from "react";
import { Plus, Search, Pencil, Trash2, X, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

import { useSchool } from "../hooks/useSchool";
import { useSubjects } from "../hooks/useSubjectsService";

function Subjects() {
  const { school } = useSchool();

  console.log(school);

  const {
    subjects,
    isPending,
    error,
    create_subject,
    isCreating,
    update_subject,
    isUpdating,
    delete_subject,
    isDeleting,
  } = useSubjects(school?.id);

  // FORM STATE
  const [show_form, setShowForm] = useState(false);
  const [editing_subject, setEditingSubject] = useState(null);
  const [subject_name, setSubjectName] = useState("");
  const [search_term, setSearchTerm] = useState("");

  const isSubmitting = isCreating || isUpdating;

  // OPEN CREATE FORM
  function handleAddClick() {
    setEditingSubject(null);
    setSubjectName("");
    setShowForm(true);
  }

  // OPEN EDIT FORM
  function handleEditClick(subject) {
    setEditingSubject(subject);
    setSubjectName(subject.subject_name);
    setShowForm(true);
  }

  // CLOSE FORM
  function handleCloseForm() {
    setShowForm(false);
    setEditingSubject(null);
    setSubjectName("");
  }

  // CREATE OR UPDATE SUBJECT
  function handleSubmit(event) {
    event.preventDefault();

    if (!school?.id) {
      toast.error("School information is unavailable.");
      return;
    }

    if (!subject_name.trim()) {
      toast.error("Subject name is required.");
      return;
    }

    const payload = {
      school_id: school.id,
      subject_name: subject_name.trim(),
    };

    if (editing_subject) {
      update_subject(
        {
          ...payload,
          subject_id: editing_subject.id,
        },
        {
          onSuccess: () => {
            toast.success("Subject updated successfully.");
            handleCloseForm();
          },
          onError: (error) => {
            toast.error(error.message || "Failed to update subject.");
          },
        },
      );
    } else {
      create_subject(payload, {
        onSuccess: () => {
          toast.success("Subject created successfully.");
          handleCloseForm();
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create subject.");
        },
      });
    }
  }

  // DELETE SUBJECT
  function handleDelete(subject) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${subject.subject_name}"?`,
    );

    if (!confirmed) return;

    delete_subject(
      {
        subject_id: subject.id,
        school_id: school.id,
      },
      {
        onSuccess: () => {
          toast.success("Subject deleted successfully.");
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete subject.");
        },
      },
    );
  }

  // SEARCH SUBJECTS
  const filtered_subjects = subjects.filter((subject) =>
    subject.subject_name
      ?.toLowerCase()
      .includes(search_term.toLowerCase().trim()),
  );

  // LOADING STATE
  if (isPending) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-gray-500">Loading subjects...</p>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-600">
        <p>Failed to load subjects: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Subjects</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage the subjects taught in your school.
          </p>
        </div>

        <button
          onClick={handleAddClick}
          className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Subject
        </button>
      </div>

      {/* SUBJECT SUMMARY */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
            <BookOpen size={26} />
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Subjects</p>

            <h2 className="text-2xl font-bold text-gray-800">
              {subjects.length}
            </h2>
          </div>
        </div>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={search_term}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search subjects..."
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* SUBJECT LIST */}
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="font-semibold text-gray-800">All Subjects</h2>
        </div>

        {filtered_subjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
            <BookOpen size={42} className="mb-3 text-gray-300" />

            <h3 className="font-semibold text-gray-700">
              {search_term ? "No subjects found" : "No subjects added yet"}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {search_term
                ? "Try searching with a different name."
                : "Add your first subject to get started."}
            </p>

            {!search_term && (
              <button
                onClick={handleAddClick}
                className="mt-4 font-medium text-blue-600 hover:text-blue-700"
              >
                + Add your first subject
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered_subjects.map((subject, index) => (
              <div
                key={subject.id}
                className="flex flex-col gap-3 px-5 py-4 transition hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
              >
                {/* SUBJECT INFORMATION */}
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-semibold text-blue-600">
                    {index + 1}
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-800">
                      {subject.subject_name}
                    </h3>

                    <p className="text-xs text-gray-500">
                      Subject #{subject.id}
                    </p>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditClick(subject)}
                    disabled={isSubmitting || isDeleting}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 transition hover:bg-blue-50 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(subject)}
                    disabled={isSubmitting || isDeleting}
                    className="flex items-center gap-2 rounded-lg border border-red-100 px-3 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE / EDIT MODAL */}
      {show_form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {editing_subject ? "Edit Subject" : "Add Subject"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editing_subject
                    ? "Update the subject name."
                    : "Enter the name of the new subject."}
                </p>
              </div>

              <button
                onClick={handleCloseForm}
                disabled={isSubmitting}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
                aria-label="Close form"
              >
                <X size={20} />
              </button>
            </div>

            {/* MODAL FORM */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label
                  htmlFor="subject_name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Subject Name
                </label>

                <input
                  id="subject_name"
                  type="text"
                  value={subject_name}
                  onChange={(event) => setSubjectName(event.target.value)}
                  placeholder="e.g. Mathematics"
                  autoFocus
                  required
                  maxLength={100}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* MODAL ACTIONS */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  disabled={isSubmitting}
                  className="rounded-lg border border-gray-200 px-4 py-3 font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !subject_name.trim()}
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Saving..."
                    : editing_subject
                      ? "Update Subject"
                      : "Save Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Subjects;
