import { useMemo, useState } from "react";
import {
  BarChart3,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Users,
  Award,
  ChevronDown,
  Eye,
  X,
  BookOpen,
} from "lucide-react";

const mockPerformance = [
  {
    id: 1,
    student: "Daniel Okafor",
    admissionNumber: "STU001",
    class: "JSS 1A",
    subject: "Mathematics",
    ca1: 8,
    ca2: 9,
    exam: 72,
  },
  {
    id: 2,
    student: "Sarah Johnson",
    admissionNumber: "STU002",
    class: "JSS 1A",
    subject: "Mathematics",
    ca1: 9,
    ca2: 10,
    exam: 78,
  },
  {
    id: 3,
    student: "Michael Adewale",
    admissionNumber: "STU003",
    class: "JSS 1A",
    subject: "Mathematics",
    ca1: 6,
    ca2: 7,
    exam: 58,
  },
  {
    id: 4,
    student: "Grace Williams",
    admissionNumber: "STU004",
    class: "JSS 1A",
    subject: "Mathematics",
    ca1: 10,
    ca2: 9,
    exam: 81,
  },
  {
    id: 5,
    student: "Samuel Ibrahim",
    admissionNumber: "STU005",
    class: "JSS 1A",
    subject: "Mathematics",
    ca1: 7,
    ca2: 8,
    exam: 65,
  },
  {
    id: 6,
    student: "Esther Bello",
    admissionNumber: "STU006",
    class: "JSS 1A",
    subject: "Mathematics",
    ca1: 5,
    ca2: 6,
    exam: 48,
  },
  {
    id: 7,
    student: "David Adekunle",
    admissionNumber: "STU007",
    class: "JSS 1A",
    subject: "Mathematics",
    ca1: 9,
    ca2: 8,
    exam: 74,
  },
  {
    id: 8,
    student: "Mary Eze",
    admissionNumber: "STU008",
    class: "JSS 1A",
    subject: "Mathematics",
    ca1: 4,
    ca2: 6,
    exam: 42,
  },
];

const getGrade = (score) => {
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  if (score >= 40) return "E";
  return "F";
};

const getRemark = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Very Good";
  if (score >= 60) return "Good";
  if (score >= 50) return "Pass";
  if (score >= 40) return "Fair";
  return "Fail";
};

const getGradeStyle = (grade) => {
  if (grade === "A") return "bg-emerald-50 text-emerald-700 border-emerald-100";

  if (grade === "B") return "bg-blue-50 text-blue-700 border-blue-100";

  if (grade === "C") return "bg-violet-50 text-violet-700 border-violet-100";

  if (grade === "D") return "bg-amber-50 text-amber-700 border-amber-100";

  if (grade === "E") return "bg-orange-50 text-orange-700 border-orange-100";

  return "bg-red-50 text-red-700 border-red-100";
};

