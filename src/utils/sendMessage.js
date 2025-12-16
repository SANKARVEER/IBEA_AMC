// src/utils/sendMessage.js

const sendMessage = ({ site, type = "AMC", technicianName }) => {
  if (!site) return;

  const message = `✅ ${type} Site Completed!
Site: ${site.name}
Location: ${site.location}
Technician: ${technicianName}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}`;

  // Global group (only ONE group)
  const groups = JSON.parse(localStorage.getItem("globalGroup")) || [];

  if (!groups.length || !groups[0].members?.length) {
    alert("❌ No global group found. Please add a group first.");
    return;
  }

  const members = groups[0].members;

  members.forEach((number) => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
};

export default sendMessage;
