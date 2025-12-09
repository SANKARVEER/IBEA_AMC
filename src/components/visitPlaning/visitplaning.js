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
  const warranty = sites.filter(s => s.warranty).length;
  const completedWarranty = sites.filter(s => s.warrantyCompleted).length;

  return (
    <section id="visits" className="section section-alt">
      <h2 className="visit-title">Visit Planning & Status</h2>

      <p className="center-info-text">
        Use this view to capture visit details and track jobs for each building.
      </p>

      <div className="visit-summary-column">

        <div className="summary-card" onClick={() => navigate("/amc-sites")}>
          <div className="card-title">Total AMC Sites</div>
          <div className="card-number">{total}</div>
        </div>

        <div className="summary-card" onClick={() => navigate("/completed")}>
          <div className="card-title">Completed Sites</div>
          <div className="card-number">{completed + completedWarranty}</div>
        </div>

        <div className="summary-card" onClick={() => navigate("/amc-sites/pending")}>
          <div className="card-title">Pending AMC Sites</div>
          <div className="card-number">{pending}</div>
        </div>

        <div className="summary-card warranty-card" onClick={() => navigate("/warranty-sites")}>
          <div className="card-title">Warranty Sites</div>
          <div className="card-number">{warranty}</div>
        </div>

      </div>
    </section>
  );
};

export default VisitPlaning;
