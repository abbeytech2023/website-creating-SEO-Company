import React, { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  UserCheck,
  BookOpen,
  GraduationCap,
} from "lucide-react";

export default function Teachers() {
  const [search, setSearch] = useState("");

  const teachers = [
    {
      id: 1,
      name: "Mr. Adewale",
      staffId: "TCH001",
      assignments: [
        { subject: "Mathematics", className: "JSS 1A" },
        { subject: "Mathematics", className: "JSS 1B" },
      ],
    },
    {
      id: 2,
      name: "Mrs. Adebisi",
      staffId: "TCH002",
      assignments: [
        { subject: "English Language", className: "JSS 1A" },
        { subject: "English Language", className: "JSS 1B" },
        { subject: "Literature", className: "SS 1A" },
      ],
    },
    {
      id: 3,
      name: "Mr. Oladipo",
      staffId: "TCH003",
      assignments: [
        { subject: "Basic Science", className: "JSS 2A" },
        { subject: "Basic Science", className: "JSS 2B" },
      ],
    },
    {
      id: 4,
      name: "Mrs. Funke",
      staffId: "TCH004",
      assignments: [
        { subject: "Social Studies", className: "JSS 2A" },
        { subject: "Civic Education", className: "JSS 2B" },
      ],
    },
    {
      id: 5,
      name: "Mr. Ibrahim",
      staffId: "TCH005",
      assignments: [
        { subject: "Mathematics", className: "JSS 3A" },
        { subject: "Mathematics", className: "JSS 3B" },
        { subject: "Further Mathematics", className: "SS 1A" },
      ],
    },
    {
      id: 6,
      name: "Mrs. Grace",
      staffId: "TCH006",
      assignments: [
        { subject: "English Language", className: "JSS 3A" },
        { subject: "English Language", className: "JSS 3B" },
      ],
    },
    {
      id: 7,
      name: "Mr. Samuel",
      staffId: "TCH007",
      assignments: [
        { subject: "Biology", className: "SS 1A" },
        { subject: "Biology", className: "SS 2A" },
      ],
    },
    {
      id: 8,
      name: "Mrs. Esther",
      staffId: "TCH008",
      assignments: [
        { subject: "Chemistry", className: "SS 1B" },
        { subject: "Chemistry", className: "SS 2B" },
      ],
    },
    {
      id: 9,
      name: "Mr. Daniel",
      staffId: "TCH009",
      assignments: [
        { subject: "Physics", className: "SS 2A" },
        { subject: "Physics", className: "SS 3A" },
      ],
    },
    {
      id: 10,
      name: "Mrs. Victoria",
      staffId: "TCH010",
      assignments: [
        { subject: "Economics", className: "SS 2B" },
        { subject: "Economics", className: "SS 3B" },
      ],
    },
    {
      id: 11,
      name: "Mr. Emmanuel",
      staffId: "TCH011",
      assignments: [
        { subject: "Government", className: "SS 2A" },
        { subject: "Government", className: "SS 3A" },
      ],
    },
    {
      id: 12,
      name: "Mrs. Blessing",
      staffId: "TCH012",
      assignments: [
        { subject: "Literature", className: "SS 2A" },
        { subject: "Literature", className: "SS 3B" },
      ],
    },
    {
      id: 13,
      name: "Mr. Joseph",
      staffId: "TCH013",
      assignments: [
        { subject: "Computer Studies", className: "JSS 1A" },
        { subject: "Computer Studies", className: "JSS 2A" },
        { subject: "Computer Studies", className: "JSS 3A" },
      ],
    },
    {
      id: 14,
      name: "Mrs. Ruth",
      staffId: "TCH014",
      assignments: [
        { subject: "Civic Education", className: "JSS 2A" },
        { subject: "Civic Education", className: "JSS 3A" },
      ],
    },
    {
      id: 15,
      name: "Mr. Michael",
      staffId: "TCH015",
      assignments: [
        { subject: "Agricultural Science", className: "JSS 3A" },
        { subject: "Agricultural Science", className: "SS 1A" },
      ],
    },
    {
      id: 16,
      name: "Mrs. Janet",
      staffId: "TCH016",
      assignments: [
        { subject: "Yoruba", className: "JSS 2B" },
        { subject: "Yoruba", className: "JSS 3B" },
      ],
    },
    {
      id: 17,
      name: "Mr. Peter",
      staffId: "TCH017",
      assignments: [
        { subject: "Physical & Health Education", className: "SS 1A" },
        { subject: "Physical & Health Education", className: "SS 2A" },
      ],
    },
    {
      id: 18,
      name: "Mrs. Helen",
      staffId: "TCH018",
      assignments: [
        { subject: "Christian Religious Studies", className: "SS 2A" },
        { subject: "Christian Religious Studies", className: "SS 3A" },
      ],
    },
  ];

  const filteredTeachers = teachers.filter((teacher) => {
    const searchTerm = search.toLowerCase();

    const teacherName = teacher.name.toLowerCase();
    const staffId = teacher.staffId.toLowerCase();

    const assignments = teacher.assignments
      .map((assignment) => `${assignment.subject} ${assignment.className}`)
      .join(" ")
      .toLowerCase();

    return (
      teacherName.includes(searchTerm) ||
      staffId.includes(searchTerm) ||
      assignments.includes(searchTerm)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Teachers</h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage teachers, subjects and class assignments
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Plus size={17} />
            Add Teacher
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {/* Statistics */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            icon={Users}
            title="Total Teachers"
            value={teachers.length}
            description="Teaching staff"
          />

          <StatCard
            icon={UserCheck}
            title="Active Teachers"
            value={18}
            description="Currently active"
          />

          <StatCard
            icon={BookOpen}
            title="Assignments"
            value={teachers.reduce(
              (total, teacher) => total + teacher.assignments.length,
              0,
            )}
            description="Subject & class assignments"
          />
        </div>

        {/* Search */}
        <div className="mb-4 rounded-2xl border bg-white p-4">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teacher, subject or class..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
            />
          </div>
        </div>

        {/* Teachers List */}
        <div className="overflow-hidden rounded-2xl border bg-white">
          {/* Table Header */}
          <div className="hidden grid-cols-4 border-b bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
            <span>Teacher</span>
            <span>Staff ID</span>
            <span>Subjects & Classes</span>
            <span className="text-right">Actions</span>
          </div>

          {filteredTeachers.map((teacher) => (
            <TeacherRow key={teacher.id} teacher={teacher} />
          ))}

          {/* Empty State */}
          {filteredTeachers.length === 0 && (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Users size={22} />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No teachers found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try searching with another name, subject or class.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* =========================================
   TEACHER ROW
========================================= */

function TeacherRow({ teacher }) {
  return (
    <div className="border-b last:border-b-0">
      <div className="grid gap-5 px-5 py-5 md:grid-cols-4 md:items-center">
        {/* Teacher */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-600">
            {teacher.name.charAt(0)}
          </div>

          <div>
            <p className="font-semibold text-slate-900">{teacher.name}</p>

            <p className="mt-1 text-xs text-slate-500">
              {teacher.assignments.length} teaching assignment
              {teacher.assignments.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Staff ID */}
        <div className="text-sm text-slate-600">
          <span className="md:hidden font-medium text-slate-400">
            Staff ID:{" "}
          </span>

          {teacher.staffId}
        </div>

        {/* Assignments */}
        <div>
          <div className="space-y-2">
            {teacher.assignments.map((assignment, index) => (
              <div key={index} className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 px-2.5 py-1.5 text-xs font-semibold text-indigo-700">
                  <BookOpen size={13} />
                  {assignment.subject}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                  <GraduationCap size={13} />
                  {assignment.className}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-start gap-2 md:justify-end">
          <button
            type="button"
            title="View teacher"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Eye size={16} />
          </button>

          <button
            type="button"
            title="Edit teacher"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            title="Delete teacher"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================
   STAT CARD
========================================= */

function StatCard({ icon: Icon, title, value, description }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>

          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}
