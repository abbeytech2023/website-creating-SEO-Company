import { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

const teachersData = [
  {
    id: 1,
    employeeNumber: "TCH-001",
    firstName: "John",
    middleName: "Ade",
    lastName: "Adebayo",
    gender: "Male",
    phone: "0803 456 7890",
    email: "john.adebayo@example.com",
    qualification: "B.Ed Mathematics",
    subjects: ["Mathematics"],
    classes: ["JSS 1A", "JSS 2A"],
    status: "Active",
  },
  {
    id: 2,
    employeeNumber: "TCH-002",
    firstName: "Mary",
    middleName: "Jane",
    lastName: "Okafor",
    gender: "Female",
    phone: "0806 234 5678",
    email: "mary.okafor@example.com",
    qualification: "B.Sc Biology",
    subjects: ["Basic Science", "Biology"],
    classes: ["JSS 1B", "JSS 2B"],
    status: "Active",
  },
  {
    id: 3,
    employeeNumber: "TCH-003",
    firstName: "Samuel",
    middleName: "Olu",
    lastName: "Adekunle",
    gender: "Male",
    phone: "0812 345 6789",
    email: "samuel.adekunle@example.com",
    qualification: "B.A English",
    subjects: ["English Studies"],
    classes: ["JSS 1A", "JSS 1B"],
    status: "Active",
  },
  {
    id: 4,
    employeeNumber: "TCH-004",
    firstName: "Grace",
    middleName: "Amaka",
    lastName: "Eze",
    gender: "Female",
    phone: "0809 876 5432",
    email: "grace.eze@example.com",
    qualification: "B.Ed Social Studies",
    subjects: ["Social Studies"],
    classes: ["JSS 2A"],
    status: "Active",
  },
  {
    id: 5,
    employeeNumber: "TCH-005",
    firstName: "David",
    middleName: "Chukwu",
    lastName: "Ibrahim",
    gender: "Male",
    phone: "0814 567 8901",
    email: "david.ibrahim@example.com",
    qualification: "B.Sc Computer Science",
    subjects: ["Computer Studies"],
    classes: ["JSS 1A", "JSS 2B"],
    status: "Inactive",
  },
  {
    id: 6,
    employeeNumber: "TCH-006",
    firstName: "Esther",
    middleName: "Funmi",
    lastName: "Bello",
    gender: "Female",
    phone: "0703 456 7890",
    email: "esther.bello@example.com",
    qualification: "B.Ed Economics",
    subjects: ["Business Studies"],
    classes: ["JSS 1B", "JSS 2A"],
    status: "Active",
  },
];

function getInitials(firstName, lastName) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

function ActionMenu({ teacher, onClose }) {
  return (
    <div className="absolute right-5 top-12 z-20 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
      <button
        onClick={() => {
          console.log("View teacher:", teacher);
          onClose();
        }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        <Eye size={16} />
        View Teacher
      </button>

      <button
        onClick={() => {
          console.log("Edit teacher:", teacher);
          onClose();
        }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
      >
        <Pencil size={16} />
        Edit Teacher
      </button>

      <div className="my-1 border-t border-slate-100" />

      <button
        onClick={() => {
          console.log("Delete teacher:", teacher);
          onClose();
        }}
        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
      >
        <Trash2 size={16} />
        Delete Teacher
      </button>
    </div>
  );
}

export default function Teachers() {
  const [teachers] = useState(teachersData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [genderFilter, setGenderFilter] = useState("All Gender");
  const [openMenu, setOpenMenu] = useState(null);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const fullName = `${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`;

      const matchesSearch =
        fullName.toLowerCase().includes(search.toLowerCase()) ||
        teacher.employeeNumber.toLowerCase().includes(search.toLowerCase()) ||
        teacher.email.toLowerCase().includes(search.toLowerCase()) ||
        teacher.phone.includes(search);

      const matchesStatus =
        statusFilter === "All Status" || teacher.status === statusFilter;

      const matchesGender =
        genderFilter === "All Gender" || teacher.gender === genderFilter;

      return matchesSearch && matchesStatus && matchesGender;
    });
  }, [teachers, search, statusFilter, genderFilter]);

  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "Active",
  ).length;
  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === "Inactive",
  ).length;
  const femaleTeachers = teachers.filter(
    (teacher) => teacher.gender === "Female",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Teachers
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage teachers, qualifications, subjects and class assignments.
            </p>
          </div>

          <button
            onClick={() => console.log("Add teacher")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Plus size={18} />
            Add Teacher
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Teachers
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {totalTeachers}
                </h2>
              </div>

              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <Users size={22} />
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Active Teachers
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {activeTeachers}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <UserCheck size={22} />
              </div>
            </div>
          </div>

          {/* Inactive */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Inactive Teachers
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {inactiveTeachers}
                </h2>
              </div>

              <div className="rounded-xl bg-red-50 p-3 text-red-600">
                <UserX size={22} />
              </div>
            </div>
          </div>

          {/* Female */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Female Teachers
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  {femaleTeachers}
                </h2>
              </div>

              <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
                <GraduationCap size={22} />
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
                placeholder="Search teacher, employee number, email..."
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

            {/* Gender */}
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option>All Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            {/* Status */}
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
            <table className="w-full min-w-[1000px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Teacher
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Employee No.
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Qualification
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Subjects
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Classes
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
                {filteredTeachers.map((teacher) => (
                  <tr
                    key={teacher.id}
                    className="relative transition hover:bg-slate-50"
                  >
                    {/* Teacher */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                          {getInitials(teacher.firstName, teacher.lastName)}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {teacher.firstName} {teacher.middleName}{" "}
                            {teacher.lastName}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {teacher.email}
                          </p>

                          <p className="text-xs text-slate-400">
                            {teacher.phone}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Employee Number */}
                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {teacher.employeeNumber}
                    </td>

                    {/* Qualification */}
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {teacher.qualification}
                    </td>

                    {/* Subjects */}
                    <td className="px-5 py-4">
                      <div className="flex max-w-[180px] flex-wrap gap-1.5">
                        {teacher.subjects.map((subject) => (
                          <span
                            key={subject}
                            className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Classes */}
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {teacher.classes.map((className) => (
                          <span
                            key={className}
                            className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                          >
                            {className}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          teacher.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {teacher.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="relative px-5 py-4 text-right">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === teacher.id ? null : teacher.id,
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === teacher.id && (
                        <ActionMenu
                          teacher={teacher}
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
          {filteredTeachers.length === 0 && (
            <div className="px-6 py-16 text-center">
              <Users className="mx-auto text-slate-300" size={40} />

              <h3 className="mt-4 font-semibold text-slate-900">
                No teachers found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    {getInitials(teacher.firstName, teacher.lastName)}
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {teacher.firstName} {teacher.lastName}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {teacher.employeeNumber}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setOpenMenu(openMenu === teacher.id ? null : teacher.id)
                  }
                  className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                >
                  <MoreVertical size={18} />
                </button>

                {openMenu === teacher.id && (
                  <ActionMenu
                    teacher={teacher}
                    onClose={() => setOpenMenu(null)}
                  />
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-400">Qualification</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {teacher.qualification}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Gender</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {teacher.gender}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Phone</p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {teacher.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Status</p>

                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      teacher.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {teacher.status}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs text-slate-400">
                  Subjects & Classes
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {teacher.subjects.map((subject) => (
                    <span
                      key={subject}
                      className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                      {subject}
                    </span>
                  ))}

                  {teacher.classes.map((className) => (
                    <span
                      key={className}
                      className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                    >
                      {className}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {filteredTeachers.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <Users className="mx-auto text-slate-300" size={40} />

              <h3 className="mt-4 font-semibold text-slate-900">
                No teachers found
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
