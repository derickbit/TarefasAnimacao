import { useState, useEffect } from "react";
import RankingCard from "../Cards/RankingCard";
import styles from "./Ranking.module.css";

const RankingJogadores = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await fetch("/api/ranking");
        const data = await response.json();
        setRanking(data);
      } catch (error) {
        console.error("Erro ao carregar o ranking:", error);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ranking de Jogadores</h1>
      {ranking.length > 0 ? (
        <ul>
          {ranking.map((jogador, index) => (
            <li key={jogador.codpessoa}>
              <RankingCard
                name={`${index + 1}º lugar: ${jogador.nome}`}
                pontuacao={jogador.total_pontuacao}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.message}>Nenhum jogador no ranking.</p>
      )}
    </div>
  );
};

export default RankingJogadores;
