import React from "react";
import { useParams } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";
import "./WarrantyDetails.css";

const WarrantyDetailsPage = () => {
  const { id } = useParams();
  const { sites } = useAMC();

  const site = sites.find(s => s.id === Number(id));

  if (!site) return <h2>Site Not Found</h2>;

  return (
    <div className="details-container">
      <h2>Warranty Details - {site.name}</h2>

      <div className="details-card">
        <p><strong>Address:</strong> {site.address}</p>
        <p><strong>Area:</strong> {site.area}</p>
        <p><strong>Location:</strong> {site.location}</p>

        <h3>Warranty Info</h3>
        {/* <p><strong>Plan:</strong> {site.warrantyPlan}</p> */}
        <p><strong>Date:</strong> {site.warrantyInfo?.date || "-"}</p>
        <p><strong>Time:</strong> {site.warrantyInfo?.time || "-"}</p>
        <p><strong>Technician:</strong> {site.warrantyInfo?.technician || "-"}</p>

        <p><strong>Status:</strong> 
          {site.warrantyCompleted ? "Completed" : "Pending"}
        </p>
      </div>
    </div>
  );
};

export default WarrantyDetailsPage;
