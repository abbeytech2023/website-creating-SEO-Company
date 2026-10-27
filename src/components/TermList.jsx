import { useState } from "react";

import {
  CalendarDays,
  Clock,
  Trash2,
  LoaderCircle,
  BookOpen,
  RefreshCw,
} from "lucide-react";

import toast from "react-hot-toast";

import { useSchool } from "../hooks/useSchool";
import { useTerms, useDeleteTerm } from "../hooks/useTerms";
import { useAcademicSessions } from "../hooks/useAccademicSession";

export default function TermList() {
  // Load school information
  const { school, isLoading: schoolLoading, error: schoolError } = useSchool();

  // Load terms belonging to this school
  const {
    data: terms = [],
    isPending: termsLoading,
    isError: termsError,
    error: termsErrorMessage,
    refetch,
  } = useTerms(school?.id);

  // Load academic sessions
  const { data: sessions = [], isPending: sessionsLoading } =
    useAcademicSessions(school?.id);

  // Delete term mutation
  const { mutate: deleteTerm, isPending: isDeleting } = useDeleteTerm();

  const [termToDelete, setTermToDelete] = useState(null);

  // Get academic session name
  function getSessionName(sessionId) {
    return (
      sessions.find((session) => Number(session.id) === Number(sessionId))
        ?.name || "Academic session unavailable"
    );
  }

  // Automatically determine term status from its dates.
  function getTermStatus(term) {
    const today = new Date();

    const today_string = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    if (today_string < term.start_date) {
      return "Upcoming";
    }

    if (today_string > term.end_date) {
      return "Completed";
    }

    return "Current";
  }

  // Delete selected term
  function handleDelete() {
    if (!termToDelete || !school?.id) {
      return;
    }

    deleteTerm(
      {
        termId: termToDelete.id,
        schoolId: school.id,
      },
      {
        onSuccess: () => {
          toast.success("Term deleted successfully.");
          setTermToDelete(null);
        },

        onError: (error) => {
          toast.error(error.message || "Failed to delete term.");
        },
      },
    );
  }

  const statusStyles = {
    Current: "bg-green-50 text-green-700 ring-green-600/20",
    Upcoming: "bg-blue-50 text-blue-700 ring-blue-600/20",
    Completed: "bg-gray-100 text-gray-600 ring-gray-500/20",
  };

  // 1. School loading state
  if (schoolLoading) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-12 text-gray-500">
        <LoaderCircle size={22} className="animate-spin" />
        <span>Loading school information...</span>
      </div>
    );
  }

  // 2. School error state
  if (schoolError || !school?.id) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
        <p className="text-sm text-red-600">
          {schoolError?.message ||
            "Unable to load school information. Please try again."}
        </p>
      </div>
    );
  }

  // 3. Terms loading state
  if (termsLoading) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-2xl border border-gray-100 bg-white p-12 text-gray-500">
        <LoaderCircle size={22} className="animate-spin" />
        <span>Loading terms...</span>
      </div>
    );
  }

  // 4. Terms error state
  if (termsError) {
    return (
      <div className="rounded-2xl border border-red-100 bg-white p-8 text-center">
        <p className="text-sm text-red-600">
          {termsErrorMessage?.message || "Unable to load terms."}
        </p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Academic Terms</h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage your school's academic terms.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-sm font-semibold text-blue-700 sm:flex">
          <BookOpen size={18} />
          {terms.length} {terms.length === 1 ? "Term" : "Terms"}
        </div>
      </div>

      {/* Empty State */}
      {terms.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <CalendarDays size={26} />
          </div>

          <h3 className="mt-4 text-lg font-bold text-gray-900">
            No terms created yet
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            Create your first academic term to begin organizing your school's
            academic calendar.
          </p>
        </div>
      ) : (
        /* Terms Grid */
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {terms.map((term) => {
            const status = getTermStatus(term);

            return (
              <div
                key={term.id}
                className="rounded-2xl border border-gray-100 bg-white p-5  shadow-sm transition hover:border-blue-200 hover:shadow-md"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <CalendarDays size={22} />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusStyles[status]}`}
                  >
                    {status}
                  </span>
                </div>

                {/* Term Information */}
                <h3 className="mt-4 text-lg  font-bold text-gray-900">
                  {term.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {getSessionName(term.academic_session_id)}
                </p>

                {/* Dates */}
                <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CalendarDays size={17} className="text-gray-400" />

                    <div>
                      <p className="text-xs text-gray-400">Start Date</p>

                      <p className="font-medium">{term.start_date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock size={17} className="text-gray-400" />

                    <div>
                      <p className="text-xs text-gray-400">End Date</p>

                      <p className="font-medium">{term.end_date}</p>
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => setTermToDelete(term)}
                  disabled={isDeleting}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 size={16} />
                  Delete Term
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Session Loading Notice */}
      {sessionsLoading && terms.length > 0 && (
        <p className="text-sm text-gray-500">
          Loading academic session names...
        </p>
      )}

      {/* Delete Confirmation Modal */}
      {termToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-term-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={23} />
            </div>

            <h3
              id="delete-term-title"
              className="mt-4 text-lg font-bold text-gray-900"
            >
              Delete {termToDelete.name}?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Are you sure you want to delete this term? Records linked to it
              may be affected depending on your database relationships. This
              action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setTermToDelete(null)}
                disabled={isDeleting}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
              >
                {isDeleting ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <LoaderCircle size={16} className="animate-spin" />
                    Deleting...
                  </span>
                ) : (
                  "Yes, Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
