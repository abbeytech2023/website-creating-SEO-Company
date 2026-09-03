import { useMemo, useState } from "react";
import {
  Award,
  CheckCircle2,
  Clock3,
  Eye,
  FileCheck2,
  MoreVertical,
  Search,
  Send,
  UserCheck,
  Users,
  X,
  XCircle,
} from "lucide-react";

const mockResults = [
  {
    id: 1,
    className: "JSS 1A",
    subject: "Mathematics",
    teacher: "John Adebayo",
    session: "2025/2026",
    term: "First Term",
    totalStudents: 32,
    submitted: 32,
    status: "Approved",
    submittedAt: "Sep 18, 2025",
    approvedAt: "Sep 19, 2025",
  },
  {
    id: 2,
    className: "JSS 1A",
    subject: "English Studies",
    teacher: "Samuel Adekunle",
    session: "2025/2026",
    term: "First Term",
    totalStudents: 32,
    submitted: 32,
    status: "Submitted",
    submittedAt: "Sep 20, 2025",
    approvedAt: null,
  },
  {
    id: 3,
    className: "JSS 1B",
    subject: "Basic Science",
    teacher: "Mary Okafor",
    session: "2025/2026",
    term: "First Term",
    totalStudents: 30,
    submitted: 26,
    status: "Pending",
    submittedAt: null,
    approvedAt: null,
  },
  {
    id: 4,
    className: "JSS 1B",
    subject: "English Studies",
    teacher: "Samuel Adekunle",
    session: "2025/2026",
    term: "First Term",
    totalStudents: 30,
    submitted: 30,
    status: "Approved",
    submittedAt: "Sep 19, 2025",
    approvedAt: "Sep 20, 2025",
  },
  {
    id: 5,
    className: "JSS 2A",
    subject: "Mathematics",
    teacher: "John Adebayo",
    session: "2025/2026",
    term: "First Term",
    totalStudents: 28,
    submitted: 28,
    status: "Submitted",
    submittedAt: "Sep 21, 2025",
    approvedAt: null,
  },
  {
    id: 6,
    className: "JSS 2A",
    subject: "Social Studies",
    teacher: "Grace Eze",
    session: "2025/2026",
    term: "First Term",
    totalStudents: 28,
    submitted: 28,
    status: "Approved",
    submittedAt: "Sep 20, 2025",
    approvedAt: "Sep 21, 2025",
  },
  {
    id: 7,
    className: "JSS 2B",
    subject: "Basic Science",
    teacher: "Mary Okafor",
    session: "2025/2026",
    term: "First Term",
    totalStudents: 29,
    submitted: 21,
    status: "Pending",
    submittedAt: null,
    approvedAt: null,
  },
  {
    id: 8,
    className: "JSS 2B",
    subject: "Civic Education",
    teacher: "Grace Eze",
    session: "2025/2026",
    term: "First Term",
    totalStudents: 29,
    submitted: 29,
    status: "Rejected",
    submittedAt: "Sep 21, 2025",
    approvedAt: null,
  },
  {
    id: 9,
    className: "JSS 3A",
    subject: "Mathematics",
    teacher: "John Adebayo",
    session: "2025/2026",
    term: "First Term",
    totalStudents: 31,
    submitted: 31,
    status: "Approved",
    submittedAt: "Sep 18, 2025",
    approvedAt: "Sep 19, 2025",
  },
];

const mockStudentResults = [
  {
    id: 1,
    name: "David Adeyemi",
    admissionNumber: "GH/2025/001",
    ca: 18,
    exam: 67,
  },
  {
    id: 2,
    name: "Blessing Okafor",
    admissionNumber: "GH/2025/002",
    ca: 20,
    exam: 72,
  },
  {
    id: 3,
    name: "Michael Johnson",
    admissionNumber: "GH/2025/003",
    ca: 15,
    exam: 61,
  },
  {
    id: 4,
    name: "Esther Bello",
    admissionNumber: "GH/2025/004",
    ca: 19,
    exam: 75,
  },
  {
    id: 5,
    name: "Daniel Ibrahim",
    admissionNumber: "GH/2025/005",
    ca: 14,
    exam: 55,
  },
];

function getGrade(total) {
  if (total >= 70) return "A";
  if (total >= 60) return "B";
  if (total >= 50) return "C";
  if (total >= 45) return "D";
  if (total >= 40) return "E";
  return "F";
}

