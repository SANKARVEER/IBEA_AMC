import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const AmcSiteDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const building = {
    name: `AMC Building ${id}`,
    address: `No. ${100 + Number(id)}, Main Street`,
    area: `Area ${id}`,
    location: `City ${id}`,
    owner: `Owner ${id}`,
    floors: 4 + Number(id),
    lifts: 2,
    description: "Full AMC site details like maintenance schedule, issues, contact details, and visit logs."
  };

  return (
    <div className="details-page">
      <h2>{building.name}</h2>
      <p><strong>Address:</strong> {building.address}</p>
      <p><strong>Area:</strong> {building.area}</p>
      <p><strong>Location:</strong> {building.location}</p>
      <p><strong>Owner:</strong> {building.owner}</p>
      <p><strong>No. of Floors:</strong> {building.floors}</p>
      <p><strong>No. of Lifts:</strong> {building.lifts}</p>
      <p>{building.description}</p>
      <button onClick={() => navigate("/amc-sites")}>← Back to AMC Sites</button>
    </div>
  );
};

export default AmcSiteDetails;
