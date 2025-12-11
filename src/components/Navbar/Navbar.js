import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const { technicianName, logout } = useAMC();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    const date = new Date();
    const dateString = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const timeString = date.toLocaleTimeString();

    // Save calendar logout entry
    const logoutEntry = {
      id: Date.now(),
      type: "Logout",
      date: dateString,
      time: timeString,
      technician: technicianName,
    };
    const savedCalendar = JSON.parse(localStorage.getItem("calendarData")) || [];
    savedCalendar.push(logoutEntry);
    localStorage.setItem("calendarData", JSON.stringify(savedCalendar));

    logout();

    toast.success("You have successfully logged out!", {
      position: "top-right",
      autoClose: 2000,
    });

    setTimeout(() => navigate("/login"), 2000);
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

      {/* Technician + Add Group + Logout */}
      {technicianName && (
        <div className="nav-right">
          <span
            className="tech-name clickable"
            onClick={() => navigate("/login")}
          >
            👨‍🔧 {technicianName}
          </span>

          {/* ⭐ NEW Add Group Button */}
          <button
            className="add-group-btn"
            onClick={() => navigate("/add-group")}
          >
            Add Group
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}

      {/* Hamburger */}
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

            {/* ⭐ Mobile Add Group Button */}
            <button
              className="mobile-add-group"
              onClick={() => { setMenuOpen(false); navigate("/add-group"); }}
            >
              Add Group
            </button>

            <button className="mobile-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      <ToastContainer />
    </header>
  );
}

export default Navbar;
