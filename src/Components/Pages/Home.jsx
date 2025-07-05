import styles from "./Home.module.css";
import Scene3D from "./Scene3D"; // Certifique-se que o caminho está correto

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Bem vindo(a)</h1>
      <h2>Apresentamos nosso jogo HiLo!</h2>

      {/* Usamos a nova classe de estilo para criar o container da cena */}
      <div className={styles.scene_container}>
        <Scene3D />
      </div>
    </section>
  );
}

export default Home;
