// src/components/AMCContext/AMCContext.js
import React, { createContext, useContext, useState } from "react";

// --------------------------------------------------
// Group Members for WhatsApp Notifications
// --------------------------------------------------
export const groupMembers = [
  "+919789530643", // Replace with real numbers including country code
  "+919551523456",
];

const AMCContext = createContext();

export const AMCProvider = ({ children }) => {
  // --------------------------------------------------
  // LOGGED-IN TECHNICIAN NAME
  // --------------------------------------------------
  const [technicianName, setTechnicianName] = useState("Technician");

  // --------------------------------------------------
  // AUTO-GENERATE 200 SITES (100 WARRANTY + 100 AMC)
  // --------------------------------------------------
  const generateSites = () => {
    const areas = ["North", "South", "East", "West"];
    const locations = [
      "Chennai", "T Nagar", "Velachery", "Tambaram", "Adyar",
      "Anna Nagar", "Porur", "Avadi", "Guindy", "Medavakkam",
    ];

    const list = [];

    for (let i = 1; i <= 200; i++) {
      const isWarranty = i <= 100;

      list.push({
        id: i,
        name: `Site ${i}`,
        address: `Address ${i}, Building ${i}`,
        area: areas[i % areas.length],
        location: locations[i % locations.length],

        // AMC INFO
        amcPlan: i % 2 === 0 ? "MS" : "XL",
        completed: false,
        completedDate: null,
        serviceInfo: null,

        // WARRANTY INFO
        warranty: isWarranty,
        warrantyPlan: isWarranty ? (i % 2 === 0 ? "MS" : "XL") : null,
        warrantyCompleted: false,
        warrantyCompletedDate: null,
        warrantyInfo: null,
      });
    }

    return list;
  };

  // --------------------------------------------------
  // INITIALIZE STATE (LOAD FROM LOCAL STORAGE IF AVAILABLE)
  // --------------------------------------------------
  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem("sitesData");
    return saved ? JSON.parse(saved) : generateSites();
  });

  const [calendar, setCalendar] = useState(() => {
    const saved = localStorage.getItem("calendarData");
    return saved ? JSON.parse(saved) : [];
  });

  // --------------------------------------------------
  // HELPER: GET TODAY'S DATE (YYYY-MM-DD)
  // --------------------------------------------------
  const getToday = () => {
    const t = new Date();
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(
      t.getDate()
    ).padStart(2, "0")}`;
  };

  // --------------------------------------------------
  // SEND WHATSAPP MESSAGE
  // --------------------------------------------------
  const sendWhatsAppMessage = (site, type = "AMC") => {
    const message = `✅ ${type} Site Completed!\nSite: ${site.name}\nLocation: ${site.location}\nTechnician: ${technicianName}\nDate: ${new Date().toLocaleDateString()}\nTime: ${new Date().toLocaleTimeString()}`;

    groupMembers.forEach((number) => {
      const url = `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank");
    });
  };

  // --------------------------------------------------
  // ADD TO CALENDAR
  // --------------------------------------------------
  const addToCalendar = (entry) => {
    setCalendar((prev) => [...prev, entry]);
  };

  // --------------------------------------------------
  // MARK AMC COMPLETED
  // --------------------------------------------------
  const markCompleted = (id) => {
    const date = getToday();
    const time = new Date().toLocaleTimeString();

    const site = sites.find((s) => s.id === id);
    const seatType = site?.amcPlan?.toUpperCase() === "XL" ? "XL" : "MS";

    setSites((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              completed: true,
              completedDate: date,
              serviceInfo: { date, time, technician: technicianName, seatType },
            }
          : s
      )
    );

    addToCalendar({
      id,
      type: "AMC",
      date,
      time,
      technician: technicianName,
      seatType,
    });

    sendWhatsAppMessage(site, "AMC");
  };

  // --------------------------------------------------
  // MARK WARRANTY COMPLETED
  // --------------------------------------------------
  const markWarrantyCompleted = (id) => {
    const date = getToday();
    const time = new Date().toLocaleTimeString();
    const site = sites.find((s) => s.id === id);

    setSites((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              warrantyCompleted: true,
              warrantyCompletedDate: date,
              warrantyInfo: { date, time, technician: technicianName, plan: site?.warrantyPlan },
            }
          : s
      )
    );

    addToCalendar({
      id,
      type: "Warranty",
      date,
      time,
      technician: technicianName,
      plan: site?.warrantyPlan,
    });

    sendWhatsAppMessage(site, "Warranty");
  };

  // --------------------------------------------------
  // ADD NEW AMC SITE
  // --------------------------------------------------
  const addNewSite = (newSite) => {
    setSites((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newSite.siteName,
        address: newSite.address,
        area: newSite.area || "Unknown",
        location: newSite.location || "Unknown",
        amcPlan: newSite.plan || "MS",
        completed: false,
        completedDate: null,
        serviceInfo: null,

        warranty: false,
        warrantyPlan: null,
        warrantyCompleted: false,
        warrantyCompletedDate: null,
        warrantyInfo: null,
      },
    ]);
  };

  // --------------------------------------------------
  // ADD NEW WARRANTY SITE
  // --------------------------------------------------
  const addNewWarrantySite = (newSite) => {
    setSites((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newSite.siteName,
        address: newSite.address,
        area: newSite.area || "Unknown",
        location: newSite.location || "Unknown",

        warranty: true,
        warrantyPlan: newSite.plan || "MS",
        warrantyCompleted: false,
        warrantyCompletedDate: null,
        warrantyInfo: null,

        amcPlan: null,
        completed: false,
        completedDate: null,
        serviceInfo: null,

        customerName: newSite.customerName,
        phone: newSite.phone,
        startDate: newSite.startDate,
        expiryDate: newSite.expiryDate,
      },
    ]);
  };

  // --------------------------------------------------
  // LOGOUT FUNCTION
  // --------------------------------------------------
  const logout = () => {
    localStorage.setItem("sitesData", JSON.stringify(sites));
    localStorage.setItem("calendarData", JSON.stringify(calendar));
    setTechnicianName("");
  };

  // --------------------------------------------------
  // CONTEXT EXPORT
  // --------------------------------------------------
  return (
    <AMCContext.Provider
      value={{
        sites,
        setSites,
        technicianName,
        setTechnicianName,
        calendar,
        markCompleted,
        markWarrantyCompleted,
        addNewSite,
        addNewWarrantySite,
        logout,
      }}
    >
      {children}
    </AMCContext.Provider>
  );
};

export const useAMC = () => useContext(AMCContext);
