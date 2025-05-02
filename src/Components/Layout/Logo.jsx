import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { animate } from "animejs";

const Logo = ({ src, alt, className }) => {
  const logoRef = useRef(null); // Referência para o elemento do logo

  useEffect(() => {
    if (logoRef.current) {
      // Aplica a animação ao logo
      animate(logoRef.current, {
        opacity: [0, 1],
        // loop: true,
        // translateY: ["100%", "0%"],
        duration: 2000,
        easing: "easeInOutQuad",
        delay: 500,
        autoplay: true,
      });
    }
  }, []);

  return (
    <div ref={logoRef}>
      <img src={src} alt={alt} className={className} />
    </div>
  );
};
Logo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Logo;
