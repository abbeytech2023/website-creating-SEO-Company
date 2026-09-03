import { useMemo, useState } from "react";
import {
  BookOpen,
  Search,
  Plus,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Users,
  GraduationCap,
  CheckCircle2,
  XCircle,
  Link2,
} from "lucide-react";

const mockSubjects = [
  {
    id: 1,
    name: "English Studies",
    code: "ENG",
    description: "English language, grammar, comprehension and literature.",
    teacherCount: 3,
    classCount: 6,
    assignmentCount: 8,
    status: "Active",
  },
  {
    id: 2,
    name: "Mathematics",
    code: "MTH",
    description: "Mathematics and problem-solving skills.",
    teacherCount: 4,
    classCount: 6,
    assignmentCount: 10,
    status: "Active",
  },
  {
    id: 3,
    name: "Basic Science",
    code: "BSC",
    description: "Basic scientific concepts and practical knowledge.",
    teacherCount: 2,
    classCount: 4,
    assignmentCount: 5,
    status: "Active",
  },
  {
    id: 4,
    name: "Social Studies",
    code: "SOS",
    description: "Society, culture, geography and civic awareness.",
    teacherCount: 2,
    classCount: 4,
    assignmentCount: 6,
    status: "Active",
  },
  {
    id: 5,
    name: "Computer Studies",
    code: "CST",
    description: "Computer literacy, ICT and digital skills.",
    teacherCount: 2,
    classCount: 5,
    assignmentCount: 7,
    status: "Active",
  },
  {
    id: 6,
    name: "Business Studies",
    code: "BST",
    description: "Introduction to business, commerce and entrepreneurship.",
    teacherCount: 1,
    classCount: 3,
    assignmentCount: 3,
    status: "Active",
  },
  {
    id: 7,
    name: "Civic Education",
    code: "CVE",
    description: "Citizenship, rights, responsibilities and governance.",
    teacherCount: 2,
    classCount: 4,
    assignmentCount: 4,
    status: "Active",
  },
  {
    id: 8,
    name: "Agricultural Science",
    code: "AGR",
    description: "Agriculture, farming practices and environmental studies.",
    teacherCount: 1,
    classCount: 2,
    assignmentCount: 2,
    status: "Inactive",
  },
];

const subjectAssignments = {
  1: [
    { teacher: "Samuel Adekunle", class: "JSS 1A" },
    { teacher: "Samuel Adekunle", class: "JSS 1B" },
    { teacher: "Grace Eze", class: "JSS 2A" },
    { teacher: "Grace Eze", class: "JSS 2B" },
  ],
  2: [
    { teacher: "John Adebayo", class: "JSS 1A" },
    { teacher: "John Adebayo", class: "JSS 2A" },
    { teacher: "Peter Williams", class: "JSS 1B" },
    { teacher: "Mary Okafor", class: "JSS 2B" },
  ],
  3: [
    { teacher: "Mary Okafor", class: "JSS 1B" },
    { teacher: "Mary Okafor", class: "JSS 2B" },
  ],
  4: [
    { teacher: "Grace Eze", class: "JSS 1A" },
    { teacher: "Grace Eze", class: "JSS 2A" },
  ],
};

