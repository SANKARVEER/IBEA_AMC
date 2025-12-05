import React from "react";
import "./amcsitespage.css";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";

const AmcSitesPage = () => {
  const navigate = useNavigate();
  const { sites, markCompleted } = useAMC();

  return (
    <div className="cards-container">
      {sites
        .filter((s) => !s.completed)
        .map((card) => (
          <div className="amc-card" key={card.id}>
            <h3>{card.name}</h3>
            <p><strong>Address:</strong> {card.address}</p>
            <p><strong>Area:</strong> {card.area}</p>
            <p><strong>Location:</strong> {card.location}</p>

            <button
              className="view-btn"
              onClick={() => {
                markCompleted(card.id);
                navigate("/completed");
              }}
            >
              Finished →
            </button>
          </div>
        ))}
    </div>
  );
};

export default AmcSitesPage;
