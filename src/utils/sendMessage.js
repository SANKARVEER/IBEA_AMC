const sendMessageToMembers = (site, technicianName) => {
  const savedGroup = JSON.parse(localStorage.getItem("globalGroup")) || [];

  if (!savedGroup.length || !savedGroup[0].members?.length) {
    alert("No team members found in WhatsApp group");
    return;
  }

  const members = savedGroup[0].members;

  const message = `✅ AMC SITE COMPLETED

🏢 Site: ${site.name}
📍 Address: ${site.address}
🌐 Location: ${site.location}
👨‍🔧 Technician: ${technicianName}
📅 Date: ${new Date().toLocaleDateString()}
⏰ Time: ${new Date().toLocaleTimeString()}

Please verify the site entry.`;

  members.forEach((number) => {
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
};

export default sendMessageToMembers;
