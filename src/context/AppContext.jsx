import { createContext, useContext, useState, useEffect } from "react";
import apiRequest from "../utils/apiRequest.js";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [busStops, setBusStops] = useState(null);

  const shiftTable = ["Утро", "День", "Ночь"];

  const getBusStops = async () => {
    const { data } = await apiRequest.get("/stops/busStops");
    setBusStops(data);
  };

  useEffect(() => {
    getBusStops();
  }, []);

  return (
    <AppContext.Provider value={{ shiftTable, loading, error, busStops }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAuth must be used within a AppProvider");
  }

  return context;
};
