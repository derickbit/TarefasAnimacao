import { Link } from "react-router-dom";
import blackjack2 from "../../assets/blackjack2.jpg";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";
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
      <div>
        <h1>Animação de Naipes</h1>
        <CardSuitsMorph />
      </div>
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
              <div className={styles.skeleton}></div>
            ) : (
              <img src={blackjack2} alt="Imagem do jogo Blackjack 2.0" />
            )}
          </Link>
        </div>
        Clique na imagem para jogar
      </h2>
    </section>
  );
}

export default Home;
