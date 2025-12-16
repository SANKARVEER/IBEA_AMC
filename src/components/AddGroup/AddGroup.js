import React, { useState } from "react";
import "./AddGroup.css";

const AddGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState("");
  const [saved, setSaved] = useState(false);

  const saveGroup = () => {
    const numbers = members
      .split(",")
      .map((n) => n.replace(/\s+/g, ""))
      .filter((n) => n.length >= 10);

    if (!groupName || numbers.length === 0) {
      alert("Enter group name and valid numbers");
      return;
    }

    localStorage.setItem(
      "globalGroup",
      JSON.stringify([{ name: groupName, members: numbers }])
    );

    setSaved(true);
  };

  return (
    <div className="add-group-page">
      <h2>Add WhatsApp Group</h2>

      <label>Group Name</label>
      <input
        type="text"
        placeholder="Eg: AMC Technicians"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />

      <label>WhatsApp Numbers</label>
      <textarea
        placeholder="919789530643, 919551112345"
        value={members}
        onChange={(e) => setMembers(e.target.value)}
      />

      <button className="save-btn" onClick={saveGroup}>
        Save Group
      </button>

      {saved && (
        <div className="saved-group-box">
          <h3>✅ Group Saved</h3>
          <p>
            <strong>{groupName}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default AddGroup;
