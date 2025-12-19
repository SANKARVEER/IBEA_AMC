// src/components/Navbar/Navbar.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAMC } from "../AMCContext/AMCContext";
import "./Navbar.css";

function Navbar() {
  const { technicianName, logout } = useAMC();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("✔ Logged out successfully!", {
      autoClose: 1500,
    });

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <header className="navbar">

      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        Ibea Elevators
      </div>

      {/* Desktop menu */}
      <nav className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/amc-sites">AMC</Link>
        <Link to="/warranty-sites">Warranty</Link>
        <Link to="/completed-sites">Completed</Link>
        <Link to="/calendar">Calendar</Link>
      </nav>

      <div className="nav-right">

        {/* Before login show login button */}
        {!technicianName && (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}

        {/* After login show name + add group + logout */}
        {technicianName && (
          <>
            <span
              className="tech-name"
              onClick={() => navigate("/login")}
            >
              👨‍🔧 {technicianName}
            </span>

            <button
              className="add-group-btn"
              onClick={() => navigate("/add-group")}
            >
              Add Group
            </button>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Icon */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link onClick={() => setMenuOpen(false)} to="/">Home</Link>
        <Link onClick={() => setMenuOpen(false)} to="/amc-sites">AMC</Link>
        <Link onClick={() => setMenuOpen(false)} to="/warranty-sites">Warranty</Link>
        <Link onClick={() => setMenuOpen(false)} to="/completed-sites">Completed</Link>
        <Link onClick={() => setMenuOpen(false)} to="/calendar">Calendar</Link>

        {!technicianName && (
          <button
            className="mobile-login-btn"
            onClick={() => {
              setMenuOpen(false);
              navigate("/login");
            }}
          >
            Login
          </button>
        )}

        {technicianName && (
          <>
            <span className="mobile-tech">👨‍🔧 {technicianName}</span>

            <button
              className="mobile-add-group"
              onClick={() => {
                setMenuOpen(false);
                navigate("/add-group");
              }}
            >
              Add Group
            </button>

            <button
              className="mobile-logout"
              onClick={handleLogout}
            >
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
