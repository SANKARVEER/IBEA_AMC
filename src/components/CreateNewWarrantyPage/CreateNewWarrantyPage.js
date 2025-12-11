import React, { useState } from "react";
import { useAMC } from "../AMCContext/AMCContext";
import { useNavigate } from "react-router-dom";
import "./CreateNewWarrantyPage.css";

const CreateNewWarrantyPage = () => {
  const { addNewWarrantySite } = useAMC();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    siteName: "",
    customerName: "",
    address: "",
    phone: "",
    area: "",
    location: "",
    plan: "MS",
    startDate: "",
    expiryDate: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveWarranty = (e) => {
    e.preventDefault();

    if (!form.siteName || !form.customerName) {
      alert("Site Name & Customer Name are required!");
      return;
    }

    addNewWarrantySite(form);

    alert("Warranty Site Created Successfully!");
    navigate("/warranty-sites");
  };

  return (
    <div className="create-warranty-container">
      <h2>Create New Warranty Site</h2>

      <form className="warranty-form" onSubmit={saveWarranty}>
        
        <label>Site Name *</label>
        <input type="text" name="siteName" value={form.siteName} onChange={handleChange} required />

        <label>Customer Name *</label>
        <input type="text" name="customerName" value={form.customerName} onChange={handleChange} required />

        <label>Address</label>
        <input type="text" name="address" value={form.address} onChange={handleChange} />

        <label>Phone</label>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} />

        <label>Area</label>
        <input type="text" name="area" value={form.area} onChange={handleChange} />

        <label>Location</label>
        <input type="text" name="location" value={form.location} onChange={handleChange} />

        <label>Warranty Plan</label>
        <select name="plan" value={form.plan} onChange={handleChange}>
          <option value="MS">MS</option>
          <option value="XL">XL</option>
        </select>

        <label>Start Date</label>
        <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />

        <label>Expiry Date</label>
        <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} />

        <button className="save-warranty-btn" type="submit">
          Save Warranty Site
        </button>
      </form>
    </div>
  );
};

export default CreateNewWarrantyPage;