function StatCard({ icon: Icon, title, value, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>

          <p className="mt-1 text-xs text-slate-400">{description}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      {active ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
      {status}
    </span>
  );
}

function ActionMenu({ subject, onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <MoreVertical size={19} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onView(subject);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              <Eye size={16} />
              View Subject
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onEdit(subject);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              <Pencil size={16} />
              Edit Subject
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onDelete(subject);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
            >
              <Trash2 size={16} />
              Delete Subject
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Subjects() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const filteredSubjects = useMemo(() => {
    return mockSubjects.filter((subject) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        subject.name.toLowerCase().includes(searchText) ||
        subject.code.toLowerCase().includes(searchText) ||
        subject.description.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || subject.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const totalSubjects = mockSubjects.length;

  const activeSubjects = mockSubjects.filter(
    (subject) => subject.status === "Active",
  ).length;

  const inactiveSubjects = mockSubjects.filter(
    (subject) => subject.status === "Inactive",
  ).length;

  const totalAssignments = mockSubjects.reduce(
    (total, subject) => total + subject.assignmentCount,
    0,
  );

  const handleView = (subject) => {
    setSelectedSubject(subject);
  };

  const handleEdit = (subject) => {
    console.log("Edit subject:", subject);
  };

  const handleDelete = (subject) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${subject.name}?`,
    );

    if (confirmed) {
      console.log("Delete subject:", subject);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-emerald-600">
              <BookOpen size={17} />
              <span className="font-medium">Academic Management</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Subjects
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage subjects and their teacher/class assignments.
            </p>
          </div>

          <button
            type="button"
            onClick={() => console.log("Add subject")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Plus size={18} />
            Add Subject
          </button>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={BookOpen}
            title="Total Subjects"
            value={totalSubjects}
            description="All subjects in school"
          />

          <StatCard
            icon={CheckCircle2}
            title="Active Subjects"
            value={activeSubjects}
            description="Currently available"
          />

          <StatCard
            icon={XCircle}
            title="Inactive Subjects"
            value={inactiveSubjects}
            description="Not currently active"
          />

          <StatCard
            icon={Link2}
            title="Assignments"
            value={totalAssignments}
            description="Teacher-class assignments"
          />
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Filters */}
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex flex-col gap-3 md:flex-row">
              {/* Search */}
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by subject name, code or description..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Subject
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Code
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Teachers
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Classes
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Assignments
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredSubjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-600">
                          {subject.name.charAt(0)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {subject.name}
                          </p>

                          <p className="mt-0.5 max-w-xs truncate text-xs text-slate-400">
                            {subject.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                        {subject.code}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Users size={16} className="text-slate-400" />
                        {subject.teacherCount}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-700">
                        <GraduationCap size={16} className="text-slate-400" />
                        {subject.classCount}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-semibold text-slate-700">
                        {subject.assignmentCount}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={subject.status} />
                    </td>

                    <td className="px-5 py-4 text-right">
                      <ActionMenu
                        subject={subject}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-100 md:hidden">
            {filteredSubjects.map((subject) => (
              <div key={subject.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-600">
                      {subject.name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-900">
                        {subject.name}
                      </h3>

                      <p className="mt-0.5 text-xs text-slate-400">
                        Code: {subject.code}
                      </p>
                    </div>
                  </div>

                  <ActionMenu
                    subject={subject}
                    onView={handleView}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {subject.description}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <Users size={16} className="mx-auto mb-1 text-slate-400" />
                    <p className="text-sm font-bold text-slate-800">
                      {subject.teacherCount}
                    </p>
                    <p className="text-[11px] text-slate-400">Teachers</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <GraduationCap
                      size={16}
                      className="mx-auto mb-1 text-slate-400"
                    />
                    <p className="text-sm font-bold text-slate-800">
                      {subject.classCount}
                    </p>
                    <p className="text-[11px] text-slate-400">Classes</p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <Link2 size={16} className="mx-auto mb-1 text-slate-400" />
                    <p className="text-sm font-bold text-slate-800">
                      {subject.assignmentCount}
                    </p>
                    <p className="text-[11px] text-slate-400">Assignments</p>
                  </div>
                </div>

                <div className="mt-4">
                  <StatusBadge status={subject.status} />
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredSubjects.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <BookOpen size={25} />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No subjects found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filter.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* View Subject Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 p-5 sm:p-6">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-600">
                    {selectedSubject.name.charAt(0)}
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {selectedSubject.name}
                    </h2>

                    <p className="text-sm text-slate-400">
                      Subject Code: {selectedSubject.code}
                    </p>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <XCircle size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="max-h-[70vh] overflow-y-auto p-5 sm:p-6">
              <div className="mb-6 rounded-xl bg-slate-50 p-4">
                <p className="text-sm leading-6 text-slate-600">
                  {selectedSubject.description}
                </p>
              </div>

              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Teachers & Classes
                  </h3>

                  <p className="text-xs text-slate-400">
                    Current teaching assignments
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {selectedSubject.assignmentCount} assignments
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200">
                {subjectAssignments[selectedSubject.id]?.length > 0 ? (
                  <div className="divide-y divide-slate-100">
                    {subjectAssignments[selectedSubject.id].map(
                      (assignment, index) => (
                        <div
                          key={`${assignment.teacher}-${assignment.class}-${index}`}
                          className="flex items-center justify-between gap-4 p-4"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                              {assignment.teacher
                                .split(" ")
                                .map((name) => name[0])
                                .slice(0, 2)
                                .join("")}
                            </div>

                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-slate-800">
                                {assignment.teacher}
                              </p>

                              <p className="text-xs text-slate-400">Teacher</p>
                            </div>
                          </div>

                          <div className="shrink-0 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                            {assignment.class}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Link2 size={25} className="mx-auto text-slate-300" />

                    <p className="mt-2 text-sm text-slate-500">
                      No teacher assignments yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end border-t border-slate-200 p-4 sm:p-5">
              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
