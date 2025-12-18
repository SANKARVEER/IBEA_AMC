// AMCContext.jsx
import React, { createContext, useContext, useState } from "react";

const AMCContext = createContext();

export const AMCProvider = ({ children }) => {
  const [technicianName, setTechnicianName] = useState("Technician");

  // Get today's date in YYYY-MM-DD format
  const getToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  // Sites state (load from localStorage or empty array)
  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem("sitesData");
    return saved ? JSON.parse(saved) : [];
  });

  /* ===================== AMC COMPLETE ===================== */
  const markCompleted = (id) => {
    const date = getToday();
    const time = new Date().toLocaleTimeString();

    const savedGroup = JSON.parse(localStorage.getItem("globalGroup")) || [];
    const whatsappGroup = savedGroup.length > 0 ? savedGroup[0] : null;

    setSites((prev) =>
      prev.map((site) =>
        site.id === id
          ? {
              ...site,
              completed: true,
              completedDate: date,
              serviceInfo: {
                date,
                time,
                technician: technicianName,
                seatType: site.amcPlan,
                whatsappGroup, // store group info
              },
            }
          : site
      )
    );
  };

  /* ===================== WARRANTY COMPLETE ===================== */
  const markWarrantyCompleted = (id) => {
    const date = getToday();
    const time = new Date().toLocaleTimeString();

    const savedGroup = JSON.parse(localStorage.getItem("globalGroup")) || [];
    const whatsappGroup = savedGroup.length > 0 ? savedGroup[0] : null;

    setSites((prev) =>
      prev.map((site) =>
        site.id === id
          ? {
              ...site,
              warrantyCompleted: true,
              warrantyCompletedDate: date,
              warrantyInfo: {
                date,
                time,
                technician: technicianName,
                seatType: site.warrantyPlan,
                whatsappGroup, // store group info
              },
            }
          : site
      )
    );
  };

  return (
    <AMCContext.Provider
      value={{
        sites,
        markCompleted,
        markWarrantyCompleted,
        technicianName,
      }}
    >
      {children}
    </AMCContext.Provider>
  );
};

export const useAMC = () => useContext(AMCContext);
