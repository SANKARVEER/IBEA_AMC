import React, { createContext, useContext, useState } from "react";

const AMCContext = createContext();

export const AMCProvider = ({ children }) => {
  // --------------------------------------------------
  // Generate sites with AMC Plan (MS or XL)
  // --------------------------------------------------
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

    const sitesList = [];

    for (let i = 1; i <= 250; i++) {
      sitesList.push({
        id: i,
        name: `Site ${i}`,
        address: `Address ${i}, Building ${i}`,
        area: areas[i % areas.length],
        location: locations[i % locations.length],
        
        // NEW FIELD — AMC PLAN AUTO ASSIGNED
        amcPlan: i % 2 === 0 ? "MS" : "XL",

        completed: false,
        serviceInfo: null,
      });
    }

    return sitesList;
  };

  const [sites, setSites] = useState(generateSites());
  const [calendar, setCalendar] = useState([]);

  // --------------------------------------------------
  // Generic function: Add to Calendar
  // --------------------------------------------------
  const addToCalendar = (entry) => {
    setCalendar((prev) => [...prev, entry]);
  };

  // --------------------------------------------------
  // Mark Site Completed (Auto save -> calendar)
  // --------------------------------------------------
  const markCompleted = (id) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    // Find site object to get plan type
    const site = sites.find((s) => s.id === id);

    // Auto detect MS / XL
    const seatType =
      site?.amcPlan && site.amcPlan.toUpperCase() === "XL" ? "XL" : "MS";

    // Update site data
    setSites((prev) =>
      prev.map((site) =>
        site.id === id
          ? {
              ...site,
              completed: true,
              serviceInfo: {
                date,
                time,
                technician: "Mr. Kumar",
                seatType,
              },
            }
          : site
      )
    );

    // Save to calendar
    addToCalendar({
      id,
      date,
      time,
      technician: "Mr. Kumar",
      seatType, // SAVE AUTOMATIC SEAT TYPE
    });
  };

  return (
    <AMCContext.Provider
      value={{
        sites,
        markCompleted,
        calendar,
        addToCalendar, // EXPORT THIS TOO
      }}
    >
      {children}
    </AMCContext.Provider>
  );
};

export const useAMC = () => useContext(AMCContext);
