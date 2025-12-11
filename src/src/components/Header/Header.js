import React from 'react';

function Header() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Annual Maintenance Contracts for Lifts</h1>
          <p>
            Keep your elevators safe, reliable, and compliant with our expert AMC services.
          </p>
          <a href="#contact" className="primary-btn">
            Get AMC Quote
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-value">250+</div>
            <div className="stat-label">Active AMC Sites</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">15</div>
            <div className="stat-label">Field Technicians</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">&lt; 4 hrs</div>
            <div className="stat-label">Average Response Time</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
