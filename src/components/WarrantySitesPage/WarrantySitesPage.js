import React from "react";
import "./WarrantySitesPage.css"; // Reuse AMC page CSS for consistent style
import { useNavigate } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";

const WarrantySitesPage = () => {
  const navigate = useNavigate();
  const { sites = [], markWarrantyCompleted, technicianName } = useAMC();

  const handleWarrantyDone = (site) => {
    if (site.warrantyCompleted) return;

    // Mark the site as completed and store all necessary info
    markWarrantyCompleted(site.id, {
      technician: technicianName,
      whatsappGroup: site.warrantyInfo?.whatsappGroup || { name: "Default Group", members: [] },
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    });
  };

  return (
    <div className="amc-sites-page">
      <div className="top-bar">
        <h2>Warranty Sites</h2>

        <button
          className="create-btn"
          onClick={() => navigate("/create-warranty-site")}
        >
          + Create a New Warranty Site
        </button>
      </div>

      <div className="cards-container">
        {sites
          .filter((site) => site.warranty)
          .map((site) => (
            <div className="amc-card" key={site.id}>
              <h3>{site.name}</h3>
              <p><strong>Address:</strong> {site.address}</p>
              <p><strong>Area:</strong> {site.area}</p>
              <p><strong>Location:</strong> {site.location}</p>

              {/* Pending site: Finish button */}
              {!site.warrantyCompleted && (
                <button
                  className="view-btn"
                  onClick={() => handleWarrantyDone(site)}
                >
                  Finish →
                </button>
              )}

              {/* Completed site: show all stored info */}
              {site.warrantyCompleted && (
                <>
                  <p><strong>Technician:</strong> {site.warrantyInfo?.technician || technicianName}</p>
                  {/* <p><strong>WhatsApp Group:</strong> {site.warrantyInfo?.whatsappGroup?.name || "-"}</p>
                  <p>
                    <strong>Group Members:</strong>{" "}
                    {site.warrantyInfo?.whatsappGroup?.members?.join(", ") || "-"}
                  </p> */}
                  <p><strong>Date:</strong> {site.warrantyInfo?.date || "-"}</p>
                  <p><strong>Time:</strong> {site.warrantyInfo?.time || "-"}</p>
                  <span className="completed-badge">✅ Completed</span>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default WarrantySitesPage;
