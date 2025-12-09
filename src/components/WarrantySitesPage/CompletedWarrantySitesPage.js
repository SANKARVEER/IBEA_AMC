import React from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import "./CompletedWarrantySitesCard.css";

const CompletedWarrantySitesPage = () => {
  const { sites = [] } = useAMC();
  const navigate = useNavigate();

  // Filter WARRANTY completed sites
  const completedWarranty = sites.filter(site => site.warrantyCompleted);

  return (
    <div className="completed-sites-container">

      <h2 className="page-headline">Completed Warranty Sites</h2>

      <div className="calendar-button-wrapper">
        <button 
          className="calendar-btn"
          onClick={() => navigate("/calendar")}
        >
          View Calendar 📅
        </button>
      </div>

      {completedWarranty.length === 0 ? (
        <p className="no-data">No warranty sites completed yet.</p>
      ) : (
        <div className="completed-sites-grid">
          {completedWarranty.map(site => (
            <div
              key={site.id}
              className="completed-site-card"
              onClick={() => navigate(`/warranty-sites/${site.id}`)}
            >
              <h3>{site.name}</h3>
              <p><strong>Address:</strong> {site.address}</p>
              <p><strong>Area:</strong> {site.area}</p>
              <p><strong>Location:</strong> {site.location}</p>

              <p><strong>Completed Date:</strong> {site.warrantyInfo?.date || "-"}</p>
              <p><strong>Completed Time:</strong> {site.warrantyInfo?.time || "-"}</p>
              <p><strong>Technician:</strong> {site.warrantyInfo?.technician || "-"}</p>

              <p className="view-details">Click to view warranty details →</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedWarrantySitesPage;
