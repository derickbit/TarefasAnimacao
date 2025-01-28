import { createContext, useState, useEffect } from "react";
import axiosClient from "../utils/axios_client";

export const RankingContext = createContext();

export const RankingProvider = ({ children }) => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axiosClient
      .get("/partidas/ranking")
      .then((response) => response.json())
      .then((data) => {
        setRanking(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar o ranking:", error);
        setLoading(false);
      });
  }, []);

  return (
    <RankingContext.Provider value={{ ranking, loading }}>
      {children}
    </RankingContext.Provider>
  );
};
