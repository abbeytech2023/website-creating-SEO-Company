import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddStudentForm from "../components/AddStudentForm";
import AddTeacherForm from "../components/AddTeacherForm";
import TeacherList from "../components/TeacherList";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Plus,
  Settings,
  UserCheck,
  Users,
  X,
} from "lucide-react";

const resultProgress = [
  { name: "JSS 1A", progress: 100 },
  { name: "JSS 1B", progress: 80 },
  { name: "JSS 2A", progress: 60 },
  { name: "SS 1A", progress: 40 },
];

export default function AdminDashboard() {
  const [activePanel, setActivePanel] = useState(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setActivePanel(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = activePanel ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activePanel]);

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="group flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
              <GraduationCap size={21} />
            </div>
            <div>
              <p className="text-base font-bold tracking-tight text-slate-900">
                Excellence Academy
              </p>
              <p className="text-xs font-medium text-slate-500">
                Administrator workspace
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="View notifications"
              className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <Bell size={20} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
            </button>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-200">
              A
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-violet-600 px-6 py-7 text-white shadow-xl shadow-indigo-200 sm:px-9 sm:py-9">
          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-28 right-24 h-48 w-48 rounded-full border-[24px] border-white/10" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-50">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                2025/2026 academic session
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Good morning, Admin
              </h1>
              <p className="mt-2 text-sm text-indigo-100 sm:text-base">
                Everything is on track for{" "}
                <span className="font-semibold text-white">Second Term</span>.
              </p>
            </div>
            <Link
              to="/results"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
            >
              Review results <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section
          className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          aria-label="School overview"
        >
          <StatCard
            icon={Users}
            label="Students"
            value="248"
            detail="12 new this term"
            accent="indigo"
          />
          <StatCard
            icon={UserCheck}
            label="Teachers"
            value="18"
            detail="View staff directory"
            accent="violet"
            onClick={() => setActivePanel("teachers")}
          />
          <StatCard
            icon={ClipboardCheck}
            label="Results ready"
            value="75%"
            detail="3 classes pending"
            accent="emerald"
          />
          <StatCard
            icon={FileText}
            label="Reports"
            value="186"
            detail="Updated today"
            accent="amber"
          />
        </section>

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,.75fr)]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <SectionHeading
              title="Result progress"
              description="Current term result preparation"
              action={
                <Link
                  to="/results"
                  className="inline-flex items-center gap-1 text-sm font-bold text-indigo-600 hover:text-indigo-800"
                >
                  View all <ArrowRight size={16} />
                </Link>
              }
            />
            <div className="mt-6 space-y-5">
              {resultProgress.map((item) => (
                <ResultRow key={item.name} {...item} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeading
              title="Quick actions"
              description="Start a common task in one click"
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <ActionButton
                icon={Plus}
                title="Add student"
                description="Create a new student record"
                onClick={() => setActivePanel("student")}
              />
              <ActionButton
                icon={UserCheck}
                title="Add teacher"
                description="Invite a staff member"
                onClick={() => setActivePanel("teacher")}
              />
              <ActionButton
                icon={ClipboardCheck}
                title="Prepare results"
                description="Enter and publish grades"
                to="/results"
              />
            </div>
          </section>
        </div>

        <section className="mt-10">
          <SectionHeading
            title="Manage your school"
            description="Jump to an area of the administration portal"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <NavigationCard
              icon={Users}
              title="Students"
              description="Profiles and enrollment"
            />
            <NavigationCard
              icon={UserCheck}
              title="Teachers"
              description="Staff and assignments"
              onClick={() => setActivePanel("teachers")}
            />
            <NavigationCard
              icon={ClipboardCheck}
              title="Results"
              description="Grades and performance"
              to="/results"
            />
            <NavigationCard
              icon={Settings}
              title="Settings"
              description="School preferences"
            />
          </div>
        </section>
      </main>

      {activePanel === "student" && (
        <Modal title="Add a student" onClose={() => setActivePanel(null)}>
          <AddStudentForm onClose={() => setActivePanel(null)} />
        </Modal>
      )}
      {activePanel === "teacher" && (
        <Modal title="Add a teacher" onClose={() => setActivePanel(null)}>
          <AddTeacherForm onClose={() => setActivePanel(null)} />
        </Modal>
      )}
      {activePanel === "teachers" && (
        <TeacherListOverlay onClose={() => setActivePanel(null)} />
      )}
    </div>
  );
}

function SectionHeading({ title, description, action }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, detail, accent, onClick }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    violet: "bg-violet-50 text-violet-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
  };
  const content = (
    <>
      <div
        className={`grid h-10 w-10 place-items-center rounded-xl ${colors[accent]}`}
      >
        <Icon size={19} />
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-1 flex items-end justify-between gap-2">
        <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {value}
        </p>
        {onClick && <ArrowRight size={17} className="mb-1 text-slate-400" />}
      </div>
      <p className="mt-1 text-xs font-medium text-slate-400">{detail}</p>
    </>
  );
  const classes =
    "rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition sm:p-5";
  return onClick ? (
    <button
      type="button"
      onClick={onClick}
      className={`${classes} hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500`}
    >
      {content}
    </button>
  ) : (
    <div className={classes}>{content}</div>
  );
}

function ActionButton({ icon: Icon, title, description, onClick, to }) {
  const content = (
    <>
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
        <Icon size={20} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-slate-800">{title}</p>
        <p className="mt-0.5 truncate text-xs text-slate-500">{description}</p>
      </div>
      <ArrowRight
        size={17}
        className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
      />
    </>
  );
  const classes =
    "group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500";
  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

function ResultRow({ name, progress }) {
  const complete = progress === 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700">{name}</span>
          {complete && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
              <CheckCircle2 size={12} /> Complete
            </span>
          )}
        </div>
        <span className="text-sm font-bold text-slate-600">{progress}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${complete ? "bg-emerald-500" : "bg-indigo-600"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function NavigationCard({ icon: Icon, title, description, onClick, to }) {
  const content = (
    <>
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-indigo-50 group-hover:text-indigo-600">
        <Icon size={19} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-slate-800">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
      <ArrowRight
        size={17}
        className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-indigo-600"
      />
    </>
  );
  const classes =
    "group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-200 hover:bg-indigo-50/30 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
  return to ? (
    <Link to={to} className={classes}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}

function Modal({ children, title, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white text-slate-500 shadow-md transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
}

function TeacherListOverlay({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Teachers"
        className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-3xl bg-slate-50 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-7">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Teachers</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              Manage staff and their assignments
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close teachers"
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <X size={20} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <TeacherList />
        </div>
      </div>
    </div>
  );
}
