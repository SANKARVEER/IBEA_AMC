// src/components/AMCContext/AMCContext.js
import React, { createContext, useContext, useState } from "react";

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

        // AMC
        amcPlan: i % 2 === 0 ? "MS" : "XL",
        completed: false,
        serviceInfo: null,

        // WARRANTY
        warranty: isWarranty,
        warrantyPlan: isWarranty ? (i % 2 === 0 ? "MS" : "XL") : null,
        warrantyCompleted: false,
        warrantyInfo: null,
      });
    }

    return list;
  };


  const [sites, setSites] = useState(generateSites());
  const [calendar, setCalendar] = useState([]);


  // --------------------------------------------------
  // ADD ENTRY TO CALENDAR
  // --------------------------------------------------
  const addToCalendar = (entry) => {
    setCalendar((prev) => [...prev, entry]);
  };


  // --------------------------------------------------
  // MARK AMC COMPLETED
  // --------------------------------------------------
  const markCompleted = (id) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const site = sites.find((s) => s.id === id);
    const seatType = site?.amcPlan?.toUpperCase() === "XL" ? "XL" : "MS";

    setSites((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              completed: true,
              serviceInfo: {
                date,
                time,
                technician: technicianName,
                seatType,
              },
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
  };


  // --------------------------------------------------
  // MARK WARRANTY COMPLETED
  // --------------------------------------------------
  const markWarrantyCompleted = (id) => {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    const site = sites.find((s) => s.id === id);
    const plan = site?.warrantyPlan?.toUpperCase() === "XL" ? "XL" : "MS";

    setSites((prev) =>
      prev.map((s) =>
        s.id === id
          ? {
              ...s,
              warrantyCompleted: true,
              warrantyInfo: {
                date,
                time,
                technician: technicianName,
                plan,
              },
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
      plan,
    });
  };


  // --------------------------------------------------
  // PROVIDER EXPORT
  // --------------------------------------------------
  return (
    <AMCContext.Provider
      value={{
        sites,
        setSites,
        calendar,

        markCompleted,
        markWarrantyCompleted,

        technicianName,
        setTechnicianName,
      }}
    >
      {children}
    </AMCContext.Provider>
  );
};

export const useAMC = () => useContext(AMCContext);
