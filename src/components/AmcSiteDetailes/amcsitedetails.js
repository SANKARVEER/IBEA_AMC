import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";
import "./SiteDetails.css";

const AmcSiteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { sites } = useAMC();

  const site = sites.find(s => s.id === Number(id));

  if (!site) return <p>Site not found.</p>;

  return (
    <div className="details-page">
      <h2>{site.name}</h2>

      <p><strong>Address:</strong> {site.address}</p>
      <p><strong>Area:</strong> {site.area}</p>
      <p><strong>Location:</strong> {site.location}</p>

      <hr />

      <h3>Latest Service Information</h3>
      {site.serviceInfo ? (
        <>
          <p><strong>Date:</strong> {site.serviceInfo.date}</p>
          <p><strong>Time:</strong> {site.serviceInfo.time}</p>
          <p><strong>Technician:</strong> {site.serviceInfo.technician}</p>
        </>
      ) : (
        <p>No service completed yet.</p>
      )}

      <hr />

      <h3>Service Calendar / Visit History</h3>
      {site.history.length === 0 ? (
        <p>No previous visits recorded.</p>
      ) : (
        <ul className="history-list">
          {site.history.map((entry, index) => (
            <li key={index} className="history-item">
              <strong>{entry.date}</strong> – {entry.time}  
              <br />
              Technician: {entry.technician}
              <br />
              Status: {entry.status}
            </li>
          ))}
        </ul>
      )}

      <button className="back-btn" onClick={() => navigate("/amc-sites")}>
        ← Back to AMC Sites
      </button>
    </div>
  );
};

export default AmcSiteDetails;
