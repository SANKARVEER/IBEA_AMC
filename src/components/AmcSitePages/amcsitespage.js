import React from "react";
import "./amcsitespage.css";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";

const AmcSitesPage = () => {
  const navigate = useNavigate();
  const { sites, markCompleted, technicianName } = useAMC();

  // Send WhatsApp message to all members of the single global group
  const sendMessage = (site, type = "AMC") => {
    const seatPlan = site?.amcPlan || "MS";
    const message = `✅ ${type} Site Completed!
Site: ${site.name}
Location: ${site.location}
Technician: ${technicianName || "Technician"}
Plan: ${seatPlan}
Date: ${site.serviceInfo?.date || new Date().toLocaleDateString()}
Time: ${site.serviceInfo?.time || new Date().toLocaleTimeString()}`;

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

  // Handler: mark complete then send message
  const handleFinish = (card) => {
    markCompleted(card.id);
    // After marking completed, the site in state will have serviceInfo saved.
    // Use a short timeout to ensure state updates (state update is synchronous here but local)
    // If you prefer immediate, you may send message using the card info too.
    setTimeout(() => sendMessage(card, "AMC"), 50);
  };

  return (
    <div className="amc-sites-page">
      {/* Top Bar */}
      <div className="top-bar">
        <h2 className="page-headline">AMC Sites</h2>

        <button
          className="create-btn"
          onClick={() => navigate("/create-amc-page")}
        >
          + Create a New Page
        </button>
      </div>

      <div className="cards-container">
        {sites
          .filter((s) => !s.completed)
          .map((card) => (
            <div className="amc-card" key={card.id}>
              <div className="card-header">
                <h3>{card.name}</h3>
              </div>

              <p>
                <strong>Address:</strong> {card.address}
              </p>
              <p>
                <strong>Area:</strong> {card.area}
              </p>
              <p>
                <strong>Location:</strong> {card.location}
              </p>

              <div className="card-actions">
                <button
                  className={`view-btn ${card.completed ? "star-btn" : ""}`}
                  onClick={() => handleFinish(card)}
                >
                  {card.completed ? "⭐ Completed" : "Finished →"}
                </button>
               
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AmcSitesPage;
