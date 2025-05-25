import SVGatorLogo from "/src/assets/logo-animated.svg?url";
import PropTypes from "prop-types";

const Logo = ({ className }) => (
  <img
    src={SVGatorLogo}
    alt="Logo animado"
    className={`inline-block animate-fade-in-scale ${className || ""}`}
    width={50}
    height="auto"
  />
);

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
