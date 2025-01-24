import { Link } from "react-router-dom";

import Container from "./Container";

import styles from "./Navbar.module.css";
import logo from "../../assets/blackjack_logo.jpg";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container className={styles.container}>
        <div className={styles.navLeft}>
          <Link to="/">
            <img src={logo} alt="Logo" className={styles.logo} />
          </Link>
          <ul className={styles.list}>
            <li className={styles.item}>
              <Link to="/">Home</Link>
            </li>
            <li className={styles.item}>
              <Link to="/perfil">Editar Perfil</Link>
            </li>
            <li className={styles.item}>
              <Link to="/denuncias">Denuncias</Link>
            </li>
            <li className={styles.item}>
              <Link to="/ranking">Ranking</Link>
            </li>
            <li className={styles.item}>
              <Link to="/partida">Partida</Link>
            </li>
          </ul>
        </div>
        <button className={styles.logout} onClick={() => alert("Sair")}>
          Sair
        </button>
      </Container>
    </nav>
  );
}

export default Navbar;
