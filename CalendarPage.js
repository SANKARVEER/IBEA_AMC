import React, { useState } from "react";
import { useAMC } from "../AMCContext/AMCContext";
import "./CalendarPage.css";

const CalendarPage = () => {
  const { calendar } = useAMC();
  const [filter, setFilter] = useState("ALL");

  // FILTERING LOGIC
  const filteredCalendar = calendar.filter(entry => {
    if (filter === "ALL") return true;
    return entry.seatType === filter;
  });

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Service Calendar</h2>

      {/* FILTER BUTTONS */}
      <div className="filter-buttons">
        <button
          className={filter === "ALL" ? "active" : ""}
          onClick={() => setFilter("ALL")}
        >
          All
        </button>
        <button
          className={filter === "MS" ? "active" : ""}
          onClick={() => setFilter("MS")}
        >
          MS
        </button>
        <button
          className={filter === "XL" ? "active" : ""}
          onClick={() => setFilter("XL")}
        >
          XL
        </button>
      </div>

      {/* NO DATA */}
      {filteredCalendar.length === 0 && (
        <p className="no-data">No services found for this filter.</p>
      )}

      {/* ENTRIES GRID */}
      <div className="calendar-grid">
        {filteredCalendar.map((entry, index) => (
          <div key={index} className="calendar-entry">
            <h3>Site ID: {entry.id}</h3>
            <p><strong>Date:</strong> {entry.date}</p>
            <p><strong>Time:</strong> {entry.time}</p>
            <p><strong>Technician:</strong> {entry.technician}</p>
            <p><strong>Seat Type:</strong> {entry.seatType}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPage;
