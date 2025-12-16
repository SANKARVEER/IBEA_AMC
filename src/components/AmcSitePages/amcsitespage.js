import React from "react";
import "./amcsitespage.css";
import { useNavigate } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";
import sendMessage from "../../utils/sendMessage";

const AmcSitesPage = () => {
  const navigate = useNavigate();

  const {
    sites = [],
    markCompleted,
    technicianName,
  } = useAMC();

  const handleFinish = (site) => {
    if (site.completed) return;

    markCompleted(site.id);

    sendMessage({
      site,
      type: "AMC",
      technicianName,
    });
  };

  const activeSites = sites.filter((site) => !site.completed);

  return (
    <div className="amc-sites-page">
      {/* ================= Top Bar ================= */}
      <div className="top-bar">
        <h2 className="page-headline">AMC Sites</h2>

        <button
          className="create-btn"
          onClick={() => navigate("/create-amc-page")}
        >
          + Create a New Page
        </button>
      </div>

      {/* ================= Cards ================= */}
      <div className="cards-container">
        {activeSites.length === 0 ? (
          <p className="empty-text">No AMC sites available</p>
        ) : (
          activeSites.map((site) => (
            <div className="amc-card" key={site.id}>
              <div className="card-header">
                <h3>{site.name}</h3>
              </div>

              <p>
                <strong>Address:</strong> {site.address}
              </p>

              <p>
                <strong>Area:</strong> {site.area}
              </p>

              <p>
                <strong>Location:</strong> {site.location}
              </p>

              <button
                className="view-btn"
                onClick={() => handleFinish(site)}
                disabled={site.completed}
              >
                Finished →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AmcSitesPage;
