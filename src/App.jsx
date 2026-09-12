import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoutes";
import PublicRoute from "./components/PublicRoutes";

import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { Spinner } from "./components/Spinner";
import Navigation from "./components/NavBar";

import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Registeration";

import AdminDashboard from "./pages/Dashbord";
import TeacherDashboard from "./pages/Teacher";
import Results from "./pages/Results";

// Dashboard pages
import Students from "./pages/Students";
import Profile from "./pages/Profile";
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Subjects from "./pages/Subjects";
import ReportCards from "./pages/ReportCards";
import ExamsCA from "./pages/Exams-Ca";

/* =========================================
   Dashboard Layout
========================================= */

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="min-h-screen lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
}

/* =========================================
   App
========================================= */

export default function App() {
  const { authIsReady } = useAuthContext();

  const location = useLocation();

  /* Scroll to top whenever route changes */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /* Wait for Supabase to check the session */
  if (!authIsReady) {
    return <Spinner />;
  }

  return (
    <>
      <Routes>
        {/* =================================
            PUBLIC PAGES
        ================================= */}

        <Route path="/" element={<Home />} />

        {/* Login & Register */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* =================================
            PROTECTED APPLICATION
        ================================= */}

        <Route element={<ProtectedRoute />}>
          {/* Dashboard Layout */}
          <Route element={<DashboardLayout />}>
            {/* Admin Dashboard */}
            <Route path="/dashboard" element={<AdminDashboard />} />

            {/* Students */}
            <Route path="/students" element={<Students />} />

            {/* Teachers */}
            <Route path="/teachers" element={<Teachers />} />

            {/* school profiles */}
            <Route path="/profile" element={<Profile />} />

            {/* Classes */}
            <Route path="/classes" element={<Classes />} />

            {/* Subjects */}
            <Route path="/subjects" element={<Subjects />} />

            {/* Exams & CA */}
            <Route path="/exams-ca" element={<ExamsCA />} />

            {/* Results */}
            <Route path="/results" element={<Results />} />

            {/* Report Cards */}
            <Route path="/report-cards" element={<ReportCards />} />

            {/* Teacher Dashboard */}
            <Route path="/teacher" element={<TeacherDashboard />} />
          </Route>
        </Route>
      </Routes>

      {/* =================================
          TOAST NOTIFICATIONS
      ================================= */}

      <Toaster
        position="top-right"
        gutter={10}
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          duration: 3500,

          style: {
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "12px",
            padding: "14px 18px",
            background: "#ffffff",
            color: "#1f2937",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.10)",
            border: "1px solid #e5e7eb",
            maxWidth: "380px",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "#16a34a",
              secondary: "#ffffff",
            },
            style: {
              border: "1px solid #bbf7d0",
            },
          },

          error: {
            duration: 4000,
            iconTheme: {
              primary: "#dc2626",
              secondary: "#ffffff",
            },
            style: {
              border: "1px solid #fecaca",
            },
          },
        }}
      />
    </>
  );
}
