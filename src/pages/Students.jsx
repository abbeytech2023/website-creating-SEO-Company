import { useMemo, useState } from "react";
import AddStudentForm from "../components/AddStudentForm";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("All Classes");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [openMenu, setOpenMenu] = useState(null);

  // =========================
  // ADD STUDENT FORM STATE
  // =========================

  const [showAddStudent, setShowAddStudent] = useState(false);

  // Mock student data
  const students = [
    {
      id: 1,
      admissionNumber: "GHS/2026/001",
      firstName: "David",
      middleName: "John",
      lastName: "Adeyemi",
      gender: "Male",
      dateOfBirth: "2012-04-15",
      class: "JSS 1A",
      status: "Active",
      phone: "08012345678",
    },
    {
      id: 2,
      admissionNumber: "GHS/2026/002",
      firstName: "Sarah",
      middleName: "Grace",
      lastName: "Okafor",
      gender: "Female",
      dateOfBirth: "2012-07-21",
      class: "JSS 1A",
      status: "Active",
      phone: "08023456789",
    },
    {
      id: 3,
      admissionNumber: "GHS/2026/003",
      firstName: "Michael",
      middleName: "David",
      lastName: "Johnson",
      gender: "Male",
      dateOfBirth: "2011-11-03",
      class: "JSS 1B",
      status: "Active",
      phone: "08034567890",
    },
    {
      id: 4,
      admissionNumber: "GHS/2026/004",
      firstName: "Esther",
      middleName: "Peace",
      lastName: "Williams",
      gender: "Female",
      dateOfBirth: "2012-01-18",
      class: "JSS 1B",
      status: "Active",
      phone: "08045678901",
    },
    {
      id: 5,
      admissionNumber: "GHS/2026/005",
      firstName: "Daniel",
      middleName: "Samuel",
      lastName: "Bello",
      gender: "Male",
      dateOfBirth: "2010-09-12",
      class: "JSS 2A",
      status: "Active",
      phone: "08056789012",
    },
    {
      id: 6,
      admissionNumber: "GHS/2026/006",
      firstName: "Blessing",
      middleName: "Mary",
      lastName: "Adebayo",
      gender: "Female",
      dateOfBirth: "2011-02-28",
      class: "JSS 2A",
      status: "Active",
      phone: "08067890123",
    },
    {
      id: 7,
      admissionNumber: "GHS/2026/007",
      firstName: "Samuel",
      middleName: "Peter",
      lastName: "Olawale",
      gender: "Male",
      dateOfBirth: "2010-06-17",
      class: "JSS 2B",
      status: "Inactive",
      phone: "08078901234",
    },
    {
      id: 8,
      admissionNumber: "GHS/2026/008",
      firstName: "Mary",
      middleName: "Jane",
      lastName: "Eze",
      gender: "Female",
      dateOfBirth: "2010-12-09",
      class: "JSS 2B",
      status: "Active",
      phone: "08089012345",
    },
  ];

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`;

      const matchesSearch =
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.admissionNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesClass =
        classFilter === "All Classes" || student.class === classFilter;

      const matchesStatus =
        statusFilter === "All Status" || student.status === statusFilter;

      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [searchTerm, classFilter, statusFilter]);

  const getInitials = (student) => {
    return `${student.firstName[0]}${student.lastName[0]}`.toUpperCase();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================
  // SHOW ADD STUDENT FORM
  // =========================

  if (showAddStudent) {
    return (
      <AddStudentForm
        setShowAddStudent={setShowAddStudent}
        showAddStudent={showAddStudent}
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
              onClick={() => setShowAddStudent(true)}
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
            value={students.filter((s) => s.status === "Active").length}
          />

          <SummaryCard
            label="Male Students"
            value={students.filter((s) => s.gender === "Male").length}
          />

          <SummaryCard
            label="Female Students"
            value={students.filter((s) => s.gender === "Female").length}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                    value={classFilter}
                    onChange={(e) => setClassFilter(e.target.value)}
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
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 sm:w-36"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* RESULTS COUNT */}

          <div className="border-b border-slate-100 px-5 py-3">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredStudents.length}
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
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="transition hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                          {getInitials(student)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {student.firstName} {student.middleName}{" "}
                            {student.lastName}
                          </p>

                          <p className="text-xs text-slate-500">
                            {student.phone}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {student.admissionNumber}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-700">
                        {student.class}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {student.gender}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(student.dateOfBirth)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={student.status} />
                    </td>

                    <td className="relative px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === student.id ? null : student.id,
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreHorizontal size={20} />
                      </button>

                      {openMenu === student.id && <ActionMenu />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}

          <div className="divide-y divide-slate-100 md:hidden">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                      {getInitials(student)}
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {student.firstName} {student.lastName}
                      </h3>

                      <p className="text-xs text-slate-500">
                        {student.admissionNumber}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === student.id ? null : student.id)
                    }
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
                  >
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <StudentDetail label="Class" value={student.class} />

                  <StudentDetail label="Gender" value={student.gender} />

                  <StudentDetail
                    label="Date of Birth"
                    value={formatDate(student.dateOfBirth)}
                  />

                  <StudentDetail
                    label="Status"
                    value={<StatusBadge status={student.status} />}
                  />
                </div>

                {openMenu === student.id && (
                  <div className="mt-4">
                    <ActionMenu />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}

          {filteredStudents.length === 0 && (
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

          {filteredStudents.length > 0 && (
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
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        isActive
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-emerald-500" : "bg-slate-400"
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
