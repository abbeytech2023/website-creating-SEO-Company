import { useState, useMemo } from "react";

import {
  Search,
  Filter,
  MoreHorizontal,
  Users,
  Eye,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { get_initials } from "../utility/getStudentInitials";
import { format_date } from "../utility/formatDate";

// STUDENT DETAIL
function StudentDetail({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-slate-400">{label}</p>

      <div className="mt-1 break-words text-sm font-medium text-slate-700">
        {value || "-"}
      </div>
    </div>
  );
}

// STATUS BADGE
function StatusBadge({ status }) {
  const is_active = status === "active";

  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
        is_active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
          is_active ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />

      {status || "Unknown"}
    </span>
  );
}

// ACTION MENU
function ActionMenu({ on_view, on_edit, on_delete, on_close }) {
  return (
    <div className="absolute right-0 top-full z-30 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
      <button
        onClick={on_view}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
      >
        <Eye size={16} />
        View Student
      </button>

      <button
        onClick={on_edit}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50"
      >
        <Pencil size={16} />
        Edit Student
      </button>

      <button
        onClick={on_delete}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50"
      >
        <Trash2 size={16} />
        Delete Student
      </button>

      <div className="my-1 border-t border-slate-100" />

      <button
        onClick={on_close}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 transition hover:bg-slate-50"
      >
        <X size={16} />
        Close
      </button>
    </div>
  );
}

