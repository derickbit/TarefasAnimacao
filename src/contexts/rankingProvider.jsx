import { createContext, useState, useEffect } from "react";

export const RankingContext = createContext();

export const RankingProvider = ({ children }) => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    fetch("http://127.0.0.1:8000/partidas/ranking", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
