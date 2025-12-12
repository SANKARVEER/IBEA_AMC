// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// --------------------------
// Layout Components
// --------------------------
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import AMC from "./components/AMC/AMC";
import AMC_Plans from "./components/AMC_Plans/AMC_Plans";
import WhyChooseanAMC from "./components/WhyChooseAnAMC/WhyChooseAnAMC";
import VisitPlaning from "./components/visitPlaning/visitplaning";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

// --------------------------
// AMC Pages
// --------------------------
import AmcSitesPage from "./components/AmcSitePages/amcsitespage";
import AmcSiteDetails from "./components/AmcSiteDetailes/amcsitedetails";
import CompletedSites from "./components/CompletedSitePage/CompletedSitePage";
import PendingSitesPage from "./components/PendingSitesPage/PendingSitesPage";
import CreateNewAmcPage from "./components/CreateNewAmcPage/CreateNewAmcPage";

// --------------------------
// Calendar
// --------------------------
import CalendarPage from "./components/CalendarPage/CalendarPage";

// --------------------------
// Service Completion
// --------------------------
import ServiceCompletionPage from "./components/ServiceCompletionPage/ServiceCompletionPage";

// --------------------------
// Warranty Pages
// --------------------------
import WarrantySitesPage from "./components/WarrantySitesPage/WarrantySitesPage";
import CompletedWarrantySitesPage from "./components/WarrantySitesPage/CompletedWarrantySitesPage";
import WarrantyDetailsPage from "./components/WarrantySitesPage/WarrantyDetailsPage";
import CreateNewWarrantyPage from "./components/CreateNewWarrantyPage/CreateNewWarrantyPage";

// --------------------------
// Login
// --------------------------
import Login from "./components/Login/Login";

// --------------------------
// Add Global Group
import AddGroup from "./components/AddGroup/AddGroup.js";



// --------------------------
// Context
// --------------------------
import { AMCProvider } from "./components/AMCContext/AMCContext";


// ======================================================
// Layout Wrapper
// ======================================================
function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Home Page Sections */}
        <Route
          path="/"
          element={
            <div className="app-root">
              <Header />
              <AMC />
              <AMC_Plans />
              <WhyChooseanAMC />
              <VisitPlaning />
              <Contact />
              <Footer />
            </div>
          }
        />

        {/* AMC Routes */}
        <Route path="/amc-sites" element={<AmcSitesPage />} />
        <Route path="/amc-sites/:id" element={<AmcSiteDetails />} />
        <Route path="/completed-sites" element={<CompletedSites />} />
        <Route path="/amc-sites/pending" element={<PendingSitesPage />} />

        {/* Create New AMC Site */}
        <Route path="/create-amc-page" element={<CreateNewAmcPage />} />

        {/* Calendar */}
        <Route path="/calendar" element={<CalendarPage />} />

        {/* Service Completion */}
        <Route path="/service-completed/:id" element={<ServiceCompletionPage />} />

        {/* Warranty Routes */}
        <Route path="/warranty-sites" element={<WarrantySitesPage />} />
        <Route path="/create-warranty-site" element={<CreateNewWarrantyPage />} />
        <Route path="/completed-warranty" element={<CompletedWarrantySitesPage />} />
        <Route path="/warranty-sites/:id" element={<WarrantyDetailsPage />} />

        <Route path="/add-group" element={<AddGroup />} />

      </Routes>
    </>
  );
}


// ======================================================
// App Component
// ======================================================
function App() {
  return (
    <AMCProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AMCProvider>
  );
}

export default App;
