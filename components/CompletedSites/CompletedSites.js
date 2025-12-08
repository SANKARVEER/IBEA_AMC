import React from "react";
import { useAMC } from "../AMCContext/AMCContext";
import "./completed.css";

const CompletedSites = () => {
  const { sites } = useAMC();

  const completedSites = sites.filter(s => s.completed);

  return (
    <div className="completed-container">
      <h2>AMC Buildings Completed</h2>

      <div className="completed-grid">
        {completedSites.map(site => (
          <div className="completed-card" key={site.id}>
            <h3>⭐ {site.name}</h3>
            <p><strong>Address:</strong> {site.address}</p>
            <p><strong>Area:</strong> {site.area}</p>
            <p><strong>Location:</strong> {site.location}</p>

            <p className="info">
              <strong>Date:</strong> {site.serviceInfo?.date}<br />
              <strong>Time:</strong> {site.serviceInfo?.time}<br />
              <strong>Technician:</strong> {site.serviceInfo?.technician}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedSites;
