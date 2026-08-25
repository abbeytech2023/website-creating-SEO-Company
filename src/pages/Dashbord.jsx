import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AddStudentForm from "../components/AddStudentForm";
import AddTeacherForm from "../components/AddTeacherForm";
import TeacherList from "../components/TeacherList";

import {
  Users,
  UserCheck,
  ClipboardCheck,
  FileText,
  Plus,
  ArrowRight,
  Bell,
  Settings,
  X,
} from "lucide-react";

export default function AdminDashboard() {
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [showTeacherList, setShowTeacherList] = useState(false);

  // Prevent background scrolling when an overlay is open
  useEffect(() => {
    const overlayOpen = showAddStudent || showAddTeacher || showTeacherList;

    document.body.style.overflow = overlayOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showAddStudent, showAddTeacher, showTeacherList]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HEADER ================= */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/">
            <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>

            <p className="text-sm text-slate-500">Welcome back, Admin</p>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100"
            >
              <Bell size={20} />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
              A
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-7xl p-6">
        {/* School Information */}
        <section className="mb-6 rounded-2xl bg-indigo-600 p-6 text-white shadow-sm">
          <p className="text-sm text-indigo-100">2025/2026 Academic Session</p>

          <h2 className="mt-1 text-2xl font-bold">Second Term</h2>

          <p className="mt-1 text-sm text-indigo-100">Excellence Academy</p>
        </section>

        {/* ================= STATISTICS ================= */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard icon={Users} title="Students" value="248" />

          {/* Clickable Teachers Card */}
          <StatCard
            icon={UserCheck}
            title="Teachers"
            value="18"
            onClick={() => setShowTeacherList(true)}
          />

          <StatCard icon={ClipboardCheck} title="Results" value="75%" />

          <StatCard icon={FileText} title="Reports" value="186" />
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">Quick Actions</h2>

            <p className="text-sm text-slate-500">
              Common school management tasks
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <ActionButton
              icon={Plus}
              label="Add Student"
              onClick={() => setShowAddStudent(true)}
            />

            <ActionButton
              icon={Plus}
              label="Add Teacher"
              onClick={() => setShowAddTeacher(true)}
            />

            <ActionButton
              to="/results"
              icon={ClipboardCheck}
              label="Prepare Results"
            />

            <ActionButton icon={FileText} label="View Reports" />
          </div>
        </section>

        {/* ================= RESULT PROGRESS ================= */}
        <section className="mt-8 overflow-hidden rounded-2xl border bg-white">
          <div className="flex items-center justify-between border-b p-5">
            <div>
              <h2 className="font-bold text-slate-900">Result Progress</h2>

              <p className="mt-1 text-sm text-slate-500">
                Current term result preparation
              </p>
            </div>

            <Link
              to="/results"
              className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="divide-y">
            <ResultRow className="JSS 1A" progress={100} />

            <ResultRow className="JSS 1B" progress={80} />

            <ResultRow className="JSS 2A" progress={60} />

            <ResultRow className="SS 1A" progress={40} />
          </div>
        </section>

        {/* ================= NAVIGATION ================= */}
        <section className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          <SimpleLink icon={Users} title="Students" />

          {/* Teachers */}
          <SimpleLink
            icon={UserCheck}
            title="Teachers"
            onClick={() => setShowTeacherList(true)}
          />

          <SimpleLink icon={ClipboardCheck} title="Results" to="/results" />

          <SimpleLink icon={Settings} title="Settings" />
        </section>
      </main>

      {/* =====================================================
          ADD STUDENT MODAL
      ===================================================== */}

      {showAddStudent && (
        <Modal onClose={() => setShowAddStudent(false)}>
          <AddStudentForm onClose={() => setShowAddStudent(false)} />
        </Modal>
      )}

      {/* =====================================================
          ADD TEACHER MODAL
      ===================================================== */}

      {showAddTeacher && (
        <Modal onClose={() => setShowAddTeacher(false)}>
          <AddTeacherForm onClose={() => setShowAddTeacher(false)} />
        </Modal>
      )}

      {/* =====================================================
          TEACHER LIST OVERLAY
      ===================================================== */}

      {showTeacherList && (
        <TeacherListOverlay onClose={() => setShowTeacherList(false)} />
      )}
    </div>
  );
}

/* =========================================================
   TEACHER LIST OVERLAY
========================================================= */

function TeacherListOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-slate-50 shadow-2xl">
        {/* Overlay Header */}
        <div className="flex shrink-0 items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Teachers</h2>

            <p className="text-sm text-slate-500">
              Manage school teachers and their assignments
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </div>

        {/* Teacher List */}
        <div className="flex-1 overflow-y-auto">
          <TeacherList />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MODAL
========================================================= */

function Modal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={20} />
        </button>

        {children}
      </div>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ icon: Icon, title, value, onClick }) {
  const content = (
    <>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <Icon size={19} />
      </div>

      <p className="mt-4 text-sm text-slate-500">{title}</p>

      <h3 className="mt-1 text-2xl font-bold text-slate-900">{value}</h3>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-sm"
      >
        {content}
      </button>
    );
  }

  return <div className="rounded-2xl border bg-white p-5">{content}</div>;
}

/* =========================================================
   ACTION BUTTON
========================================================= */

function ActionButton({ icon: Icon, label, onClick, to }) {
  const content = (
    <>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-100">
        <Icon size={19} />
      </div>

      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="group flex items-center gap-3 rounded-2xl border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-2xl border bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm"
    >
      {content}
    </button>
  );
}

/* =========================================================
   RESULT ROW
========================================================= */

function ResultRow({ className, progress }) {
  return (
    <div className="flex items-center gap-4 p-5">
      <div className="w-20 shrink-0 text-sm font-semibold text-slate-700">
        {className}
      </div>

      <div className="flex-1">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs text-slate-400">Completion</span>

          <span className="text-xs font-semibold text-slate-600">
            {progress}%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-indigo-600 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SIMPLE NAVIGATION
========================================================= */

function SimpleLink({ icon: Icon, title, onClick, to }) {
  const content = (
    <>
      <Icon size={19} className="text-indigo-600" />

      <span className="text-sm font-semibold text-slate-700">{title}</span>

      <ArrowRight
        size={16}
        className="ml-auto text-slate-400 transition group-hover:translate-x-1"
      />
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="group flex items-center gap-3 rounded-2xl border bg-white p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-2xl border bg-white p-4 text-left transition hover:border-indigo-300 hover:bg-indigo-50"
    >
      {content}
    </button>
  );
}
