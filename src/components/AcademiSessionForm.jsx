import { useState } from "react";
import { CalendarDays, X, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useCreateAcademicSession } from "../hooks/useAccademicSession";
import { useNavigate } from "react-router-dom";
import { useSchool } from "../hooks/useSchool";

export default function AddAcademicSession({ onClose }) {
  const [name, setName] = useState("");
  const { school } = useSchool();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { mutate, isPending } = useCreateAcademicSession();
  const navigate = useNavigate();

  const schoolId = school?.id;

  function handleSubmit(e) {
    e.preventDefault();

    if (!schoolId) {
      toast.error("School information could not be found.");
      return;
    }

    if (!name.trim() || !startDate || !endDate) {
      toast.error("Please complete all fields.");
      return;
    }

    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("End date must be after the start date.");
      return;
    }

    mutate(
      {
        schoolId,
        name: name.trim(),
        startDate,
        endDate,
      },
      {
        onSuccess: () => {
          toast.success("Academic session created successfully.");
          navigate("/terms");
        },

        onError: (error) => {
          if (error.code === "23505") {
            toast.error("This academic session already exists.");
          } else {
            toast.error(error.message || "Failed to create session.");
          }
        },
      },
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <CalendarDays size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Add Academic Session
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Set up a new school year.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            aria-label="Close form"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label
              htmlFor="session-name"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Academic Session
            </label>

            <input
              id="session-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 2026/2027"
              required
              maxLength={30}
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

            <p className="mt-2 text-xs text-slate-500">
              Enter the academic year used by your school.
            </p>
          </div>

          <div>
            <label
              htmlFor="start-date"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Start Date
            </label>

            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />
          </div>

          <div>
            <label
              htmlFor="end-date"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              End Date
            </label>

            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate || undefined}
              required
              className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
            />

            <p className="mt-2 text-xs text-slate-500">
              The end date must be after the start date.
            </p>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending || !schoolId}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending && <LoaderCircle size={17} className="animate-spin" />}

              {isPending ? "Creating..." : "Create Session"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
