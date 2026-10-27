import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock,
  LoaderCircle,
} from "lucide-react";

import { useSchool } from "../hooks/useSchool";
import { useAcademicSessions } from "../hooks/useAccademicSession";

function getToday() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatDate(date) {
  if (!date) return "Not set";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getDateStatus(session) {
  const today = getToday();

  if (session.end_date < today) {
    return {
      label: "Expired",
      className: "bg-red-50 text-red-700",
    };
  }

  if (session.start_date > today) {
    return {
      label: "Upcoming",
      className: "bg-blue-50 text-blue-700",
    };
  }

  return {
    label: "In progress",
    className: "bg-emerald-50 text-emerald-700",
  };
}

function SessionCard({ session }) {
  const dateStatus = getDateStatus(session);

  return (
    <article
      className={`rounded-2xl border p-5 transition ${
        session.is_current
          ? "border-emerald-200 bg-emerald-50/40"
          : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h3 className="break-words text-lg font-semibold text-gray-900">
              {session.name}
            </h3>

            {session.is_current && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <CheckCircle2 size={14} />
                Current session
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} />
              Starts: {formatDate(session.start_date)}
            </span>

            <span className="flex items-center gap-2">
              <Clock size={16} />
              Ends: {formatDate(session.end_date)}
            </span>
          </div>
        </div>

        <span
          className={`inline-flex w-fit shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ${dateStatus.className}`}
        >
          {dateStatus.label}
        </span>
      </div>

      {session.is_current && dateStatus.label === "Expired" && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />

          <p>
            This session is still marked as current, but its end date has
            passed. An administrator can manually switch to another session.
          </p>
        </div>
      )}
    </article>
  );
}

export default function AcademicSessionList() {
  const { school } = useSchool();
  const schoolId = school?.id;

  const {
    data: sessions = [],
    isPending,
    isError,
    error,
    refetch,
  } = useAcademicSessions(schoolId);

  if (!schoolId) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        School information could not be found.
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-10 text-gray-500">
        <LoaderCircle size={22} className="animate-spin" />
        <span>Loading academic sessions...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="mt-0.5 text-red-600" />

          <div>
            <h3 className="font-semibold text-red-800">
              Unable to load academic sessions
            </h3>

            <p className="mt-1 text-sm text-red-700">
              {error?.message || "Something went wrong."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-3 text-sm font-semibold text-red-800 underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-10 text-center">
        <CalendarDays size={36} className="mx-auto mb-3 text-gray-400" />

        <h3 className="font-semibold text-gray-900">
          No academic sessions found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Create an academic session to get started.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Academic sessions</h2>

          <p className="mt-1 text-sm text-gray-500">
            View the academic sessions created for your school.
          </p>
        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700">
          {sessions.length} {sessions.length === 1 ? "session" : "sessions"}
        </span>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
      </div>
    </section>
  );
}
