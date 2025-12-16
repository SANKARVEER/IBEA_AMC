import React, { createContext, useContext, useState } from "react";

const AMCContext = createContext();

export const AMCProvider = ({ children }) => {
  /* ================= Technician ================= */
  const [technicianName, setTechnicianName] = useState("Technician");

  /* ================= Helpers ================= */
  const getToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };

  /* ================= Initial Sites ================= */
  const generateSites = () => {
    const areas = ["North", "South", "East", "West"];
    const locations = [
      "Chennai",
      "T Nagar",
      "Velachery",
      "Tambaram",
      "Adyar",
      "Anna Nagar",
      "Porur",
      "Avadi",
      "Guindy",
      "Medavakkam",
    ];

    return Array.from({ length: 200 }, (_, i) => {
      const id = i + 1;
      const isWarranty = id <= 100;

      return {
        id,
        name: `Site ${id}`,
        address: `Address ${id}, Building ${id}`,
        area: areas[id % areas.length],
        location: locations[id % locations.length],

        amcPlan: id % 2 === 0 ? "MS" : "XL",
        completed: false,
        completedDate: null,
        serviceInfo: null,

        warranty: isWarranty,
        warrantyPlan: isWarranty ? (id % 2 === 0 ? "MS" : "XL") : null,
        warrantyCompleted: false,
        warrantyCompletedDate: null,
        warrantyInfo: null,
      };
    });
  };

  /* ================= State ================= */
  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem("sitesData");
    return saved ? JSON.parse(saved) : generateSites();
  });

  const [calendar, setCalendar] = useState(() => {
    const saved = localStorage.getItem("calendarData");
    return saved ? JSON.parse(saved) : [];
  });

  /* ================= Calendar ================= */
  const addToCalendar = (entry) => {
    setCalendar((prev) => [...prev, entry]);
  };

  /* ================= AMC Complete ================= */
  const markCompleted = (id) => {
    const date = getToday();
    const time = new Date().toLocaleTimeString();

    const savedGroup =
      JSON.parse(localStorage.getItem("globalGroup")) || [];

    const whatsappGroup =
      savedGroup.length > 0 ? savedGroup[0] : null;

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
                whatsappGroup,
              },
            }
          : site
      )
    );

    addToCalendar({
      id,
      type: "AMC",
      date,
      time,
      technician: technicianName,
    });
  };

  /* ================= Logout ================= */
  const logout = () => {
    localStorage.setItem("sitesData", JSON.stringify(sites));
    localStorage.setItem("calendarData", JSON.stringify(calendar));
    setTechnicianName("");
  };

  return (
    <AMCContext.Provider
      value={{
        sites,
        technicianName,
        setTechnicianName,
        calendar,
        markCompleted,
        logout,
      }}
    >
      {children}
    </AMCContext.Provider>
  );
};

export const useAMC = () => useContext(AMCContext);
