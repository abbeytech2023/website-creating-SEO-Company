import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  School,
  Users,
  UserCheck,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const classesData = [
  {
    id: 1,
    name: "JSS 1",
    section: "A",
    classTeacher: "John Adebayo",
    students: 32,
    maleStudents: 17,
    femaleStudents: 15,
    session: "2026/2027",
    status: "Active",
  },
  {
    id: 2,
    name: "JSS 1",
    section: "B",
    classTeacher: "Mary Okafor",
    students: 30,
    maleStudents: 14,
    femaleStudents: 16,
    session: "2026/2027",
    status: "Active",
  },
  {
    id: 3,
    name: "JSS 2",
    section: "A",
    classTeacher: "Grace Eze",
    students: 28,
    maleStudents: 13,
    femaleStudents: 15,
    session: "2026/2027",
    status: "Active",
  },
  {
    id: 4,
    name: "JSS 2",
    section: "B",
    classTeacher: "Samuel Adekunle",
    students: 29,
    maleStudents: 16,
    femaleStudents: 13,
    session: "2026/2027",
    status: "Active",
  },
  {
    id: 5,
    name: "JSS 3",
    section: "A",
    classTeacher: "Esther Bello",
    students: 31,
    maleStudents: 15,
    femaleStudents: 16,
    session: "2026/2027",
    status: "Active",
  },
  {
    id: 6,
    name: "JSS 3",
    section: "B",
    classTeacher: "David Ibrahim",
    students: 27,
    maleStudents: 14,
    femaleStudents: 13,
    session: "2026/2027",
    status: "Inactive",
  },
];

function ActionMenu({ classItem, onClose }) {
  return (
    <div className="absolute right-5 top-12 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
      <button
        onClick={() => {
          console.log("View class:", classItem);
          onClose();
        }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        <Eye size={16} />
        View Class
      </button>

      <button
        onClick={() => {
          console.log("Edit class:", classItem);
          onClose();
        }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        <Pencil size={16} />
        Edit Class
      </button>

      <div className="my-1 border-t border-slate-100" />

      <button
        onClick={() => {
          console.log("Delete class:", classItem);
          onClose();
        }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
      >
        <Trash2 size={16} />
        Delete Class
      </button>
    </div>
  );
}

export default function Classes() {
  const [classes] = useState(classesData);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All Levels");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredClasses = useMemo(() => {
    return classes.filter((classItem) => {
      const fullClassName = `${classItem.name} ${classItem.section}`;

      const matchesSearch =
        fullClassName.toLowerCase().includes(search.toLowerCase()) ||
        classItem.classTeacher.toLowerCase().includes(search.toLowerCase());

      const matchesLevel =
        levelFilter === "All Levels" || classItem.name === levelFilter;

      const matchesStatus =
        statusFilter === "All Status" || classItem.status === statusFilter;

      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [classes, search, levelFilter, statusFilter]);

  const totalClasses = classes.length;

  const activeClasses = classes.filter(
    (classItem) => classItem.status === "Active",
  ).length;

  const totalStudents = classes.reduce(
    (total, classItem) => total + classItem.students,
    0,
  );

  const averageClassSize =
    totalClasses > 0 ? Math.round(totalStudents / totalClasses) : 0;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Classes
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage classes, sections, class teachers and students.
            </p>
          </div>

          <button
            onClick={() => console.log("Add class")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Plus size={18} />
            Add Class
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Classes */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Classes
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {totalClasses}
                </h2>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <School size={22} />
              </div>
            </div>
          </div>

          {/* Active Classes */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Classes
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {activeClasses}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <UserCheck size={22} />
              </div>
            </div>
          </div>

          {/* Total Students */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Students
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {totalStudents}
                </h2>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <Users size={22} />
              </div>
            </div>
          </div>

          {/* Average Class Size */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Avg. Class Size
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {averageClassSize}
                </h2>
              </div>

              <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                <School size={22} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search class or class teacher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-10 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Level Filter */}
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option>All Levels</option>
              <option>JSS 1</option>
              <option>JSS 2</option>
              <option>JSS 3</option>
              <option>SSS 1</option>
              <option>SSS 2</option>
              <option>SSS 3</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Class
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Class Teacher
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Students
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Gender
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Academic Session
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
                {filteredClasses.map((classItem) => (
                  <tr
                    key={classItem.id}
                    className="transition hover:bg-slate-50"
                  >
                    {/* Class */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                          <School size={20} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {classItem.name} {classItem.section}
                          </p>

                          <p className="text-xs text-slate-500">
                            Section {classItem.section}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Class Teacher */}
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-700">
                        {classItem.classTeacher}
                      </p>
                    </td>

                    {/* Students */}
                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-700">
                        {classItem.students}
                      </span>
                    </td>

                    {/* Gender */}
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-500">
                          Male:{" "}
                          <span className="font-semibold text-slate-700">
                            {classItem.maleStudents}
                          </span>
                        </p>

                        <p className="text-xs text-slate-500">
                          Female:{" "}
                          <span className="font-semibold text-slate-700">
                            {classItem.femaleStudents}
                          </span>
                        </p>
                      </div>
                    </td>

                    {/* Session */}
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {classItem.session}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          classItem.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {classItem.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="relative px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === classItem.id ? null : classItem.id,
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === classItem.id && (
                        <ActionMenu
                          classItem={classItem}
                          onClose={() => setOpenMenu(null)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredClasses.length === 0 && (
            <div className="px-6 py-16 text-center">
              <School className="mx-auto text-slate-300" size={40} />

              <h3 className="mt-4 font-semibold text-slate-900">
                No classes found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
          {filteredClasses.map((classItem) => (
            <div
              key={classItem.id}
              className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                    <School size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {classItem.name} {classItem.section}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {classItem.session}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setOpenMenu(openMenu === classItem.id ? null : classItem.id)
                  }
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <MoreVertical size={18} />
                </button>

                {openMenu === classItem.id && (
                  <ActionMenu
                    classItem={classItem}
                    onClose={() => setOpenMenu(null)}
                  />
                )}
              </div>

              {/* Teacher */}
              <div className="mt-4 border-t border-slate-100 pt-4">
                <p className="text-xs text-slate-400">Class Teacher</p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {classItem.classTeacher}
                </p>
              </div>

              {/* Details */}
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400">Students</p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {classItem.students}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Status</p>

                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      classItem.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {classItem.status}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Male Students</p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {classItem.maleStudents}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Female Students</p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {classItem.femaleStudents}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Mobile Empty State */}
          {filteredClasses.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <School className="mx-auto text-slate-300" size={40} />

              <h3 className="mt-4 font-semibold text-slate-900">
                No classes found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
