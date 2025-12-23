// src/components/CalendarPage/CalendarPage.jsx
import React, { useState } from "react";
import "./CalendarPage.css";
import { useAMC } from "../AMCContext/AMCContext";

const CalendarPage = () => {
  const { sites = [] } = useAMC();

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Collect all completed dates (AMC + Warranty)
  const completedDates = Array.from(new Set([
    ...sites.filter(s => s.completedDate).map(s => s.completedDate),
    ...sites.filter(s => s.warrantyCompletedDate).map(s => s.warrantyCompletedDate),
  ]));

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleDayClick = (day) => {
    if (!day) return;

    const formatted = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(formatted);
  };

  // Combine AMC + Warranty results
  const combinedResults = [
    ...sites.filter(s => s.completedDate === selectedDate).map(s => ({ ...s, type: "AMC" })),
    ...sites.filter(s => s.warrantyCompletedDate === selectedDate).map(s => ({ ...s, type: "Warranty" })),
  ];

  // Calendar day list
  const daysArray = [];
  for (let i = 0; i < firstDay; i++) daysArray.push("");
  for (let i = 1; i <= totalDays; i++) daysArray.push(i);

  return (
    <div className="calendar-container">
      
      {/* ----- Header ----- */}
      <div className="calendar-header">
        <button onClick={prevMonth}>◀</button>
        <h2>{monthNames[currentMonth]} {currentYear}</h2>
        <button onClick={nextMonth}>▶</button>
      </div>

      {/* ----- Calendar Grid ----- */}
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="day-name">{d}</div>
        ))}

        {daysArray.map((day, index) => {
          const dateString = day
            ? `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            : null;

          const isCompleted = completedDates.includes(dateString);

          return (
            <div
              key={index}
              className={`day-box
                ${day === today.getDate() &&
                currentMonth === today.getMonth() &&
                currentYear === today.getFullYear()
                  ? "today"
                  : ""}
                ${isCompleted ? "completed-day" : ""}
              `}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* ----- Results Below Calendar ----- */}
      {selectedDate && (
        <div className="results-box">
          <h3>Completed Sites on {selectedDate}</h3>

          {combinedResults.length === 0 ? (
            <p className="no-data">No sites completed on this date.</p>
          ) : (
            <div className="results-cards">
              {combinedResults.map((site) => (
                <div className="site-card" key={site.id}>
                  
                  <div className="card-header">
                    <h4>{site.name}</h4>
                    <span className={`tag ${site.type === "AMC" ? "amc" : "warranty"}`}>
                      {site.type}
                    </span>
                  </div>

                  <p><strong>Location:</strong> {site.location}</p>
                  <p><strong>Date:</strong> {site.completedDate || site.warrantyCompletedDate}</p>

                  <p>
                    <strong>Technician:</strong>{" "}
                    {site.type === "AMC"
                      ? site?.serviceInfo?.technician
                      : site?.warrantyInfo?.technician}
                  </p>

                  {/* {site.type === "Warranty" && (
                    <p><strong>Plan:</strong> {site.warrantyPlan}</p>
                  )} */}

                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