// MAIN COMPONENT
export default function StudentTable({
  students = [],
  filtered_students,
  search_term = "",
  on_search_change,
  on_view_student,
  on_edit_student,
  on_delete_student,
}) {
  const [class_filter, set_class_filter] = useState("All Classes");
  const [status_filter, set_status_filter] = useState("All Status");
  const [open_menu, set_open_menu] = useState(null);

  // GET UNIQUE CLASS NAMES
  const classes = useMemo(() => {
    return [
      ...new Set(students.map((student) => student.class_name).filter(Boolean)),
    ];
  }, [students]);

  // APPLY FILTERS
  const visible_students = useMemo(() => {
    const source_students = filtered_students ?? students;

    return source_students.filter((student) => {
      const matches_class =
        class_filter === "All Classes" || student.class_name === class_filter;

      const matches_status =
        status_filter === "All Status" ||
        student.status === status_filter.toLowerCase();

      return matches_class && matches_status;
    });
  }, [students, filtered_students, class_filter, status_filter]);

  // HANDLE ACTIONS
  const handle_action = (callback, student) => {
    set_open_menu(null);

    if (callback) {
      callback(student);
    }
  };

  return (
    <div className="w-full min-w-0">
      <div className="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* FILTERS */}
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* SEARCH */}
            <div className="relative w-full min-w-0 lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search student or admission number..."
                value={search_term}
                onChange={(event) => on_search_change?.(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            {/* FILTERS */}
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:w-auto">
              {/* CLASS FILTER */}
              <div className="relative min-w-0">
                <Filter
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <select
                  value={class_filter}
                  onChange={(event) => set_class_filter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 outline-none transition focus:border-emerald-500 sm:min-w-40"
                >
                  <option>All Classes</option>

                  {classes.map((class_name) => (
                    <option key={class_name} value={class_name}>
                      {class_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* STATUS FILTER */}
              <select
                value={status_filter}
                onChange={(event) => set_status_filter(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 sm:min-w-36"
              >
                <option>All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
                <option value="withdrawn">Withdrawn</option>
              </select>
            </div>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div className="border-b border-slate-100 px-4 py-3 sm:px-5">
          <p className="text-xs text-slate-500 sm:text-sm">
            Showing{" "}
            <span className="font-semibold text-slate-700">
              {visible_students.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-700">
              {students.length}
            </span>{" "}
            students
          </p>
        </div>

        {/* DESKTOP CSS GRID */}
        <div className="hidden md:block">
          {/* GRID HEADER */}
          <div className="grid grid-cols-[2fr_1.2fr_1fr_0.8fr_1.2fr_0.9fr_50px] items-center gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4">
            {[
              "Student",
              "Admission No.",
              "Class",
              "Gender",
              "Date of Birth",
              "Status",
              "",
            ].map((heading, index) => (
              <p
                key={index}
                className="text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                {heading}
              </p>
            ))}
          </div>

          {/* GRID ROWS */}
          <div className="divide-y divide-slate-100">
            {visible_students.map((student) => (
              <div
                key={student.id}
                className="grid grid-cols-[2fr_1.2fr_1fr_0.8fr_1.2fr_0.9fr_50px] items-center gap-3 px-5 py-4 transition hover:bg-slate-50"
              >
                {/* STUDENT */}
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                    {get_initials(student)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {student.first_name} {student.middle_name}{" "}
                      {student.last_name}
                    </p>

                    <p className="truncate text-xs text-slate-500">
                      {student.parent_phone || "-"}
                    </p>
                  </div>
                </div>

                {/* ADMISSION NUMBER */}
                <p className="truncate text-sm font-medium text-slate-700">
                  {student.admission_number || "-"}
                </p>

                {/* CLASS */}
                <div className="min-w-0">
                  <span className="inline-block max-w-full truncate rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                    {student.class_name || "-"}
                  </span>
                </div>

                {/* GENDER */}
                <p className="truncate text-sm text-slate-600">
                  {student.gender || "-"}
                </p>

                {/* DATE OF BIRTH */}
                <p className="truncate text-sm text-slate-600">
                  {student.date_of_birth
                    ? format_date(student.date_of_birth)
                    : "-"}
                </p>

                {/* STATUS */}
                <div>
                  <StatusBadge status={student.status} />
                </div>

                {/* ACTION */}
                <div className="relative flex justify-end">
                  <button
                    onClick={() =>
                      set_open_menu(
                        open_menu === student.id ? null : student.id,
                      )
                    }
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <MoreHorizontal size={20} />
                  </button>

                  {open_menu === student.id && (
                    <ActionMenu
                      on_view={() => handle_action(on_view_student, student)}
                      on_edit={() => handle_action(on_edit_student, student)}
                      on_delete={() =>
                        handle_action(on_delete_student, student)
                      }
                      on_close={() => set_open_menu(null)}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE STUDENT CARDS */}
        <div className="divide-y divide-slate-100 md:hidden">
          {visible_students.map((student) => (
            <div key={student.id} className="relative p-4 sm:p-5">
              {/* STUDENT HEADER */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                    {get_initials(student)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-semibold text-slate-900">
                      {student.first_name} {student.last_name}
                    </h3>

                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {student.admission_number || "-"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    set_open_menu(open_menu === student.id ? null : student.id)
                  }
                  className="shrink-0 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* STUDENT DETAILS */}
              <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
                <StudentDetail label="Class" value={student.class_name} />

                <StudentDetail label="Gender" value={student.gender} />

                <StudentDetail
                  label="Date of Birth"
                  value={
                    student.date_of_birth
                      ? format_date(student.date_of_birth)
                      : "-"
                  }
                />

                <StudentDetail
                  label="Parent Phone"
                  value={student.parent_phone}
                />

                <StudentDetail
                  label="Status"
                  value={<StatusBadge status={student.status} />}
                />
              </div>

              {/* MOBILE ACTION MENU */}
              {open_menu === student.id && (
                <div className="absolute right-4 top-14 z-30">
                  <ActionMenu
                    on_view={() => handle_action(on_view_student, student)}
                    on_edit={() => handle_action(on_edit_student, student)}
                    on_delete={() => handle_action(on_delete_student, student)}
                    on_close={() => set_open_menu(null)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {visible_students.length === 0 && (
          <div className="px-5 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <Users size={24} className="text-slate-400" />
            </div>

            <h3 className="mt-4 font-semibold text-slate-900">
              No students found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
