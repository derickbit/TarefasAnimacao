import styles from "./RankingCard.module.css";
import PropTypes from "prop-types";

function RankingCard({ name, pontuacao, position }) {
  // Define a classe adicional baseada na posição
  const positionClass =
    position === 1
      ? styles.gold
      : position === 2
      ? styles.silver
      : position === 3
      ? styles.bronze
      : styles.default;

  return (
    <div className={`${styles.ranking_card} ${positionClass}`}>
      <h4>{name}</h4>
      <p>
        <span>Pontuação:</span> {pontuacao}
      </p>
    </div>
  );
}

RankingCard.propTypes = {
  name: PropTypes.string.isRequired,
  pontuacao: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
};

export default RankingCard;
