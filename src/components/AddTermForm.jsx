import { useState } from "react";
import { CalendarDays, LoaderCircle, Plus, X } from "lucide-react";
import toast from "react-hot-toast";

import { useSchool } from "../hooks/useSchool";
import { useAcademicSessions } from "../hooks/useAccademicSession";
import { useCreateTerm } from "../hooks/useTerms";

export default function AddTerm({ onClose }) {
  const { school } = useSchool();

  const {
    data: sessions = [],
    isPending: sessionsLoading,
    isError: sessionsError,
  } = useAcademicSessions(school?.id);

  const { mutate: createTerm, isPending } = useCreateTerm();

  const [formData, setFormData] = useState({
    academicSessionId: "",
    name: "",
    startDate: "",
    endDate: "",
  });

  const selectedSession = sessions.find(
    (session) => session.id === Number(formData.academicSessionId),
  );

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!school?.id) {
      toast.error("School information could not be loaded.");
      return;
    }

    if (!formData.academicSessionId) {
      toast.error("Please select an academic session.");
      return;
    }

    if (!formData.name) {
      toast.error("Please select a term.");
      return;
    }

    if (!formData.startDate || !formData.endDate) {
      toast.error("Please select both dates.");
      return;
    }

    if (formData.endDate <= formData.startDate) {
      toast.error("End date must be after start date.");
      return;
    }

    if (
      formData.startDate < selectedSession.start_date ||
      formData.endDate > selectedSession.end_date
    ) {
      toast.error("Term dates must fall within the academic session dates.");
      return;
    }

    createTerm(
      {
        school_id: school.id,
        academic_session_id: formData.academicSessionId,
        name: formData.name,
        start_date: formData.startDate,
        end_date: formData.endDate,
      },
      {
        onSuccess: () => {
          toast.success("Term created successfully!");

          setFormData({
            academicSessionId: "",
            name: "",
            startDate: "",
            endDate: "",
          });

          onClose?.();
        },
        onError: (error) => {
          if (error.code === "23505") {
            toast.error(
              "This term already exists in the selected academic session.",
            );
          } else {
            toast.error(error.message || "Failed to create term.");
          }
        },
      },
    );
  }

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Create Academic Term
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Add a term to an academic session.
          </p>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        {/* Academic Session */}
        <div>
          <label
            htmlFor="academicSessionId"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Academic Session
          </label>

          <select
            id="academicSessionId"
            name="academicSessionId"
            value={formData.academicSessionId}
            onChange={handleChange}
            disabled={sessionsLoading || sessionsError || isPending}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-gray-100"
          >
            <option value="">
              {sessionsLoading
                ? "Loading sessions..."
                : "Select academic session"}
            </option>

            {sessions.map((session) => (
              <option key={session.id} value={session.id}>
                {session.name}
              </option>
            ))}
          </select>

          {sessionsError && (
            <p className="mt-2 text-sm text-red-600">
              Failed to load academic sessions. Please try again.
            </p>
          )}

          {!sessionsLoading && !sessionsError && sessions.length === 0 && (
            <p className="mt-2 text-sm text-amber-600">
              Create an academic session before adding a term.
            </p>
          )}
        </div>

        {/* Term Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-gray-700"
          >
            Term Name
          </label>

          <select
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!formData.academicSessionId || isPending}
            required
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-gray-100"
          >
            <option value="">Select term</option>
            <option value="First Term">First Term</option>
            <option value="Second Term">Second Term</option>
            <option value="Third Term">Third Term</option>
          </select>
        </div>

        {/* Date Fields */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Start Date
            </label>

            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              min={selectedSession?.start_date}
              max={selectedSession?.end_date}
              onChange={handleChange}
              disabled={!selectedSession || isPending}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              End Date
            </label>

            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              min={
                formData.startDate
                  ? formData.startDate
                  : selectedSession?.start_date
              }
              max={selectedSession?.end_date}
              onChange={handleChange}
              disabled={!selectedSession || isPending}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Selected Session Information */}
        {selectedSession && (
          <div className="flex gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
            <CalendarDays size={20} className="shrink-0" />

            <div>
              <p className="font-semibold">{selectedSession.name}</p>
              <p className="mt-1 text-blue-700">
                Session period: {selectedSession.start_date} to{" "}
                {selectedSession.end_date}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={
              isPending ||
              sessionsLoading ||
              sessionsError ||
              sessions.length === 0
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? (
              <>
                <LoaderCircle size={18} className="animate-spin" />
                Creating Term...
              </>
            ) : (
              <>
                <Plus size={18} />
                Create Term
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
