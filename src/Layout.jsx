// Layout.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";

// Components
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
  const hideNavbar = location.pathname === "/login";

  const { technicianName } = useAMC();

  return (
    <>
      {/* Hide Navbar only on Login Page */}
      {!hideNavbar && <Navbar />}

      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <div className="app-root">

              <Header />
              <AMC />
              <AMC_Plans />
              <WhyChooseanAMC />

              {/* Visit Plan visible only after login */}
              {technicianName && <VisitPlaning />}

              <Contact />
              <Footer />

            </div>
          }
        />

        {/* OTHER ROUTES CAN GO HERE */}

      </Routes>
    </>
  );
}

export default Layout;
