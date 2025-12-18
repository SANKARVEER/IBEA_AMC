import React from "react";
import "./amcsitespage.css"; // Reuse CSS for consistent styling
import { useNavigate } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";

const AmcSitesPage = () => {
  const navigate = useNavigate();
  const { sites = [], markCompleted, technicianName } = useAMC();

  const handleFinish = (site) => {
    if (site.completed) return;

    // Mark as completed and store relevant info
    markCompleted(site.id, {
      technician: technicianName,
      whatsappGroup: site.serviceInfo?.whatsappGroup || { name: "Default Group", members: [] },
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    });
  };

  return (
    <div className="amc-sites-page">
      <div className="top-bar">
        <h2>AMC Sites</h2>
        <button
          className="create-btn"
          onClick={() => navigate("/create-amc-site")}
        >
          + Create a New AMC Site
        </button>
      </div>

      <div className="cards-container">
        {sites
          .filter((site) => !site.completed || site.completed) // Show all sites
          .map((site) => (
            <div className="amc-card" key={site.id}>
              <h3>{site.name}</h3>
              <p><strong>Address:</strong> {site.address}</p>
              <p><strong>Area:</strong> {site.area}</p>
              <p><strong>Location:</strong> {site.location}</p>

              {/* Pending site: Finish button */}
              {!site.completed && (
                <button
                  className="view-btn"
                  onClick={() => handleFinish(site)}
                >
                  Finish →
                </button>
              )}

              {/* Completed site: show all stored info */}
              {site.completed && (
                <>
                  <p><strong>Technician:</strong> {site.serviceInfo?.technician || technicianName}</p>
                  <p><strong>WhatsApp Group:</strong> {site.serviceInfo?.whatsappGroup?.name || "-"}</p>
                  <p>
                    <strong>Group Members:</strong>{" "}
                    {site.serviceInfo?.whatsappGroup?.members?.join(", ") || "-"}
                  </p>
                  <p><strong>Date:</strong> {site.serviceInfo?.date || "-"}</p>
                  <p><strong>Time:</strong> {site.serviceInfo?.time || "-"}</p>
                  <span className="completed-badge">✅ Completed</span>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AmcSitesPage;
