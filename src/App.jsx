import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AboutUs from "./components/AboutUs";
import Navbar from "./components/Navigation";
import ElectricalEngineerLanding from "./components/Contact";
const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="contact" element={<ElectricalEngineerLanding />} />
      </Routes>
    </Router>
  );
};

export default App;