function StatCard({ title, value, subtitle, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900">{value}</h3>

          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

function SelectInput({ value, onChange, children }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        {children}
      </select>

      <ChevronDown
        size={17}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

function PerformanceModal({ student, onClose }) {
  if (!student) return null;

  const caTotal = student.ca1 + student.ca2;
  const total = caTotal + student.exam;
  const grade = getGrade(total);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              Student Performance
            </p>

            <h2 className="mt-1 text-xl font-bold text-slate-900">
              {student.student}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {student.admissionNumber} • {student.class}
            </p>
          </div>

          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {/* Overall Score */}
          <div className="rounded-2xl bg-slate-50 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">Overall Score</p>

                <p className="mt-1 text-4xl font-bold text-slate-900">
                  {total}
                  <span className="text-lg font-medium text-slate-400">
                    /100
                  </span>
                </p>
              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl border text-2xl font-bold ${getGradeStyle(
                  grade,
                )}`}
              >
                {grade}
              </div>
            </div>
          </div>

          {/* Scores */}
          <div className="mt-6">
            <h3 className="mb-3 font-semibold text-slate-900">
              Score Breakdown
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">CA 1</p>
                <p className="mt-1 text-xl font-bold text-slate-900">
                  {student.ca1}/10
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">CA 2</p>
                <p className="mt-1 text-xl font-bold text-slate-900">
                  {student.ca2}/10
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-xs text-slate-500">Examination</p>
                <p className="mt-1 text-xl font-bold text-slate-900">
                  {student.exam}/80
                </p>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="mt-6">
            <h3 className="mb-3 font-semibold text-slate-900">
              Performance Summary
            </h3>

            <div className="rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Final Grade</span>

                <span
                  className={`rounded-lg border px-3 py-1 text-sm font-bold ${getGradeStyle(
                    grade,
                  )}`}
                >
                  {grade}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">Remark</span>

                <span className="font-semibold text-slate-900">
                  {getRemark(total)}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">CA Contribution</span>

                <span className="font-semibold text-slate-900">
                  {caTotal}/20
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Examination Contribution
                </span>

                <span className="font-semibold text-slate-900">
                  {student.exam}/80
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentPerformance() {
  const [search, setSearch] = useState("");

  const [session, setSession] = useState("2026/2027");
  const [term, setTerm] = useState("First Term");
  const [selectedClass, setSelectedClass] = useState("JSS 1A");
  const [subject, setSubject] = useState("Mathematics");

  const [assessmentType, setAssessmentType] = useState("All");

  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = useMemo(() => {
    return mockPerformance.filter((student) => {
      const matchesSearch =
        student.student.toLowerCase().includes(search.toLowerCase()) ||
        student.admissionNumber.toLowerCase().includes(search.toLowerCase());

      const matchesClass = student.class === selectedClass;
      const matchesSubject = student.subject === subject;

      return matchesSearch && matchesClass && matchesSubject;
    });
  }, [search, selectedClass, subject]);

  const statistics = useMemo(() => {
    if (!filteredStudents.length) {
      return {
        students: 0,
        average: 0,
        highest: 0,
        lowest: 0,
        passRate: 0,
      };
    }

    const totals = filteredStudents.map(
      (student) => student.ca1 + student.ca2 + student.exam,
    );

    const average =
      totals.reduce((sum, score) => sum + score, 0) / totals.length;

    const passed = totals.filter((score) => score >= 50).length;

    return {
      students: filteredStudents.length,
      average: Math.round(average),
      highest: Math.max(...totals),
      lowest: Math.min(...totals),
      passRate: Math.round((passed / totals.length) * 100),
    };
  }, [filteredStudents]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                  <BarChart3 size={22} />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Student Performance
                  </h1>

                  <p className="text-sm text-slate-500">
                    Monitor CA and examination performance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center gap-2">
            <Filter size={17} className="text-indigo-600" />

            <h2 className="font-semibold text-slate-900">
              Performance Filters
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <SelectInput
              value={session}
              onChange={(e) => setSession(e.target.value)}
            >
              <option>2026/2027</option>
              <option>2025/2026</option>
            </SelectInput>

            <SelectInput value={term} onChange={(e) => setTerm(e.target.value)}>
              <option>First Term</option>
              <option>Second Term</option>
              <option>Third Term</option>
            </SelectInput>

            <SelectInput
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option>JSS 1A</option>
              <option>JSS 1B</option>
              <option>JSS 2A</option>
              <option>JSS 2B</option>
            </SelectInput>

            <SelectInput
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option>Mathematics</option>
              <option>English Studies</option>
              <option>Basic Science</option>
              <option>Social Studies</option>
            </SelectInput>

            <SelectInput
              value={assessmentType}
              onChange={(e) => setAssessmentType(e.target.value)}
            >
              <option>All</option>
              <option>CA</option>
              <option>Examination</option>
            </SelectInput>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Students"
            value={statistics.students}
            subtitle="Students with results"
            icon={Users}
          />

          <StatCard
            title="Class Average"
            value={`${statistics.average}/100`}
            subtitle="Average overall score"
            icon={BarChart3}
          />

          <StatCard
            title="Highest Score"
            value={`${statistics.highest}/100`}
            subtitle="Best overall performance"
            icon={Award}
          />

          <StatCard
            title="Pass Rate"
            value={`${statistics.passRate}%`}
            subtitle="Students scoring 50+"
            icon={TrendingUp}
          />
        </div>

        {/* Search */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student or admission number..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <BookOpen size={16} />

            <span>
              {subject} • {selectedClass} • {term}
            </span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px]">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Student
                  </th>

                  <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    CA 1
                  </th>

                  <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    CA 2
                  </th>

                  <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Exam
                  </th>

                  <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Total
                  </th>

                  <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Grade
                  </th>

                  <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Remark
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => {
                  const total = student.ca1 + student.ca2 + student.exam;

                  const grade = getGrade(total);

                  return (
                    <tr
                      key={student.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {student.student}
                          </p>

                          <p className="mt-1 text-xs text-slate-500">
                            {student.admissionNumber}
                          </p>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-center text-sm font-medium text-slate-700">
                        {student.ca1}/10
                      </td>

                      <td className="px-5 py-4 text-center text-sm font-medium text-slate-700">
                        {student.ca2}/10
                      </td>

                      <td className="px-5 py-4 text-center text-sm font-medium text-slate-700">
                        {student.exam}/80
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="font-bold text-slate-900">
                          {total}
                        </span>
                        <span className="text-xs text-slate-400">/100</span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`inline-flex rounded-lg border px-2.5 py-1 text-xs font-bold ${getGradeStyle(
                            grade,
                          )}`}
                        >
                          {grade}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center text-sm text-slate-600">
                        {getRemark(total)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                        >
                          <Eye size={15} />
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {!filteredStudents.length && (
            <div className="px-6 py-16 text-center">
              <BarChart3 size={35} className="mx-auto text-slate-300" />

              <h3 className="mt-4 font-semibold text-slate-900">
                No performance records
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                No students match the selected filters.
              </p>
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 md:hidden">
          {filteredStudents.map((student) => {
            const total = student.ca1 + student.ca2 + student.exam;

            const grade = getGrade(total);

            return (
              <div
                key={student.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {student.student}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {student.admissionNumber}
                    </p>
                  </div>

                  <span
                    className={`rounded-lg border px-2.5 py-1 text-xs font-bold ${getGradeStyle(
                      grade,
                    )}`}
                  >
                    {grade}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-[11px] text-slate-500">CA 1</p>

                    <p className="mt-1 font-bold text-slate-900">
                      {student.ca1}/10
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-[11px] text-slate-500">CA 2</p>

                    <p className="mt-1 font-bold text-slate-900">
                      {student.ca2}/10
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3 text-center">
                    <p className="text-[11px] text-slate-500">Exam</p>

                    <p className="mt-1 font-bold text-slate-900">
                      {student.exam}/80
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-500">Total Score</p>

                    <p className="font-bold text-slate-900">{total}/100</p>
                  </div>

                  <button
                    onClick={() => setSelectedStudent(student)}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-indigo-700"
                  >
                    <Eye size={15} />
                    View Performance
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Performance Insight */}
        {filteredStudents.length > 0 && (
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600">
                  <TrendingUp size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-900">
                    Performance Overview
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-emerald-700">
                    The class currently has an average score of{" "}
                    <strong>{statistics.average}/100</strong> with a pass rate
                    of <strong>{statistics.passRate}%</strong>.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600">
                  <TrendingDown size={20} />
                </div>

                <div>
                  <h3 className="font-semibold text-amber-900">
                    Students Needing Attention
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-amber-700">
                    {
                      filteredStudents.filter(
                        (student) =>
                          student.ca1 + student.ca2 + student.exam < 50,
                      ).length
                    }{" "}
                    student(s) scored below 50 and may require additional
                    academic support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Student Modal */}
      <PerformanceModal
        student={selectedStudent}
        onClose={() => setSelectedStudent(null)}
      />
    </div>
  );
}