function getRemark(total) {
  if (total >= 70) return "Excellent";
  if (total >= 60) return "Very Good";
  if (total >= 50) return "Good";
  if (total >= 45) return "Fair";
  if (total >= 40) return "Pass";
  return "Fail";
}

function StatusBadge({ status }) {
  const styles = {
    Approved: "bg-emerald-50 text-emerald-700",
    Submitted: "bg-blue-50 text-blue-700",
    Pending: "bg-amber-50 text-amber-700",
    Rejected: "bg-red-50 text-red-700",
  };

  const icons = {
    Approved: <CheckCircle2 size={13} />,
    Submitted: <Send size={13} />,
    Pending: <Clock3 size={13} />,
    Rejected: <XCircle size={13} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

function ProgressBar({ submitted, total }) {
  const percentage = total === 0 ? 0 : Math.round((submitted / total) * 100);

  return (
    <div className="min-w-[140px]">
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-slate-500">
          {submitted}/{total} submitted
        </span>

        <span className="font-semibold text-slate-700">{percentage}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${
            percentage === 100 ? "bg-emerald-500" : "bg-amber-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function ActionMenu({ result, onView }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />

          <div className="absolute right-0 z-20 mt-2 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-xl">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onView(result);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
            >
              <Eye size={16} />
              View Results
            </button>

            {result.status === "Submitted" && (
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onView(result);
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-emerald-600 hover:bg-emerald-50"
              >
                <FileCheck2 size={16} />
                Review Results
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

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

export default function Results() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");
  const [termFilter, setTermFilter] = useState("First Term");
  const [selectedResult, setSelectedResult] = useState(null);

  const filteredResults = useMemo(() => {
    return mockResults.filter((result) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        result.className.toLowerCase().includes(searchValue) ||
        result.subject.toLowerCase().includes(searchValue) ||
        result.teacher.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || result.status === statusFilter;

      const matchesClass =
        classFilter === "All" || result.className === classFilter;

      const matchesTerm = result.term === termFilter;

      return matchesSearch && matchesStatus && matchesClass && matchesTerm;
    });
  }, [search, statusFilter, classFilter, termFilter]);

  const totalResults = mockResults.length;

  const approvedResults = mockResults.filter(
    (result) => result.status === "Approved",
  ).length;

  const submittedResults = mockResults.filter(
    (result) => result.status === "Submitted",
  ).length;

  const pendingResults = mockResults.filter(
    (result) => result.status === "Pending",
  ).length;

  const handleApprove = (result) => {
    console.log("Approve result:", result);
    setSelectedResult(null);
  };

  const handleReject = (result) => {
    console.log("Reject result:", result);
    setSelectedResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-emerald-600">
              <Award size={17} />
              <span className="font-medium">Academic Management</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Results
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Review, approve and monitor student academic results.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <Clock3 size={17} className="text-slate-400" />

            <div>
              <p className="text-[11px] text-slate-400">Current Term</p>

              <p className="text-sm font-semibold text-slate-800">
                First Term • 2025/2026
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={FileCheck2}
            title="Total Results"
            value={totalResults}
            description="Result submissions"
          />

          <StatCard
            icon={CheckCircle2}
            title="Approved"
            value={approvedResults}
            description="Ready for report cards"
          />

          <StatCard
            icon={Send}
            title="Awaiting Review"
            value={submittedResults}
            description="Submitted by teachers"
          />

          <StatCard
            icon={Clock3}
            title="Pending"
            value={pendingResults}
            description="Teachers still entering"
          />
        </div>

        {/* Results Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Filters */}
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              {/* Search */}
              <div className="relative xl:col-span-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search results..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Class */}
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="All">All Classes</option>
                <option value="JSS 1A">JSS 1A</option>
                <option value="JSS 1B">JSS 1B</option>
                <option value="JSS 2A">JSS 2A</option>
                <option value="JSS 2B">JSS 2B</option>
                <option value="JSS 3A">JSS 3A</option>
              </select>

              {/* Term */}
              <select
                value={termFilter}
                onChange={(e) => setTermFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="First Term">First Term</option>
                <option value="Second Term">Second Term</option>
                <option value="Third Term">Third Term</option>
              </select>

              {/* Status */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Submitted">Submitted</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70">
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Class
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Subject
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Teacher
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Submission
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Term
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
                {filteredResults.map((result) => (
                  <tr
                    key={result.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 font-bold text-emerald-600">
                          {result.className.split(" ")[1]}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {result.className}
                          </p>

                          <p className="text-xs text-slate-400">
                            {result.totalStudents} students
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {result.subject}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                          {result.teacher
                            .split(" ")
                            .map((name) => name[0])
                            .slice(0, 2)
                            .join("")}
                        </div>

                        <span className="text-sm text-slate-700">
                          {result.teacher}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <ProgressBar
                        submitted={result.submitted}
                        total={result.totalStudents}
                      />
                    </td>

                    <td className="px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          {result.term}
                        </p>

                        <p className="text-xs text-slate-400">
                          {result.session}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={result.status} />
                    </td>

                    <td className="px-5 py-4 text-right">
                      <ActionMenu result={result} onView={setSelectedResult} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="divide-y divide-slate-100 md:hidden">
            {filteredResults.map((result) => (
              <div key={result.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">
                        {result.className}
                      </span>

                      <StatusBadge status={result.status} />
                    </div>

                    <h3 className="mt-2 font-semibold text-slate-800">
                      {result.subject}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {result.teacher}
                    </p>
                  </div>

                  <ActionMenu result={result} onView={setSelectedResult} />
                </div>

                <div className="mt-4">
                  <ProgressBar
                    submitted={result.submitted}
                    total={result.totalStudents}
                  />
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{result.term}</span>

                  <span className="font-medium text-slate-600">
                    {result.session}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredResults.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Award size={25} />
              </div>

              <h3 className="mt-4 font-semibold text-slate-900">
                No results found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Review Modal */}
      {selectedResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-200 p-5 sm:p-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                    {selectedResult.subject}
                  </h2>

                  <StatusBadge status={selectedResult.status} />
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedResult.className} • {selectedResult.teacher} •{" "}
                  {selectedResult.term}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-2 gap-3 border-b border-slate-200 p-5 sm:grid-cols-4 sm:p-6">
              <div className="rounded-xl bg-slate-50 p-4">
                <Users size={17} className="text-slate-400" />

                <p className="mt-2 text-xs text-slate-400">Total Students</p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {selectedResult.totalStudents}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <Send size={17} className="text-slate-400" />

                <p className="mt-2 text-xs text-slate-400">Submitted</p>

                <p className="mt-1 text-lg font-bold text-slate-900">
                  {selectedResult.submitted}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <UserCheck size={17} className="text-slate-400" />

                <p className="mt-2 text-xs text-slate-400">Teacher</p>

                <p className="mt-1 truncate text-sm font-bold text-slate-900">
                  {selectedResult.teacher}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <Award size={17} className="text-slate-400" />

                <p className="mt-2 text-xs text-slate-400">Session</p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  {selectedResult.session}
                </p>
              </div>
            </div>

            {/* Student Results */}
            <div className="flex-1 overflow-auto p-5 sm:p-6">
              <div className="mb-4">
                <h3 className="font-semibold text-slate-900">
                  Student Results
                </h3>

                <p className="text-xs text-slate-400">
                  Review individual student scores before approval.
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                        Student
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                        Admission No.
                      </th>

                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                        CA
                      </th>

                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                        Exam
                      </th>

                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                        Total
                      </th>

                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                        Grade
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                        Remark
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {mockStudentResults.map((student) => {
                      const total = student.ca + student.exam;
                      const grade = getGrade(total);

                      return (
                        <tr key={student.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3">
                            <p className="text-sm font-semibold text-slate-800">
                              {student.name}
                            </p>
                          </td>

                          <td className="px-4 py-3 text-sm text-slate-500">
                            {student.admissionNumber}
                          </td>

                          <td className="px-4 py-3 text-center text-sm text-slate-700">
                            {student.ca}
                          </td>

                          <td className="px-4 py-3 text-center text-sm text-slate-700">
                            {student.exam}
                          </td>

                          <td className="px-4 py-3 text-center text-sm font-bold text-slate-900">
                            {total}
                          </td>

                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-emerald-700">
                              {grade}
                            </span>
                          </td>

                          <td className="px-4 py-3 text-sm text-slate-600">
                            {getRemark(total)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <button
                type="button"
                onClick={() => setSelectedResult(null)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Close
              </button>

              {selectedResult.status === "Submitted" && (
                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleReject(selectedResult)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100"
                  >
                    <XCircle size={17} />
                    Send Back
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApprove(selectedResult)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
                  >
                    <CheckCircle2 size={17} />
                    Approve Results
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
