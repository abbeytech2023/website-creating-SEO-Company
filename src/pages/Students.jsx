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
import StudentTable from "../components/StudentTable";

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
      const search = search_term.trim().toLowerCase();

      const full_name = [
        student.first_name,
        student.middle_name,
        student.last_name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matches_search =
        !search ||
        full_name.includes(search) ||
        (student.admission_number || "").toLowerCase().includes(search) ||
        (student.parent_phone || "").toLowerCase().includes(search) ||
        (student.class_name || "").toLowerCase().includes(search);

      const matches_class =
        class_filter === "All Classes" || student.class_name === class_filter;

      const matches_status =
        status_filter === "All Status" ||
        student.status?.toLowerCase() === status_filter.toLowerCase();

      return matches_search && matches_class && matches_status;
    });
  }, [students, search_term, class_filter, status_filter]);

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
        <StudentTable
          students={students}
          filtered_students={filtered_students}
          search_term={search_term}
          on_search_change={set_search_term}
          // on_view_student={(student) => console.log(student)}
        />
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
