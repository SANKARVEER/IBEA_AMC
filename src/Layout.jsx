// Layout.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";

/* ===================== COMPONENTS ===================== */
import Navbar from "../Navbar/Navbar";
import Header from "../Header/Header";
import AMC from "../AMC/AMC";
import AMC_Plans from "../AMC_Plans/AMC_Plans";
import WhyChooseanAMC from "../WhyChooseAnAMC/WhyChooseAnAMC";
import VisitPlaning from "../visitPlaning/VisitPlaning";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";

function Layout() {
  const location = useLocation();
  const { technicianName } = useAMC();

  /* Hide Navbar only on Login page */
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {/* NAVBAR */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ================= LOGIN ================= */}
        <Route path="/login" element={<Login />} />

        {/* ================= HOME ================= */}
        <Route
          path="/"
          element={
            <div className="app-root">
              <Header />
              <AMC />
              <AMC_Plans />
              <WhyChooseanAMC />

              {/* Visible only after login */}
              {technicianName && <VisitPlaning />}

              <Contact />
              <Footer />
            </div>
          }
        />

        {/* ================= OTHER ROUTES ================= */}
        {/* Add protected routes here later */}
      </Routes>
    </>
  );
}

export default Layout;
