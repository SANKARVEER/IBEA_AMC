// src/Module/Container/Navbar.js

import React from "react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">Ibea Elevators</div>
      <nav className="navbar-links">
        <a href="#amc">AMC</a>
        <a href="#plans">Plans</a>
        <a href="#benefits">Benefits</a>
        <a href="#visits">Visits</a>
        {/* <a href="#gallery">Gallery</a> */}
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Navbar ;
