import React from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import "./CompletedSitesCard.css";

const CompletedSitesPage = () => {
  const { sites = [] } = useAMC(); // Default empty array
  const navigate = useNavigate();

  // Filter only completed sites
  const completedSites = sites.filter(site => site.completed);

  return (
    <div className="completed-sites-container">

      {/* Page Headline */}
      <h2 className="page-headline">Completed AMC Sites</h2>

      {/* View Calendar Button */}
      <div className="calendar-button-wrapper">
        <button 
          className="calendar-btn" 
          onClick={() => navigate("/calendar")}
        >
          View Calendar 📅
        </button>
      </div>

      {/* No completed sites message */}
      {completedSites.length === 0 ? (
        <p className="no-data">No sites completed yet. Let’s get to work!</p>
      ) : (

        /* Completed Sites Grid */
        <div className="completed-sites-grid">
          {completedSites.map(site => (
            <div
              key={site.id}
              className="completed-site-card"
              // onClick={() => navigate(`/amc-sites/${site.id}`)}
            >
              <h3>{site.name}</h3>
              <p><strong>Address:</strong> {site.address}</p>
              <p><strong>Area:</strong> {site.area}</p>
              <p><strong>Location:</strong> {site.location}</p>
              <p><strong>Service Date:</strong> {site.serviceInfo?.date || "Not recorded"}</p>
              <p><strong>Service Time:</strong> {site.serviceInfo?.time || "-"}</p>
              <p><strong>Technician:</strong> {site.serviceInfo?.technician || "-"}</p>
              <p className="view-details">Click to view site details →</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default CompletedSitesPage;
