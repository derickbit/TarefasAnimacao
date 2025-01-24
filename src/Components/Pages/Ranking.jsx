import { useState, useEffect } from "react";
import RankingCard from "../Cards/RankingCard";
import styles from "./Ranking.module.css";

const RankingJogadores = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/partidas/ranking")
      .then((response) => response.json())
      .then((data) => setRanking(data))
      .catch((error) => console.error("Erro ao buscar o ranking:", error));
  }, []);

  return (
    <div className="project_container">
      <div className="tittle_container">
        <h1>Ranking</h1>
      </div>
      <div className="ranking_list">
        {ranking.map((user, index) => (
          <RankingCard
            key={user.id}
            name={user.name}
            pontuacao={user.total_pontuacao}
            position={index + 1} // Passe a posição aqui
          />
        ))}
      </div>
    </div>
  );
};

export default RankingJogadores;
