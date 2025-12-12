import React from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import "./CompletedSitesCard.css";

const CompletedSitesPage = () => {
  const { sites = [], technicianName } = useAMC(); // Default empty array
  const navigate = useNavigate();

  // Filter only completed AMC sites
  const completedAMCSites = sites.filter((site) => site.completed);

  // Filter only completed Warranty sites
  const completedWarrantySites = sites.filter((site) => site.warrantyCompleted);

  // Send WhatsApp message to all members of the single global group
  const sendMessage = (site, type = "AMC") => {
    const plan = type === "AMC" ? site?.amcPlan || "MS" : site?.warrantyPlan || "MS";
    const info = type === "AMC" ? site.serviceInfo : site.warrantyInfo;

    const message = `✅ ${type} Site Completed!
Site: ${site.name}
Location: ${site.location}
Technician: ${info?.technician || technicianName || "Technician"}
Plan: ${plan}
Date: ${info?.date || "-"}
Time: ${info?.time || "-"}`;

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

  return (
    <div className="completed-sites-container">
      {/* Page Headline */}
      <h2 className="page-headline">Completed Sites</h2>

      {/* View Calendar Button */}
      <div className="calendar-button-wrapper">
        <button className="calendar-btn" onClick={() => navigate("/calendar")}>
          View Calendar 📅
        </button>
      </div>

      {/* AMC Completed Sites */}
      <h3 className="section-title">AMC Completed Sites</h3>
      {completedAMCSites.length === 0 ? (
        <p className="no-data">No AMC sites completed yet.</p>
      ) : (
        <div className="completed-sites-grid">
          {completedAMCSites.map((site) => (
            <div key={site.id} className="completed-site-card">
              <h3>{site.name}</h3>
              <p>
                <strong>Address:</strong> {site.address}
              </p>
              <p>
                <strong>Area:</strong> {site.area}
              </p>
              <p>
                <strong>Location:</strong> {site.location}
              </p>
              <p>
                <strong>Service Date:</strong> {site.serviceInfo?.date || "Not recorded"}
              </p>
              <p>
                <strong>Service Time:</strong> {site.serviceInfo?.time || "-"}
              </p>
              <p>
                <strong>Technician:</strong> {site.serviceInfo?.technician || "-"}
              </p>

              
            </div>
          ))}
        </div>
      )}

      {/* Warranty Completed Sites */}
      <h3 className="section-title">Warranty Completed Sites</h3>
      {completedWarrantySites.length === 0 ? (
        <p className="no-data">No Warranty sites completed yet.</p>
      ) : (
        <div className="completed-sites-grid">
          {completedWarrantySites.map((site) => (
            <div key={site.id} className="completed-site-card">
              <h3>{site.name}</h3>
              <p>
                <strong>Address:</strong> {site.address}
              </p>
              <p>
                <strong>Area:</strong> {site.area}
              </p>
              <p>
                <strong>Location:</strong> {site.location}
              </p>
              <p>
                <strong>Warranty Plan:</strong> {site.warrantyPlan}
              </p>
              <p>
                <strong>Date:</strong> {site.warrantyInfo?.date || "-"}
              </p>
              <p>
                <strong>Time:</strong> {site.warrantyInfo?.time || "-"}
              </p>
              <p>
                <strong>Technician:</strong> {site.warrantyInfo?.technician || "-"}
              </p>

             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedSitesPage;
