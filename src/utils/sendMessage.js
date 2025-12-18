// src/utils/sendMessage.js
const sendMessage = ({ site, type, technicianName }) => {
  const savedGroup =
    JSON.parse(localStorage.getItem("globalGroup")) || [];

  if (!savedGroup.length) return;

  const group = savedGroup[0];

  const message = `✅ ${type} Site Completed
🏢 Site: ${site.name}
📍 Location: ${site.location}
👨‍🔧 Technician: ${technicianName}
🕒 Time: ${new Date().toLocaleTimeString()}`;

  group.members.forEach((number) => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  });
};

export default sendMessage;
