import React from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import "./CompletedWarrantySitesPage.css";

const CompletedWarrantySitesPage = () => {
  const { completedWarranty } = useAMC();
  const navigate = useNavigate();

  return (
    <div className="completed-warranty-container">
      <h2 className="page-title">Completed Warranty Sites</h2>

      {completedWarranty.length === 0 ? (
        <p className="no-data">No warranty sites completed yet.</p>
      ) : (
        <div className="completed-warranty-grid">
          {completedWarranty.map(site => (
            <div
              key={site.id}
              className="warranty-site-card"
              onClick={() => navigate(`/warranty-sites/${site.id}`)}
            >
              <h3>{site.name}</h3>
              <p><strong>Address:</strong> {site.address}</p>
              <p><strong>Area:</strong> {site.area}</p>
              <p><strong>Location:</strong> {site.location}</p>
              <p><strong>Plan:</strong> {site.warrantyPlan}</p>
              <p><strong>Date:</strong> {site.warrantyInfo?.date || "-"}</p>
              <p><strong>Time:</strong> {site.warrantyInfo?.time || "-"}</p>
              <p><strong>Technician:</strong> {site.warrantyInfo?.technician || "-"}</p>
              <p className="view-details">Click to view details →</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedWarrantySitesPage;
