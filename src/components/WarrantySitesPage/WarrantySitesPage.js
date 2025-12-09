import React from "react";
import "./WarrantySitesPage.css";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";

const WarrantySitesPage = () => {
  const navigate = useNavigate();
  const { sites, markWarrantyCompleted } = useAMC();

  return (
    <div className="amc-sites-page">

      {/* Headline */}
      <h2 className="page-headline">Pending Warranty Sites</h2>

      <div className="cards-container">
        {sites
          .filter((s) => s.warranty && !s.warrantyCompleted) // Only Warranty Pending
          .map((site) => (
            <div className="amc-card" key={site.id}>
              
              <div className="card-header">
                <h3>{site.name}</h3>
              </div>

              <p><strong>Address:</strong> {site.address}</p>
              <p><strong>Area:</strong> {site.area}</p>
              <p><strong>Location:</strong> {site.location}</p>

              <button
                className={`view-btn ${site.warrantyCompleted ? "star-btn" : ""}`}
                onClick={() => {
                  markWarrantyCompleted(site.id);
                }}
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
