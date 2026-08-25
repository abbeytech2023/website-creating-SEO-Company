import React, { useState } from "react";
import {
  ClipboardCheck,
  CheckCircle2,
  Clock3,
  AlertCircle,
  Search,
  Eye,
  Download,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";

import ResultReview from "../components/ResultsReview";

export default function Results() {
  const [session, setSession] = useState("2025/2026");
  const [term, setTerm] = useState("Second Term");
  const [classFilter, setClassFilter] = useState("All Classes");

  // Selected class for ResultReview
  const [selectedResult, setSelectedResult] = useState(null);

  const results = [
    {
      className: "JSS 1A",
      students: 32,
      submitted: 32,
      status: "Completed",
    },
    {
      className: "JSS 1B",
      students: 30,
      submitted: 26,
      status: "Pending",
    },
    {
      className: "JSS 2A",
      students: 28,
      submitted: 28,
      status: "Completed",
    },
    {
      className: "JSS 2B",
      students: 29,
      submitted: 21,
      status: "Pending",
    },
    {
      className: "JSS 3A",
      students: 31,
      submitted: 31,
      status: "Completed",
    },
    {
      className: "SS 1A",
      students: 26,
      submitted: 26,
      status: "Completed",
    },
  ];

  const filteredResults =
    classFilter === "All Classes"
      ? results
      : results.filter((item) => item.className === classFilter);

  /*
  =========================================
  RESULT REVIEW SCREEN
  =========================================
  */

  if (selectedResult) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Back Header */}
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">
            <button
              type="button"
              onClick={() => setSelectedResult(null)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            >
              <ArrowLeft size={19} />
            </button>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Review Result
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {selectedResult.className} · {term} · {session}
              </p>
            </div>
          </div>
        </header>

        {/* Result Review */}
        <main className="mx-auto max-w-7xl p-6">
          <ResultReview
            className={selectedResult.className}
            students={selectedResult.students}
            submitted={selectedResult.submitted}
            status={selectedResult.status}
            session={session}
            term={term}
            onBack={() => setSelectedResult(null)}
          />
        </main>
      </div>
    );
  }

  /*
  =========================================
  MAIN RESULTS PAGE
  =========================================
  */

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Results</h1>

            <p className="mt-1 text-sm text-slate-500">
              Review and manage student results
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <Download size={17} />
            Download Reports
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {/* Session Filters */}
        <div className="mb-6 rounded-2xl border bg-white p-5">
          <div className="mb-4">
            <h2 className="font-semibold text-slate-900">Result Period</h2>

            <p className="text-sm text-slate-500">
              Select the session, term and class you want to view.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Select
              label="Academic Session"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              options={["2025/2026", "2024/2025"]}
            />

            <Select
              label="Term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              options={["First Term", "Second Term", "Third Term"]}
            />

            <Select
              label="Class"
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              options={[
                "All Classes",
                "JSS 1A",
                "JSS 1B",
                "JSS 2A",
                "JSS 2B",
                "JSS 3A",
                "SS 1A",
              ]}
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={ClipboardCheck}
            title="Total Results"
            value="176"
            description="Student results"
          />

          <StatCard
            icon={CheckCircle2}
            title="Completed"
            value="138"
            description="Ready for approval"
          />

          <StatCard
            icon={Clock3}
            title="Pending"
            value="38"
            description="Awaiting submission"
          />

          <StatCard
            icon={AlertCircle}
            title="Needs Review"
            value="6"
            description="Requires attention"
          />
        </div>

        {/* Search */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Class Results</h2>

            <p className="text-sm text-slate-500">
              {term} · {session}
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search class..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
            />
          </div>
        </div>

        {/* Results List */}
        <div className="mt-4 overflow-hidden rounded-2xl border bg-white">
          <div className="hidden grid-cols-5 border-b bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
            <span>Class</span>
            <span>Students</span>
            <span>Submitted</span>
            <span>Status</span>
            <span className="text-right">Action</span>
          </div>

          {filteredResults.map((result) => (
            <ResultRow
              key={result.className}
              {...result}
              onReview={() => setSelectedResult(result)}
            />
          ))}
        </div>

        {/* Information */}
        <div className="mt-6 rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <div className="flex gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600">
              <ClipboardCheck size={18} />
            </div>

            <div>
              <h3 className="font-semibold text-indigo-900">
                How result approval works
              </h3>

              <p className="mt-1 text-sm leading-6 text-indigo-700">
                Teachers enter and submit student scores. Once submitted, the
                school administrator can review the results and approve them
                before report cards are generated.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================
   RESULT ROW
========================================= */

function ResultRow({ className, students, submitted, onReview }) {
  const completed = submitted === students;

  return (
    <div className="border-b last:border-b-0">
      <div className="grid items-center gap-4 px-5 py-5 md:grid-cols-5">
        {/* Class */}
        <div>
          <p className="font-semibold text-slate-900">{className}</p>

          <p className="mt-1 text-xs text-slate-500 md:hidden">
            {submitted} of {students} submitted
          </p>
        </div>

        {/* Students */}
        <div className="hidden text-sm text-slate-600 md:block">{students}</div>

        {/* Submitted */}
        <div className="hidden text-sm text-slate-600 md:block">
          {submitted} / {students}
        </div>

        {/* Status */}
        <div>
          {completed ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
              <CheckCircle2 size={14} />
              Completed
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              <Clock3 size={14} />
              Pending
            </span>
          )}
        </div>

        {/* Review */}
        <div className="flex justify-start md:justify-end">
          <button
            type="button"
            onClick={onReview}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <Eye size={16} />
            Review
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

/* =========================================
   SELECT
========================================= */

function Select({ label, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={17}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}
