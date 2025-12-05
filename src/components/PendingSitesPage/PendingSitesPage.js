import React from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import "./amcSites.css";

const PendingSitesPage = () => {
  const { sites } = useAMC();
  const navigate = useNavigate();

  const pendingSites = sites.filter(s => !s.completed);

  return (
    <div className="amc-sites-container">
      <h2>Pending AMC Sites</h2>

      {pendingSites.length === 0 ? (
        <p>All sites are completed!</p>
      ) : (
        <div className="amc-sites-grid">
          {pendingSites.map(site => (
            <div
              key={site.id}
              className="amc-site-card pending"
              onClick={() => navigate(`/amc-sites/${site.id}`)}
            >
              <h3>{site.name}</h3>
              <p><strong>Area:</strong> {site.area}</p>
              <p><strong>Location:</strong> {site.location}</p>
              <p><strong>Scheduled Date:</strong> {site.serviceInfo?.date || "-"}</p>
              <p><strong>Scheduled Time:</strong> {site.serviceInfo?.time || "-"}</p>
              <p><strong>Technician:</strong> {site.serviceInfo?.technician || "-"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingSitesPage;
