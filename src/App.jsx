import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import Teachers from "./pages/Teachers";
import Classes from "./pages/Classes";
import Subjects from "./pages/Subjects";
// import Assignments from "./pages/Assignments";
import ReportCards from "./pages/ReportCards";
import ExamsCA from "./pages/Exams-Ca";
// import Settings from "./pages/Settings";
// import Profile from "./pages/Profile";

/* =========================================
   Dashboard Layout
========================================= */

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar / Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="min-h-screen lg:ml-64">{children}</main>
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

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* =================================
            SCHOOL DEMO PAGES
        ================================= */}

        {/* =================================
            ADMIN APPLICATION
        ================================= */}

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <AdminDashboard />
            </DashboardLayout>
          }
        />

        <Route
          path="/students"
          element={
            <DashboardLayout>
              <Students />
            </DashboardLayout>
          }
        />

        <Route
          path="/teachers"
          element={
            <DashboardLayout>
              <Teachers />
            </DashboardLayout>
          }
        />

        <Route
          path="/classes"
          element={
            <DashboardLayout>
              <Classes />
            </DashboardLayout>
          }
        />

        <Route
          path="/subjects"
          element={
            <DashboardLayout>
              <Subjects />
            </DashboardLayout>
          }
        />

        <Route
          path="/exams-ca"
          element={
            <DashboardLayout>
              <ExamsCA />
            </DashboardLayout>
          }
        />

        <Route
          path="/results"
          element={
            <DashboardLayout>
              <Results />
            </DashboardLayout>
          }
        />

        <Route
          path="/report-cards"
          element={
            <DashboardLayout>
              <ReportCards />
            </DashboardLayout>
          }
        />

        {/* <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        /> */}

        {/* <Route
          path="/profile"
          element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          }
        /> */}

        {/* =================================
            TEACHER APPLICATION
        ================================= */}

        <Route
          path="/teacher"
          element={
            <DashboardLayout>
              <TeacherDashboard />
            </DashboardLayout>
          }
        />
      </Routes>

      {/* =================================
          TOAST NOTIFICATIONS
      ================================= */}

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },

          error: {
            duration: 2000,
          },

          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#eaf2f4",
            color: "#000",
          },
        }}
      />
    </>
  );
}
