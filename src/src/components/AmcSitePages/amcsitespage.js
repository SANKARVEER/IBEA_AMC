import React from "react";
import "./amcsitespage.css";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";

const AmcSitesPage = () => {
  const navigate = useNavigate();
  const { sites, markCompleted } = useAMC();

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

              <p><strong>Address:</strong> {card.address}</p>
              <p><strong>Area:</strong> {card.area}</p>
              <p><strong>Location:</strong> {card.location}</p>

              <button
                className={`view-btn ${card.completed ? "star-btn" : ""}`}
                onClick={() => {
                  markCompleted(card.id);
                }}
              >
                {card.completed ? "⭐ Completed" : "Finished →"}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AmcSitesPage;
