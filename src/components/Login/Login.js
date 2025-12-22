// src/components/Login/Login.jsx
import React, { useState } from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAMC();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedPassword = password.trim();

    // Validate all fields
    if (!trimmedName || !trimmedPhone || !trimmedPassword) {
      toast.error("Please fill all fields");
      return;
    }

    // Validate phone number (exactly 10 digits)
    if (!/^\d{10}$/.test(trimmedPhone)) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }

    // Validate password length
    if (trimmedPassword.length < 4) {
      toast.error("Password must be at least 4 characters");
      return;
    }

    // Call login function from context
    login(trimmedName);

    // Show success toast
    toast.success(`Welcome, ${trimmedName}!`, { autoClose: 1500 });

    // Redirect to home after 1.5s
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Technician Login</h2>

        <form onSubmit={handleLogin} className="login-form">

          {/* Technician Name */}
          <label htmlFor="name">Technician Name</label>
          <input
            id="name"
            type="text"
            placeholder="Eg: Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="login-input"
          />

          {/* Phone Number */}
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            type="tel"
            placeholder="Eg: 9876543210"
            value={phone}
            onChange={(e) => {
              // Only numbers, max 10 digits
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) setPhone(value);
            }}
            className="login-input"
          />

          {/* Password */}
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />

          {/* Submit */}
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} />
    </div>
  );
};

export default Login;
