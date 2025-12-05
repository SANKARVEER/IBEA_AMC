import React from "react";
import "./visitplaning.css";

import { useNavigate } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";

const VisitPlaning = () => {
  const navigate = useNavigate();
  const { sites } = useAMC();

  const total = sites.length;
  const completed = sites.filter(s => s.completed).length;
  const pending = total - completed;

  // Filtered lists for navigation
  const completedSites = sites.filter(s => s.completed);
  const pendingSites = sites.filter(s => !s.completed);

  return (
    <section id="visits" className="section section-alt">
      <h2>Visit Planning & Status</h2>
      <p className="center-info-text">
        Use this view to capture visit details and track jobs for each building.
      </p>

      <div className="visit-summary-column">

        <div
          className="summary-card"
          onClick={() => navigate("/amc-sites")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-title">Total AMC Sites</div>
          <div className="card-number">{total}</div>
        </div>

        <div
          className="summary-card"
          onClick={() => navigate("/amc-sites/completed")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-title">Completed Sites</div>
          <div className="card-number">{completed}</div>
        </div>

        <div
          className="summary-card"
          onClick={() => navigate("/amc-sites/pending")}
          style={{ cursor: "pointer" }}
        >
          <div className="card-title">Pending Sites</div>
          <div className="card-number">{pending}</div>
        </div>

      </div>
    </section>
  );
};

export default VisitPlaning;
