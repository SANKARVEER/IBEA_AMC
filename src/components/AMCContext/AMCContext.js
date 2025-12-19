// AMCContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AMCContext = createContext();

export const AMCProvider = ({ children }) => {

  /* ---------------------------------------------------------
        TECHNICIAN STATE + LOCAL STORAGE LOGIN MEMORY
  ----------------------------------------------------------*/
  const [technicianName, setTechnicianName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("technicianName");
    if (saved) setTechnicianName(saved);
  }, []);

  const login = (name) => {
    setTechnicianName(name);
    localStorage.setItem("technicianName", name);
  };

  const logout = () => {
    setTechnicianName("");
    localStorage.removeItem("technicianName");
  };


  /* ---------------------------------------------------------
        SITES STATE (LOAD FROM STORAGE)
  ----------------------------------------------------------*/
  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem("sitesData");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("sitesData", JSON.stringify(sites));
  }, [sites]);


  /* ---------------------------------------------------------
        GET TODAY DATE (YYYY-MM-DD)
  ----------------------------------------------------------*/
  const getToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
  };


  /* ---------------------------------------------------------
        MARK AMC COMPLETED
  ----------------------------------------------------------*/
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
                whatsappGroup,
              },
            }
          : site
      )
    );
  };


  /* ---------------------------------------------------------
        MARK WARRANTY COMPLETED
  ----------------------------------------------------------*/
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
                whatsappGroup,
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
        setSites,

        technicianName,
        login,
        logout,

        markCompleted,
        markWarrantyCompleted,
      }}
    >
      {children}
    </AMCContext.Provider>
  );
};

export const useAMC = () => useContext(AMCContext);
