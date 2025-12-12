// src/components/AddGroup/AddGroup.js
import React, { useState, useEffect } from "react";
import "./AddGroup.css";

const AddGroup = () => {
  const [numbers, setNumbers] = useState("");
  const [savedGroup, setSavedGroup] = useState({ members: [] });

  // Load existing group from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("globalGroup"))?.[0] || { members: [] };
    setSavedGroup(stored);
  }, []);

  const saveGroup = () => {
    if (!numbers.trim()) {
      alert("Please enter at least one mobile number");
      return;
    }

    const numberList = numbers
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num.length >= 10); // basic validation

    if (numberList.length === 0) {
      alert("Invalid numbers!");
      return;
    }

    const group = [{ id: 1, members: numberList }];
    localStorage.setItem("globalGroup", JSON.stringify(group));
    setSavedGroup(group[0]);

    alert("Group saved successfully!");
  };

  return (
    <div className="add-group-page">
      <h2>Add WhatsApp Group</h2>

      <label>Enter WhatsApp Numbers (comma separated)</label>
      <textarea
        placeholder="Ex: 9876543210, 9876501234"
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
      ></textarea>

      <button className="save-btn" onClick={saveGroup}>
        Save Group
      </button>

      {savedGroup.members.length > 0 && (
        <div className="saved-group-box">
          <h3>Saved Group Members</h3>
          {savedGroup.members.map((num, index) => (
            <div key={index} className="saved-number">
              {num}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddGroup;
