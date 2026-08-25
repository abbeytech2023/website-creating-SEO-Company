import React from "react";
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Download,
  Send,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ResultReview() {
  const students = [
    {
      id: 1,
      name: "John Ade",
      ca: 25,
      exam: 60,
      total: 85,
      grade: "A",
    },
    {
      id: 2,
      name: "Mary James",
      ca: 22,
      exam: 55,
      total: 77,
      grade: "B",
    },
    {
      id: 3,
      name: "David Peter",
      ca: 20,
      exam: 64,
      total: 84,
      grade: "A",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      ca: 18,
      exam: 50,
      total: 68,
      grade: "C",
    },
    {
      id: 5,
      name: "Michael Ade",
      ca: 15,
      exam: 42,
      total: 57,
      grade: "C",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              to="/admin/results"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
            >
              <ArrowLeft size={18} />
            </Link>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                JSS 1A Results
              </h1>

              <p className="text-sm text-slate-500">Second Term · 2025/2026</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Download size={17} />
              Download
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            title="Students"
            value={students.length}
            icon={FileText}
          />

          <SummaryCard
            title="Results Submitted"
            value={`${students.length}/${students.length}`}
            icon={CheckCircle2}
          />

          <SummaryCard
            title="Status"
            value="Ready for Review"
            icon={AlertCircle}
          />
        </div>

        {/* Result Table */}
        <div className="mt-8 overflow-hidden rounded-2xl border bg-white">
          <div className="border-b px-5 py-5">
            <h2 className="font-bold text-slate-900">Student Results</h2>

            <p className="mt-1 text-sm text-slate-500">
              Review the submitted scores before approving this class.
            </p>
          </div>

          {/* Desktop Header */}
          <div className="hidden grid-cols-6 border-b bg-slate-50 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500 md:grid">
            <span>Student</span>
            <span>CA</span>
            <span>Exam</span>
            <span>Total</span>
            <span>Grade</span>
            <span className="text-right">Status</span>
          </div>

          <div className="divide-y">
            {students.map((student) => (
              <StudentResultRow key={student.id} student={student} />
            ))}
          </div>
        </div>

        {/* Approval Section */}
        <div className="mt-6 rounded-2xl border bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Review & Approval</h2>

              <p className="mt-1 text-sm text-slate-500">
                Make sure all scores are correct before approving.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
              >
                <Send size={17} />
                Send Back
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                <CheckCircle2 size={17} />
                Approve Results
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* =========================================
   STUDENT RESULT ROW
========================================= */

function StudentResultRow({ student }) {
  return (
    <div className="grid gap-3 px-5 py-5 md:grid-cols-6 md:items-center">
      {/* Student */}
      <div>
        <p className="font-semibold text-slate-900">{student.name}</p>

        <p className="text-xs text-slate-400 md:hidden">
          Total: {student.total}
        </p>
      </div>

      {/* CA */}
      <div className="hidden text-sm text-slate-600 md:block">{student.ca}</div>

      {/* Exam */}
      <div className="hidden text-sm text-slate-600 md:block">
        {student.exam}
      </div>

      {/* Total */}
      <div className="text-sm font-bold text-slate-900">{student.total}</div>

      {/* Grade */}
      <div>
        <span className="inline-flex rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600">
          {student.grade}
        </span>
      </div>

      {/* Status */}
      <div className="flex md:justify-end">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
          <CheckCircle2 size={14} />
          Submitted
        </span>
      </div>
    </div>
  );
}

/* =========================================
   SUMMARY CARD
========================================= */

function SummaryCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="mt-2 text-xl font-bold text-slate-900">{value}</h3>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
}
