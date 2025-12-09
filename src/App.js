// src/App.js
import React from "react";
import "./App.css";

// UI Components
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import AMC from "./components/AMC/AMC";
import AMC_Plans from "./components/AMC_Plans/AMC_Plans";
import WhyChooseanAMC from "./components/WhyChooseAnAMC/WhyChooseAnAMC";
import VisitPlaning from "./components/visitPlaning/visitplaning";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

// AMC Pages
import AmcSitesPage from "./components/AmcSitePages/amcsitespage";
import AmcSiteDetails from "./components/AmcSiteDetailes/amcsitedetails";
import CompletedSites from "./components/CompletedSitePage/CompletedSitePage";
import PendingSitesPage from "./components/PendingSitesPage/PendingSitesPage";

// Calendar Page
import CalendarPage from "./components/Calendar/CalendarPage";

// Service Completion Page
import ServiceCompletionPage from "./components/ServiceCompletionPage/ServiceCompletionPage";

// ⭐ WARRANTY Pages
import WarrantySitesPage from "./components/WarrantySitesPage/WarrantySitesPage";
import CompletedWarrantySitesPage from "./components/WarrantySitesPage/CompletedWarrantySitesPage";
import WarrantyDetailsPage from "./components/WarrantySitesPage/WarrantyDetailsPage";

// ⭐ Login Page
import Login from "./components/Login/Login";

// Context
import { AMCProvider } from "./components/AMCContext/AMCContext";

// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AMCProvider>
      <BrowserRouter>
        <Routes>

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Home Page */}
          <Route
            path="/"
            element={
              <div className="app-root">
                <Navbar />
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

          {/* AMC Sites List */}
          <Route path="/amc-sites" element={<AmcSitesPage />} />

          {/* AMC Site Details */}
          <Route path="/amc-sites/:id" element={<AmcSiteDetails />} />

          {/* Completed AMC */}
          <Route path="/completed" element={<CompletedSites />} />

          {/* Pending AMC Sites */}
          <Route path="/amc-sites/pending" element={<PendingSitesPage />} />

          {/* Calendar Page */}
          <Route path="/calendar" element={<CalendarPage />} />

          {/* AMC Service Completed Page */}
          <Route path="/service-completed/:id" element={<ServiceCompletionPage />} />

          {/* Warranty Pages */}
          <Route path="/warranty-sites" element={<WarrantySitesPage />} />

          {/* Completed Warranty Sites */}
          <Route path="/completed-warranty" element={<CompletedWarrantySitesPage />} />

          {/* Warranty Details Page */}
          <Route path="/warranty-sites/:id" element={<WarrantyDetailsPage />} />

        </Routes>
      </BrowserRouter>
    </AMCProvider>
  );
}

export default App;
