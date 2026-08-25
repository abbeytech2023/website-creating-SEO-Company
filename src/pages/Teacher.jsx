import {
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Users,
} from "lucide-react";

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex min-h-20 items-center justify-between gap-4 px-6 py-4 lg:px-8">
          <div>
            <p className="text-sm text-slate-500">Friday, August 22, 2026</p>

            <h1 className="mt-1 text-xl font-bold text-slate-900">
              Good afternoon, Mr. Adewale 👋
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50">
              <Bell size={19} />

              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Mr. Adewale
              </p>

              <p className="text-xs text-slate-500">Mathematics Teacher</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
              MA
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-6 py-8 lg:px-8">
        {/* Welcome Banner */}
        <section className="overflow-hidden rounded-2xl bg-indigo-600 p-6 text-white shadow-lg shadow-indigo-100 sm:p-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-medium text-indigo-200">
                GOLDEN HERITAGE SCHOOL
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Welcome to your teacher portal
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100">
                Manage your assigned classes, enter student scores and submit
                completed results from one place.
              </p>
            </div>

            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <GraduationCap size={34} />
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-bold text-slate-900">Your Overview</h2>

            <p className="mt-1 text-sm text-slate-500">
              Your teaching and result preparation activities
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="My Classes"
              value="4"
              icon={<BookOpen size={21} />}
            />

            <StatCard
              title="My Students"
              value="126"
              icon={<Users size={21} />}
            />

            <StatCard
              title="Subjects"
              value="3"
              icon={<GraduationCap size={21} />}
            />

            <StatCard
              title="Results Completed"
              value="82%"
              icon={<BarChart3 size={21} />}
              positive
            />
          </div>
        </section>

        {/* Main Content */}
        <section className="grid gap-6 lg:grid-cols-3">
          {/* My Classes */}
          <div className="rounded-2xl border border-slate-200 bg-white lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 p-6">
              <div>
                <h2 className="font-bold text-slate-900">My Classes</h2>

                <p className="mt-1 text-sm text-slate-500">
                  Classes assigned to you
                </p>
              </div>

              <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              <ClassItem
                className="JSS 2"
                subject="Mathematics"
                students="32 students"
                progress="100%"
                status="Completed"
              />

              <ClassItem
                className="JSS 1"
                subject="Mathematics"
                students="35 students"
                progress="85%"
                status="In Progress"
              />

              <ClassItem
                className="Primary 6"
                subject="Mathematics"
                students="29 students"
                progress="70%"
                status="In Progress"
              />

              <ClassItem
                className="Primary 5"
                subject="Mathematics"
                students="30 students"
                progress="45%"
                status="Pending"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">Quick Actions</h2>

            <p className="mt-1 text-sm text-slate-500">
              Frequently used actions
            </p>

            <div className="mt-5 space-y-3">
              <QuickAction
                icon={<BarChart3 size={19} />}
                title="Enter Scores"
                text="Enter CA and exam scores"
              />

              <QuickAction
                icon={<Users size={19} />}
                title="My Students"
                text="View your students"
              />

              <QuickAction
                icon={<BookOpen size={19} />}
                title="My Classes"
                text="View assigned classes"
              />

              <QuickAction
                icon={<CheckCircle2 size={19} />}
                title="Submitted Results"
                text="View completed results"
              />
            </div>
          </div>
        </section>

        {/* Result Progress */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Result Preparation</h2>

                <p className="mt-1 text-sm text-slate-500">
                  First Term · 2026/2027
                </p>
              </div>

              <BarChart3 size={24} className="text-indigo-600" />
            </div>

            <div className="mt-7">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-4xl font-bold text-slate-900">82%</p>

                  <p className="mt-1 text-sm text-slate-500">
                    Overall completion
                  </p>
                </div>

                <p className="text-sm font-semibold text-indigo-600">
                  3 of 4 completed
                </p>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[82%] rounded-full bg-indigo-600" />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <ProgressBox value="3" label="Completed" />

                <ProgressBox value="1" label="Pending" />

                <ProgressBox value="4" label="Classes" />
              </div>
            </div>
          </div>

          {/* Deadline */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Result Deadline</h2>

                <p className="mt-1 text-sm text-slate-500">
                  First Term result submission
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                <Clock3 size={21} />
              </div>
            </div>

            <div className="mt-7 flex items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-indigo-50">
                <span className="text-xs font-bold text-indigo-600">AUG</span>

                <span className="text-2xl font-bold text-slate-900">25</span>
              </div>

              <div>
                <p className="text-lg font-bold text-slate-900">
                  3 days remaining
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Please complete and submit all pending results before the
                  deadline.
                </p>
              </div>
            </div>

            <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
              Continue Result Entry
              <ArrowRight size={17} />
            </button>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 p-6">
            <div>
              <h2 className="font-bold text-slate-900">Recent Activity</h2>

              <p className="mt-1 text-sm text-slate-500">
                Your latest activities
              </p>
            </div>

            <button className="text-sm font-semibold text-indigo-600">
              View all
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            <Activity
              title="JSS 2 Mathematics result submitted"
              time="10 minutes ago"
              completed
            />

            <Activity
              title="JSS 1 Mathematics score updated"
              time="1 hour ago"
            />

            <Activity
              title="Primary 6 Mathematics result started"
              time="3 hours ago"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

/* -------------------------------- */
/* Components                       */
/* -------------------------------- */

function StatCard({ title, value, icon, positive }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>
      </div>

      {positive && (
        <p className="mt-4 text-xs font-semibold text-green-600">
          +8.5% this term
        </p>
      )}
    </div>
  );
}

function ClassItem({ className, subject, students, progress, status }) {
  const completed = status === "Completed";

  return (
    <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        <BookOpen size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-semibold text-slate-800">{className}</h3>

          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-500">
            {subject}
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-500">{students}</p>
      </div>

      <div className="w-full sm:w-32">
        <div className="mb-2 flex justify-between text-[10px]">
          <span className="font-medium text-slate-400">Progress</span>

          <span className="font-semibold text-slate-600">{progress}</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${
              completed ? "w-full bg-green-500" : "bg-indigo-600"
            }`}
            style={{
              width: completed ? "100%" : progress,
            }}
          />
        </div>
      </div>

      <span
        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
          completed
            ? "bg-green-50 text-green-600"
            : status === "In Progress"
              ? "bg-indigo-50 text-indigo-600"
              : "bg-orange-50 text-orange-600"
        }`}
      >
        {status}
      </span>
    </div>
  );
}

function QuickAction({ icon, title, text }) {
  return (
    <button className="flex w-full items-center gap-3 rounded-xl border border-slate-100 p-3 text-left transition hover:border-indigo-100 hover:bg-indigo-50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-800">{title}</p>

        <p className="mt-0.5 truncate text-xs text-slate-500">{text}</p>
      </div>

      <ArrowRight size={16} className="ml-auto shrink-0 text-slate-400" />
    </button>
  );
}

function ProgressBox({ value, label }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4 text-center">
      <p className="text-xl font-bold text-slate-900">{value}</p>

      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </div>
  );
}

function Activity({ title, time, completed }) {
  return (
    <div className="flex items-center gap-4 p-5">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          completed
            ? "bg-green-50 text-green-600"
            : "bg-indigo-50 text-indigo-600"
        }`}
      >
        {completed ? <CheckCircle2 size={19} /> : <Clock3 size={19} />}
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-800">{title}</p>

        <p className="mt-1 text-xs text-slate-400">{time}</p>
      </div>
    </div>
  );
}
