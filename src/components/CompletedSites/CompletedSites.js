// src/components/CompletedSitePage/CompletedSitePage.jsx
import React from "react";
import { useAMC } from "../AMCContext/AMCContext";
import "./CompletedSitePage.css";

const CompletedSites = () => {
  const { sites } = useAMC();

  // Combine completed AMC + Warranty sites
  const combinedCompleted = [
    ...sites.filter(s => s.completed).map(s => ({ ...s, type: "AMC" })),
    ...sites.filter(s => s.warrantyCompleted).map(s => ({ ...s, type: "Warranty" })),
  ];

  return (
    <div className="completed-sites-page">
      <h2>Completed Sites</h2>

      {combinedCompleted.length === 0 ? (
        <p>No completed sites yet.</p>
      ) : (
        <div className="completed-cards">
          {combinedCompleted.map(site => (
            <div key={site.id} className="completed-card">
              <h3>{site.name}</h3>
              <p><strong>Location:</strong> {site.location}</p>
              <p><strong>Type:</strong> {site.type}</p>
              <p><strong>Date:</strong> {site.completedDate || site.warrantyCompletedDate}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedSites;
