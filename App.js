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
import CompletedSitePage from "./components/CompletedSitePage/CompletedSitePage";
import PendingSitesPage from "./components/PendingSitesPage/PendingSitesPage";

// Context
import { AMCProvider } from "./components/AMCContext/AMCContext";

// Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AMCProvider>
      <BrowserRouter>
        <Routes>
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

          {/* Completed Site Page */}
          <Route path="/completed" element={<CompletedSitePage />} />
          <Route path="/amc-sites/pending" element={<PendingSitesPage />} />
        </Routes>
      </BrowserRouter>
    </AMCProvider>
  );
}

export default App;
