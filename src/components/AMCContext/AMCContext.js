import React, { createContext, useContext, useState } from "react";

const AMCContext = createContext();

export const AMCProvider = ({ children }) => {
  // --------------------------------------------------
  // Generate 200 Sites with AMC + Warranty Plan (MS / XL)
  // --------------------------------------------------
  const generateSites = () => {
    const areas = ["North", "South", "East", "West"];
    const locations = [
      "Chennai", "T Nagar", "Velachery", "Tambaram", "Adyar",
      "Anna Nagar", "Porur", "Avadi", "Guindy", "Medavakkam",
    ];

    const sitesList = [];

    for (let i = 1; i <= 200; i++) {
      const isWarranty = i <= 100; // Only first 100 sites have warranty

      sitesList.push({
        id: i,
        name: `Site ${i}`,
        address: `Address ${i}, Building ${i}`,
        area: areas[i % areas.length],
        location: locations[i % locations.length],

        // AMC Plan
        amcPlan: i % 2 === 0 ? "MS" : "XL",
        completed: false,
        serviceInfo: null,

        // WARRANTY LIMITED TO 100
        warranty: isWarranty,
        warrantyPlan: isWarranty ? (i % 2 === 0 ? "MS" : "XL") : null,
        warrantyCompleted: false,
        warrantyInfo: null,
      });
    }

    return sitesList;
  };

  const [sites, setSites] = useState(generateSites());
  const [calendar, setCalendar] = useState([]);

  // --------------------------------------------------
  // Add to Calendar
  // --------------------------------------------------
  const addToCalendar = (entry) => {
    setCalendar((prev) => [...prev, entry]);
  };

  // --------------------------------------------------
  // Mark AMC Completed (Auto MS / XL)
  // --------------------------------------------------
  const markCompleted = (id) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const site = sites.find((s) => s.id === id);
    const seatType = site?.amcPlan?.toUpperCase() === "XL" ? "XL" : "MS";

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

    addToCalendar({
      id,
      type: "AMC",
      date,
      time,
      technician: "Mr. Kumar",
      seatType,
    });
  };

  // --------------------------------------------------
  // Mark Warranty Completed (Auto MS / XL)
  // --------------------------------------------------
  const markWarrantyCompleted = (id) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const site = sites.find((s) => s.id === id);
    if (!site || !site.warranty) return; // Only allow warranty sites

    const plan = site?.warrantyPlan?.toUpperCase() === "XL" ? "XL" : "MS";

    setSites((prev) =>
      prev.map((site) =>
        site.id === id
          ? {
              ...site,
              warrantyCompleted: true,
              warrantyInfo: {
                date,
                time,
                technician: "Mr. Kumar",
                plan,
              },
            }
          : site
      )
    );

    addToCalendar({
      id,
      type: "Warranty",
      date,
      time,
      technician: "Mr. Kumar",
      plan,
    });
  };

  // --------------------------------------------------
  // Computed lists for convenience
  // --------------------------------------------------
  const completedAMC = sites.filter(s => s.completed);
  const completedWarranty = sites.filter(s => s.warrantyCompleted);

  return (
    <AMCContext.Provider
      value={{
        sites,
        calendar,
        markCompleted,
        markWarrantyCompleted,
        addToCalendar,
        completedAMC,       // <- ready-to-use list
        completedWarranty, // <- ready-to-use list
      }}
    >
      {children}
    </AMCContext.Provider>
  );
};

export const useAMC = () => useContext(AMCContext);
