// src/components/WarrantySitesPage/WarrantySitesPage.jsx
import React from "react";
import "./WarrantySitesPage.css";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";

const WarrantySitesPage = () => {
  const navigate = useNavigate();
  const { sites, markWarrantyCompleted } = useAMC();

  return (
    <div className="amc-sites-page">

      {/* Top Bar */}
      <div className="top-bar">
        <h2 className="page-headline">Warranty Sites</h2>

        <button
          className="create-btn"
          onClick={() => navigate("/create-warranty-site")}
        >
          + Create New Warranty Site
        </button>
      </div>

      <div className="cards-container">
        {sites
          .filter((s) => s.warranty && !s.warrantyCompleted) // Only pending Warranty sites
          .map((site) => (
            <div className="amc-card" key={site.id}>

              <div className="card-header">
                <h3>{site.name}</h3>
              </div>

              <p><strong>Address:</strong> {site.address}</p>
              <p><strong>Area:</strong> {site.area}</p>
              <p><strong>Location:</strong> {site.location}</p>
              {/* <p><strong>Plan:</strong> {site.warrantyPlan}</p> */}

              <button
                className={`view-btn ${site.warrantyCompleted ? "star-btn" : ""}`}
                onClick={() => markWarrantyCompleted(site.id)}
              >
                {site.warrantyCompleted ? "⭐ Done" : "Warranty Done →"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WarrantySitesPage;
