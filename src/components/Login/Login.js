// src/components/Login/Login.jsx
import React, { useState } from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { setTechnicianName } = useAMC();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (name.trim() === "" || phone.trim() === "" || password.trim() === "") {
      alert("Please fill all fields: Name, Phone, and Password");
      return;
    }

    // Save technician name to context
    setTechnicianName(name);

    // Redirect to Home
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Technician Login</h2>

        <form onSubmit={handleLogin}>
          <label>Technician Name</label>
          <input
            type="text"
            placeholder="Eg: Kumar, Sankar, Arun"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
          />

          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Eg: 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="login-input"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
