import React, { useState } from "react";
import { useAMC } from "../AMCContext/AMCContext";
import "./ServiceCompletionPage.css";

const ServiceCompletionPage = ({ site }) => {
  const { addToCalendar } = useAMC();

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [techName, setTechName] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    addToCalendar({
      id: site.id,
      date: selectedDate,
      time: selectedTime,
      technician: techName,
      seatType: site.amcPlan === "XL" ? "XL" : "MS"
    });

    setSaved(true);
  };

  return (
    <div className="service-completion-container">
      <h2 className="service-completion-title">Complete Service - Site {site.id}</h2>

      <div className="service-form">
        <label>Date</label>
        <input 
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <label>Time</label>
        <input 
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />

        <label>Technician Name</label>
        <input 
          type="text"
          value={techName}
          placeholder="Enter technician name"
          onChange={(e) => setTechName(e.target.value)}
        />

        <button className="save-button" onClick={handleSave}>
          Save to Calendar
        </button>

        {saved && <p className="success-message">Saved Successfully!</p>}
      </div>
    </div>
  );
};

export default ServiceCompletionPage;
