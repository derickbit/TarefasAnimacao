import PropTypes from "prop-types";
import styles from "./SubmitButton.module.css";

function SubmitButton({ text }) {
  return (
    <div>
      <button className={styles.btn}>{text}</button>
    </div>
  );
}

SubmitButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SubmitButton;
