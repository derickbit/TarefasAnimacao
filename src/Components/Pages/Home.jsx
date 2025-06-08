import { Link } from "react-router-dom";
import blackjack2 from "../../assets/blackjack2.jpg";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";
import Logo from "../Layout/Logo";
import CardSuitsMorph from "../Cards/toMorph"; // Importa o componente de animação de naipes

function Home() {
  const [loading, setLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    setIsAnimating(true);
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
  };
  useEffect(() => {
    // Simula o carregamento da imagem
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 1.5 segundos

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.home_container}>
      <h1>Bem vindo(a) </h1>
      <h2>
        Apresentamos
        <div
          className={
            isAnimating
              ? "animate__animated animate__pulse animate__infinite"
              : ""
          }
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/partida" className={styles.playgame}>
            {loading ? (
              <div className={styles.loadingBox}>
                <div className={styles.loadingAnimation}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 100 100"
                    fill="none"
                    className={styles.animatedCircle}
                  >
                    <circle cx="50" cy="50" r="50" fill="#D9D9D9" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 100 100"
                    fill="none"
                    className={styles.animatedCircle}
                  >
                    <circle cx="50" cy="50" r="50" fill="#D9D9D9" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 100 100"
                    fill="none"
                    className={styles.animatedCircle}
                  >
                    <circle cx="50" cy="50" r="50" fill="#D9D9D9" />
                  </svg>
                </div>
              </div>
            ) : (
              // <Logo />
              <CardSuitsMorph width="200" height="200" />
            )}
          </Link>
        </div>
        Clique na imagem para jogar
      </h2>
    </section>
  );
}

export default Home;
