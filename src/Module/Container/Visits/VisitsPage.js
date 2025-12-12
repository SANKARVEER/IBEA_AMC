import React from "react";
import { useAMC } from "../../AMCContext/AMCContext";

const VisitsPage = () => {
  const { sites } = useAMC();

  const completedSites = sites.filter(site => site.completed);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Completed Visits</h2>

      {completedSites.length === 0 && <p>No visits completed yet.</p>}

      {completedSites.map((site) => (
        <div
          key={site.id}
          style={{
            padding: "15px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "10px"
          }}
        >
          <h3>{site.name}</h3>
          <p><strong>Date:</strong> {site.serviceInfo.date}</p>
          <p><strong>Time:</strong> {site.serviceInfo.time}</p>
          <p><strong>Technician:</strong> {site.serviceInfo.technician}</p>
        </div>
      ))}
    </div>
  );
};

export default VisitsPage;