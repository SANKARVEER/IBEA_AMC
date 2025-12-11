import React, { useState } from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import "./CreateNewAmcPage.css";

const CreateNewAmcPage = () => {
  const { addNewSite } = useAMC();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    siteName: "",
    customerName: "",
    address: "",
    phone: "",
    startDate: "",
    expiryDate: "",
  });

  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveSite = (e) => {
    e.preventDefault();

    if (!form.siteName || !form.customerName) {
      alert("Please fill all required fields");
      return;
    }

    addNewSite(form); // <-- Save to Context
    alert("New AMC Site Created!");
    navigate("/amc-sites"); // Go back to list
  };

  return (
    <div className="create-amc-page">
      <h2>Create New AMC Site</h2>

      <form className="create-form" onSubmit={saveSite}>
        <label>Site Name</label>
        <input type="text" name="siteName" value={form.siteName} onChange={updateField} required />

        <label>Customer Name</label>
        <input type="text" name="customerName" value={form.customerName} onChange={updateField} required />

        <label>Address</label>
        <input type="text" name="address" value={form.address} onChange={updateField} />

        <label>Phone</label>
        <input type="text" name="phone" value={form.phone} onChange={updateField} />

        <label>Start Date</label>
        <input type="date" name="startDate" value={form.startDate} onChange={updateField} />

        <label>Expiry Date</label>
        <input type="date" name="expiryDate" value={form.expiryDate} onChange={updateField} />

        <button type="submit" className="save-btn">Save AMC Site</button>
      </form>
    </div>
  );
};

export default CreateNewAmcPage;
