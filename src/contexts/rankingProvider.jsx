import { createContext, useState, useEffect } from "react";
import axiosClient from "../utils/axios_client";

// eslint-disable-next-line react-refresh/only-export-components
export const RankingContext = createContext();

export const RankingProvider = ({ children }) => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axiosClient
      .get("/partidas/ranking")
      .then((response) => {
        setRanking(response.data); // Acessa diretamente response.data
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
