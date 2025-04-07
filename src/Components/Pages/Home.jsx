import { Link } from "react-router-dom";
import blackjack2 from "../../assets/blackjack2.jpg";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";

function Home() {
  const [loading, setLoading] = useState(true);

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
        <p>
          <Link to="/partida" className={styles.playgame}>
            {loading ? (
              <div className={styles.skeleton}></div>
            ) : (
              <img src={blackjack2} alt="Imagem do jogo Blackjack 2.0" />
            )}
          </Link>
        </p>
        Clique na imagem para jogar
      </h2>
    </section>
  );
}

export default Home;
