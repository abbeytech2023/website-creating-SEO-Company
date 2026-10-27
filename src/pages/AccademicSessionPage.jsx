import { useState } from "react";
import { CalendarDays, ChevronDown, Plus, X, Layers3 } from "lucide-react";

import AcademicSessionList from "../components/AcademicSessionList";
import AddAcademicSession from "../components/AcademiSessionForm";

export default function AccademicSessionPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleToggleForm() {
    setIsFormOpen((open) => !open);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
  }

  return (
    <main className="min-h-screen bg-gray-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Page Header */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-800 p-6 text-white shadow-lg sm:p-8">
          <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-violet-400/10" />

          <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10">
                <CalendarDays size={25} />
              </div>

              <p className="mb-2 text-sm font-medium text-indigo-200">
                SCHOOL MANAGEMENT
              </p>

              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Academic Sessions
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
                Create academic sessions, monitor their status, and manage your
                school's current academic year.
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggleForm}
              aria-expanded={isFormOpen}
              className={`inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-900 ${
                isFormOpen
                  ? "border border-white/20 bg-white/10 text-white hover:bg-white/20"
                  : "bg-white text-indigo-950 shadow-sm hover:bg-indigo-50"
              }`}
            >
              {isFormOpen ? (
                <>
                  <X size={18} />
                  Close form
                </>
              ) : (
                <>
                  <Plus size={19} />
                  Add session
                </>
              )}
            </button>
          </div>
        </header>

        {/* Add Session Form */}
        {isFormOpen && (
          <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Plus size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-gray-900">
                    Create academic session
                  </h2>

                  <p className="mt-0.5 text-sm text-gray-500">
                    Enter the details for the new session.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseForm}
                aria-label="Close academic session form"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5 sm:p-6">
              <AddAcademicSession onClose={handleCloseForm} />
            </div>
          </section>
        )}

        {/* Sessions List */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-indigo-600 shadow-sm">
              <Layers3 size={21} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">All sessions</h2>

              <p className="mt-1 text-sm text-gray-500">
                View current, upcoming, and expired sessions.
              </p>
            </div>
          </div>

          <AcademicSessionList />
        </section>

        {/* Footer Note */}
        <footer className="flex items-start gap-3 rounded-2xl border border-gray-200 bg-white p-4">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
            <CalendarDays size={18} />
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-800">
              Session management
            </h3>

            <p className="mt-1 text-sm leading-6 text-gray-500">
              Expired sessions remain available for historical records.
              Switching the current academic session is a manual administrator
              action.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
