import React, { useState } from "react";
import "./ServiceCompletionPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";

const ServiceCompletionPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { sites } = useAMC();

  // Find site data
  const site = sites.find((s) => s.id === Number(id));

  const [nextVisit, setNextVisit] = useState("");

  const handleSave = () => {
    if (!nextVisit) {
      alert("Please select next visit date!");
      return;
    }

    alert("Next visit date saved!");
    navigate("/amc-sites");
  };

  if (!site) {
    return <h2 style={{ textAlign: "center" }}>Site Not Found</h2>;
  }

  return (
    <div className="service-complete-container">

      {/* Completed Service Card */}
      <div className="service-card">
        <h2 className="service-title">Service Completed</h2>

        <div className="service-info">
          <p><strong>Building Name:</strong> {site.name}</p>
          <p><strong>Location:</strong> {site.location}</p>
          <p><strong>Service Completed On:</strong> 07 Dec 2025</p>
          <p><strong>Engineer:</strong> SANKAR VEERA</p>
        </div>

        <div className="status-badge">Completed</div>
      </div>

      {/* Next Visit Planning */}
      <div className="next-visit-card">
        <h3>Next Visit Planning</h3>

        <label className="next-label">Select Next Visit Date</label>
        <input
          type="date"
          className="next-date-input"
          value={nextVisit}
          onChange={(e) => setNextVisit(e.target.value)}
        />

        <button className="save-btn" onClick={handleSave}>
          Save & Continue
        </button>
      </div>

    </div>
  );
};

export default ServiceCompletionPage;
