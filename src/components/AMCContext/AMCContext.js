// AMCContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const AMCContext = createContext();

export const AMCProvider = ({ children }) => {
  /* =========================================================
        TECHNICIAN LOGIN STATE (WITH LOCAL STORAGE)
  ========================================================= */
  const [technicianName, setTechnicianName] = useState(
    localStorage.getItem("technicianName") || ""
  );
    /* Restore login on refresh */
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
    // NOTE: sites are NOT cleared to avoid data loss
  };

  /* =========================================================
        SITES STATE (PERSISTED)
  ========================================================= */
  const [sites, setSites] = useState(() => {
    const saved = localStorage.getItem("sitesData");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("sitesData", JSON.stringify(sites));
  }, [sites]);

  /* =========================================================
        UTILS
  ========================================================= */
  const getToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const getTime = () => new Date().toLocaleTimeString();

  const getWhatsappGroup = () => {
    const savedGroup =
      JSON.parse(localStorage.getItem("globalGroup")) || [];
    return savedGroup.length > 0 ? savedGroup[0] : null;
  };

  /* =========================================================
        MARK AMC COMPLETED
  ========================================================= */
  const markCompleted = (id) => {
    const date = getToday();
    const time = getTime();
    const whatsappGroup = getWhatsappGroup();

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

  /* =========================================================
        MARK WARRANTY COMPLETED
  ========================================================= */
  const markWarrantyCompleted = (id) => {
    const date = getToday();
    const time = getTime();
    const whatsappGroup = getWhatsappGroup();

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

  /* =========================================================
        CONTEXT EXPORT
  ========================================================= */
  return (
    <AMCContext.Provider
      value={{
        /* Auth */
        technicianName,
        login,
        logout,

        /* Data */
        sites,
        setSites,

        /* Actions */
        markCompleted,
        markWarrantyCompleted,
      }}
    >
      {children}
    </AMCContext.Provider>
  );
};

export const useAMC = () => useContext(AMCContext);
