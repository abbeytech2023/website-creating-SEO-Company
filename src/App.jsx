import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/NavBar";

import { Spinner } from "./components/Spinner";
import { useAuthContext } from "./hooks/useAuthContext";
import Results from "./pages/Results";
import AdminDashboard from "./pages/Dashbord";
// import InstallButton from "./components/InstallButton";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TeacherDashboard from "./pages/Teacher";
import RoyalPriesthoodHome from "./pages/RoyalPriestSchool";
import BrightChildSchool from "./pages/BrigntChild";

export default function App() {
  const { authIsReady } = useAuthContext();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [URL]);
  console.log(authIsReady);

  return (
    <div className="flex flex-col min-h-screen">
      {!authIsReady && <Spinner />}
      {authIsReady && (
        <>
          {/* <InstallButton /> */}
          {/* <Navbar /> */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/results" element={<Results />} />
              <Route path="/school1" element={<RoyalPriesthoodHome />} />
              <Route path="/school2" element={<BrightChildSchool />} />
            </Routes>
            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 3000,
                  color: "#144c6f",
                },
                error: {
                  duration: 2000,
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "#eaf2f4",
                  color: "black",
                },
              }}
            />
          </main>
          {/* <Footer /> */}
        </>
      )}
    </div>
  );
}
