import PropTypes from "prop-types";
import styles from "./SubmitButton.module.css";

function SubmitButton({ text, onClick, type = "button", className }) {
  return (
    <button
      className={className ? className : styles.btn}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func, // Evento de clique opcional
  type: PropTypes.string, // Tipo do botão, padrão é "button"
  className: PropTypes.string, // Classe opcional para estilização global
};

export default SubmitButton;
