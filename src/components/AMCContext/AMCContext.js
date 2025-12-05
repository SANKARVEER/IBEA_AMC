import React, { createContext, useContext, useState } from "react";

const AMCContext = createContext();

export const AMCProvider = ({ children }) => {
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
        completed: false,
      });
    }

    return sitesList;
  };

  const [sites, setSites] = useState(generateSites());

  const markCompleted = (id) => {
    setSites((prev) =>
      prev.map((site) =>
        site.id === id
          ? {
              ...site,
              completed: true,
              serviceInfo: {
                date: new Date().toLocaleDateString(),
                time: new Date().toLocaleTimeString(),
                technician: "Mr. Kumar",
              },
            }
          : site
      )
    );
  };

  return (
    <AMCContext.Provider value={{ sites, markCompleted }}>
      {children}
    </AMCContext.Provider>
  );
};

export const useAMC = () => useContext(AMCContext);
