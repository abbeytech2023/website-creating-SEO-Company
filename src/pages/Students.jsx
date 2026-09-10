import { useMemo, useState } from "react";

import AddStudentForm from "../components/AddStudentForm";
import { useStudents } from "../hooks/useStudents";

import {
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Users,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

export default function Students() {
  const [search_term, set_search_term] = useState("");
  const [class_filter, set_class_filter] = useState("All Classes");
  const [status_filter, set_status_filter] = useState("All Status");
  const [open_menu, set_open_menu] = useState(null);

  const { students = [], isLoading, error } = useStudents();

  // =========================
  // ADD STUDENT FORM STATE
  // =========================

  const [show_add_student, set_show_add_student] = useState(false);

  // =========================
  // FILTER STUDENTS
  // =========================

  const filtered_students = useMemo(() => {
    return students.filter((student) => {
      const full_name = `${student.first_name || ""} ${
        student.middle_name || ""
      } ${student.last_name || ""}`;

      const matches_search =
        full_name.toLowerCase().includes(search_term.toLowerCase()) ||
        (student.admission_number || "")
          .toLowerCase()
          .includes(search_term.toLowerCase());

      const matches_class =
        class_filter === "All Classes" || student.class_name === class_filter;

      const matches_status =
        status_filter === "All Status" || student.status === status_filter;

      return matches_search && matches_class && matches_status;
    });
  }, [students, search_term, class_filter, status_filter]);

  // =========================
  // GET INITIALS
  // =========================

  const get_initials = (student) => {
    const first_initial = student.first_name?.[0] || "";
    const last_initial = student.last_name?.[0] || "";

    return `${first_initial}${last_initial}`.toUpperCase();
  };

  // =========================
  // FORMAT DATE
  // =========================

  const format_date = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // LOADING
  // =========================

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading students...</p>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-red-500">{error.message}</p>
      </div>
    );
  }

  // =========================
  // SHOW ADD STUDENT FORM
  // =========================

  if (show_add_student) {
    return (
      <AddStudentForm
        setShowAddStudent={set_show_add_student}
        showAddStudent={show_add_student}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* =========================
          PAGE HEADER
      ========================== */}

      <div className="border-b border-slate-200 bg-white">
        <div className="px-5 py-6 sm:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Students
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage all students enrolled in your school.
              </p>
            </div>

            {/* ADD STUDENT BUTTON */}

            <button
              type="button"
              onClick={() => set_show_add_student(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <Plus size={18} />
              Add Student
            </button>
          </div>
        </div>
      </div>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <div className="p-5 sm:p-8">
        {/* SUMMARY CARDS */}

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={<Users size={20} />}
            label="Total Students"
            value={students.length}
          />

          <SummaryCard
            label="Active Students"
            value={
              students.filter((student) => student.status === "active").length
            }
          />

          <SummaryCard
            label="Male Students"
            value={
              students.filter((student) => student.gender === "Male").length
            }
          />

          <SummaryCard
            label="Female Students"
            value={
              students.filter((student) => student.gender === "Female").length
            }
          />
        </div>

        {/* =========================
            STUDENT TABLE
        ========================== */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* FILTERS */}

          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* SEARCH */}

              <div className="relative w-full lg:max-w-md">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  placeholder="Search student or admission number..."
                  value={search_term}
                  onChange={(event) => set_search_term(event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* FILTERS */}

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <Filter
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <select
                    value={class_filter}
                    onChange={(event) => set_class_filter(event.target.value)}
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-700 outline-none focus:border-emerald-500 sm:w-44"
                  >
                    <option>All Classes</option>
                    <option>JSS 1A</option>
                    <option>JSS 1B</option>
                    <option>JSS 2A</option>
                    <option>JSS 2B</option>
                  </select>
                </div>

                <select
                  value={status_filter}
                  onChange={(event) => set_status_filter(event.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 sm:w-36"
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

          <div className="border-b border-slate-100 px-5 py-3">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filtered_students.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-slate-700">
                {students.length}
              </span>{" "}
              students
            </p>
          </div>

          {/* DESKTOP TABLE */}

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Student
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Admission No.
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Class
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Gender
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Date of Birth
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filtered_students.map((student) => (
                  <tr key={student.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                          {get_initials(student)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {student.first_name} {student.middle_name}{" "}
                            {student.last_name}
                          </p>

                          <p className="text-xs text-slate-500">
                            {student.parent_phone || "-"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {student.admission_number}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                        {student.class_name}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.gender}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {format_date(student.date_of_birth)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={student.status} />
                    </td>

                    <td className="relative px-5 py-4 text-right">
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

                      {open_menu === student.id && <ActionMenu />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}

          <div className="divide-y divide-slate-100 md:hidden">
            {filtered_students.map((student) => (
              <div key={student.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                      {get_initials(student)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {student.first_name} {student.last_name}
                      </h3>

                      <p className="text-xs text-slate-500">
                        {student.admission_number}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      set_open_menu(
                        open_menu === student.id ? null : student.id,
                      )
                    }
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <StudentDetail label="Class" value={student.class_name} />

                  <StudentDetail label="Gender" value={student.gender} />

                  <StudentDetail
                    label="Date of Birth"
                    value={format_date(student.date_of_birth)}
                  />

                  <StudentDetail
                    label="Status"
                    value={<StatusBadge status={student.status} />}
                  />
                </div>

                {open_menu === student.id && (
                  <div className="mt-4">
                    <ActionMenu />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}

          {filtered_students.length === 0 && (
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

          {/* PAGINATION */}

          {filtered_students.length > 0 && (
            <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
              <p className="text-xs text-slate-500 sm:text-sm">Page 1 of 1</p>

              <div className="flex items-center gap-2">
                <button
                  disabled
                  className="rounded-lg border border-slate-200 p-2 text-slate-300"
                >
                  <ChevronLeft size={17} />
                </button>

                <button className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white">
                  1
                </button>

                <button
                  disabled
                  className="rounded-lg border border-slate-200 p-2 text-slate-300"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================
   SUMMARY CARD
========================================= */

function SummaryCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          {icon || <Users size={20} />}
        </div>

        <span className="text-2xl font-bold text-slate-900">{value}</span>
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

/* =========================================
   STATUS BADGE
========================================= */

function StatusBadge({ status }) {
  const is_active = status === "active";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        is_active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
          is_active ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />

      {status}
    </span>
  );
}

/* =========================================
   STUDENT DETAIL
========================================= */

function StudentDetail({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>

      <div className="mt-1 text-sm font-medium text-slate-700">{value}</div>
    </div>
  );
}

/* =========================================
   ACTION MENU
========================================= */

function ActionMenu() {
  return (
    <div className="absolute right-5 z-20 w-44 rounded-xl border border-slate-200 bg-white p-1.5 text-left shadow-lg">
      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
        <Eye size={16} />
        View Student
      </button>

      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
        <Pencil size={16} />
        Edit Student
      </button>

      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50">
        <Trash2 size={16} />
        Delete Student
      </button>
    </div>
  );
}
