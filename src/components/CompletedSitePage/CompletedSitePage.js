import React from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import "./CompletedSitesCard.css";

const CompletedSitesPage = () => {
  const { sites } = useAMC();
  const navigate = useNavigate();

  const completedSites = sites.filter(site => site.completed);

  return (
    <div className="completed-sites-container">
      <h2>Completed AMC Sites</h2>

      {completedSites.length === 0 && <p>No sites completed yet.</p>}

      <div className="completed-sites-grid">
        {completedSites.map(site => (
          <div
            key={site.id}
            className="completed-site-card"
            onClick={() => navigate(`/amc-sites/${site.id}`)}
          >
            <h3>{site.name}</h3>
            <p><strong>Address:</strong> {site.address}</p>
            <p><strong>Area:</strong> {site.area}</p>
            <p><strong>Location:</strong> {site.location}</p>
            <p><strong>Service Date:</strong> {site.serviceInfo?.date}</p>
            <p><strong>Service Time:</strong> {site.serviceInfo?.time}</p>
            <p><strong>Technician:</strong> {site.serviceInfo?.technician}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompletedSitesPage;
