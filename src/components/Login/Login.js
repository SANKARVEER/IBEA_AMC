import React, { useState } from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const { setTechnicianName } = useAMC();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      alert("Please enter technician name");
      return;
    }

    setTechnicianName(name);

    // Redirect to Home
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Technician Login</h2>

        <form onSubmit={handleLogin}>
          <label>Enter Technician Name</label>
          <input
            type="text"
            placeholder="Eg: Kumar, Sankar, Arun"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
