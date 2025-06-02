import { useContext } from "react";
import { RankingContext } from "../../contexts/RankingProvider";
import RankingCard from "../Cards/RankingCard";
import styles from "./Ranking.module.css";

const RankingJogadores = () => {
  const { ranking, loading } = useContext(RankingContext);

  if (loading) {
    return <p>Carregando ranking...</p>;
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.ranking_box}>
        <div className={styles.tittle_container}>
          <h1>Ranking</h1>
        </div>
        <div className={styles.ranking_list}>
          {ranking.map((user, index) => (
            <RankingCard
              key={user.id}
              name={user.name}
              pontuacao={user.total_pontuacao}
              position={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingJogadores;
