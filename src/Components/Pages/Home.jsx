import { Link } from "react-router-dom";
import blackjack2 from "../../assets/blackjack2.jpg";
import styles from "./Home.module.css";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import { useUsersContext } from "../../contexts/UsersProvider";

function Home() {
  const { token } = useAuthContext();
  const { currentUser, updateUser, deleteUser } = useUsersContext();
  if (!token || !currentUser) {
    return <Navigate to="/login" />;
  }
  return (
    <section className={styles.home_container}>
      <h1>Bem vindo(a) </h1>
      <h2>
        Apresentamos
        <p>
          <Link to="/partida">
            <img src={blackjack2} alt="Imagem do jogo Blackjack 2.0" />
          </Link>
        </p>
        Clique na imagem para jogar
      </h2>
    </section>
  );
}

export default Home;
