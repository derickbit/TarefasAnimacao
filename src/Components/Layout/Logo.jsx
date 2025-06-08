import SVGatorLogo from "/src/assets/logo-animated-sized.svg?url";
import PropTypes from "prop-types";
import styles from "./Logo.module.css"; // Importe os estilos como um objeto

const Logo = ({ className }) => (
  <img
    src={SVGatorLogo}
    alt="Logo animado"
    /*
      Adicione a classe "styles.cropped" aqui.
      Ela será combinada com as outras classes.
    */
    className={`
      ${styles.cropped} 
      inline-block 
      animate-fade-in-scale 
      ${className || ""}
    `}
    width={50}
    height="auto"
  />
);

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
