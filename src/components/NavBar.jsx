import { NavLink } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import {
  BarChart3,
  BookOpen,
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  UserRound,
  Users,
  X,
  ClipboardCheck,
} from "lucide-react";
import { useState } from "react";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { logout } = useLogout();

  const navigation = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Students",
      path: "/students",
      icon: Users,
    },
    {
      name: "Teachers",
      path: "/teachers",
      icon: UserRound,
    },
    {
      name: "Classes",
      path: "/classes",
      icon: GraduationCap,
    },
    {
      name: "Subjects",
      path: "/subjects",
      icon: BookOpen,
    },
    {
      name: "Exams & CA",
      path: "/exams-ca",
      icon: ClipboardCheck,
    },
    {
      name: "Results",
      path: "/results",
      icon: BarChart3,
    },
    {
      name: "Report Cards",
      path: "/report-cards",
      icon: FileText,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* =========================
          DESKTOP NAVIGATION
      ========================== */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <GraduationCap size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-900">
                Schola
              </h1>

              <p className="text-xs text-slate-500">School Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={19}
                      className={
                        isActive
                          ? "text-emerald-600"
                          : "text-slate-400 group-hover:text-slate-600"
                      }
                    />

                    <span>{item.name}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="border-t border-slate-200 p-4">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-slate-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
              AD
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                Admin
              </p>

              <p className="truncate text-xs text-slate-500">Administrator</p>
            </div>

            <ChevronDown
              size={17}
              className={`text-slate-400 transition ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="mt-2 rounded-xl border border-slate-200 bg-white p-1 shadow-lg">
              <NavLink
                to="/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                <UserRound size={17} />
                My Profile
              </NavLink>

              <NavLink
                to="/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
              >
                <Settings size={17} />
                Settings
              </NavLink>

              <button
                onClick={logout}
                className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={17} />
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* =========================
          MOBILE HEADER
      ========================== */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <GraduationCap size={19} />
            </div>

            <span className="font-bold text-slate-900">Schola</span>
          </div>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
          AD
        </div>
      </header>

      {/* =========================
          MOBILE OVERLAY
      ========================== */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-50 bg-slate-900/40 lg:hidden"
        />
      )}

      {/* =========================
          MOBILE SIDEBAR
      ========================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-[60] w-72 bg-white shadow-xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <GraduationCap size={19} />
            </div>

            <span className="font-bold text-slate-900">Schola</span>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="space-y-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-slate-600 hover:bg-slate-50"
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Mobile Logout */}
        <div className="absolute bottom-0 cursor-pointer left-0 right-0 border-t border-slate-200 bg-white p-4">
          <button
            onClick={logout}
            className="flex w-full  items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
