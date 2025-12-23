import React from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import "./CompletedSitesCard.css";

const CompletedSitesPage = () => {
  const { sites = [], technicianName } = useAMC();
  const navigate = useNavigate();

  /* -------------------------------------------------
     Sort Completed AMC Sites (Latest First)
  --------------------------------------------------*/
  const completedAMCSites = sites
    .filter((site) => site.completed)
    .sort(
      (a, b) =>
        new Date(
          `${b.serviceInfo?.date} ${b.serviceInfo?.time}`
        ) -
        new Date(`${a.serviceInfo?.date} ${a.serviceInfo?.time}`)
    );

  /* -------------------------------------------------
     Sort Completed Warranty Sites (Latest First)
  --------------------------------------------------*/
  const completedWarrantySites = sites
    .filter((site) => site.warrantyCompleted)
    .sort(
      (a, b) =>
        new Date(
          `${b.warrantyInfo?.date} ${b.warrantyInfo?.time}`
        ) -
        new Date(`${a.warrantyInfo?.date} ${a.warrantyInfo?.time}`)
    );

  return (
    <div className="completed-sites-container">

      {/* Page Title */}
      <h2 className="page-headline">Completed Sites</h2>

      {/* ================= AMC Completed Section ================= */}
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
                <strong>Service Date:</strong>{" "}
                {site.serviceInfo?.date || "Not recorded"}
              </p>
              <p>
                <strong>Service Time:</strong>{" "}
                {site.serviceInfo?.time || "-"}
              </p>
              <p>
                <strong>Technician:</strong>{" "}
                {site.serviceInfo?.technician || technicianName}
              </p>

            </div>
          ))}
        </div>
      )}

      {/* ================= Warranty Completed Section ================= */}
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
              {/* <p>
                <strong>Warranty Plan:</strong> {site.warrantyPlan}
              </p> */}
              <p>
                <strong>Date:</strong>{" "}
                {site.warrantyInfo?.date || "-"}
              </p>
              <p>
                <strong>Time:</strong>{" "}
                {site.warrantyInfo?.time || "-"}
              </p>
              <p>
                <strong>Technician:</strong>{" "}
                {site.warrantyInfo?.technician || technicianName}
              </p>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default CompletedSitesPage;
