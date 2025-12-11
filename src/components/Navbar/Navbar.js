import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";

function Navbar() {
  const { technicianName, logout, calendar, setSites } = useAMC();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // Logout handler
  const handleLogout = () => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const timeString = date.toLocaleTimeString();

    // Optionally, record logout in calendar as "Technician Activity"
    const logoutEntry = {
      id: Date.now(),
      type: "Logout",
      date: dateString,
      time: timeString,
      technician: technicianName,
    };

    // Save logout entry in calendar
    setSites((prev) => [...prev]); // force state update
    logout(); // saves current sites & calendar in localStorage

    // Save logoutEntry in calendar
    const savedCalendar = JSON.parse(localStorage.getItem("calendarData")) || [];
    savedCalendar.push(logoutEntry);
    localStorage.setItem("calendarData", JSON.stringify(savedCalendar));

    // Redirect to login
    navigate("/login");
  };

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="navbar-logo">Ibea Elevators</div>

      {/* Desktop Menu */}
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/amc-sites">AMC</Link>
        <Link to="/warranty-sites">Warranty</Link>
        <Link to="/completed-sites">Completed</Link>
        <Link to="/calendar">Calendar</Link>
      </nav>

      {/* Technician + Logout */}
      {technicianName && (
        <div className="nav-right">
          <span
            className="tech-name clickable"
            onClick={() => navigate("/login")}
          >
            👨‍🔧 {technicianName}
          </span>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/amc-sites" onClick={() => setMenuOpen(false)}>AMC</Link>
        <Link to="/warranty-sites" onClick={() => setMenuOpen(false)}>Warranty</Link>
        <Link to="/completed-sites" onClick={() => setMenuOpen(false)}>Completed</Link>
        <Link to="/calendar" onClick={() => setMenuOpen(false)}>Calendar</Link>

        {technicianName && (
          <>
            <span
              className="mobile-tech clickable"
              onClick={() => { setMenuOpen(false); navigate("/login"); }}
            >
              👨‍🔧 {technicianName}
            </span>

            <button className="mobile-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
