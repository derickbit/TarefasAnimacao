// ALTERADO: Removi 'Link' pois o jogo vai carregar aqui.
import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Bem vindo(a)</h1>
      <h2>Apresentamos nosso jogo HiLo!</h2>
      <h3>aqui roda o jogo na página oficial</h3>
    </section>
  );
}

export default Home;
