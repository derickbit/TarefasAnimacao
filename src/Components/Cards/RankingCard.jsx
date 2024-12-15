import styles from "./RankingCard.module.css";
import PropTypes from "prop-types";

function RankingCard({ name, pontuacao }) {
  return (
    <div className={styles.ranking_card}>
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
};
export default RankingCard;
