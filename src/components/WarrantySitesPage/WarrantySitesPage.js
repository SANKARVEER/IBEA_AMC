import React from "react";
import "./WarrantySitesPage.css";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";

const WarrantySitesPage = () => {
  const navigate = useNavigate();
  const { sites, markWarrantyCompleted, technicianName } = useAMC();

  // Send WhatsApp message to all members of the single global group
  const sendMessage = (site, type = "Warranty") => {
    const plan = site?.warrantyPlan || "MS";
    const message = `✅ ${type} Site Completed!
Site: ${site.name}
Location: ${site.location}
Technician: ${technicianName || "Technician"}
Plan: ${plan}
Date: ${site.warrantyInfo?.date || new Date().toLocaleDateString()}
Time: ${site.warrantyInfo?.time || new Date().toLocaleTimeString()}`;

    const groups = JSON.parse(localStorage.getItem("globalGroup")) || [];

    if (!groups.length) {
      alert("No group found. Please add a global group first.");
      return;
    }

    const groupMembers = groups[0].members || [];

    if (!groupMembers.length) {
      alert("Global group has no members. Please add members.");
      return;
    }

    groupMembers.forEach((number) => {
      const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    });
  };

  // Handler: mark warranty completed then send message
  const handleWarrantyDone = (site) => {
    markWarrantyCompleted(site.id);
    setTimeout(() => sendMessage(site, "Warranty"), 50);
  };

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

              <p>
                <strong>Address:</strong> {site.address}
              </p>
              <p>
                <strong>Area:</strong> {site.area}
              </p>
              <p>
                <strong>Location:</strong> {site.location}
              </p>

              <div className="card-actions">
                <button
                  className={`view-btn ${site.warrantyCompleted ? "star-btn" : ""}`}
                  onClick={() => handleWarrantyDone(site)}
                >
                  {site.warrantyCompleted ? "⭐ Done" : "Warranty Done →"}
                </button>

                
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WarrantySitesPage;
