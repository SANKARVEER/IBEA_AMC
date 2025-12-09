import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAMC } from "../AMCContext/AMCContext";

function Navbar() {
  const { technicianName, logout } = useAMC();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="navbar-logo">Ibea Elevators</div>

      {/* Desktop Menu */}
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/amc-sites">AMC</Link>
        <Link to="/warranty-sites">Warranty</Link>
        <Link to="/calendar">Calendar</Link>
      </nav>

      {/* Technician + Logout (Desktop) */}
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

      {/* Hamburger Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/amc-sites" onClick={() => setMenuOpen(false)}>AMC</Link>
        <Link to="/warranty-sites" onClick={() => setMenuOpen(false)}>Warranty</Link>
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
