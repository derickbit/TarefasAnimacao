import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import styles from "./Navbar.module.css";
import logo from "../../assets/blackjack_logo.jpg";
import "animate.css";

function Navbar() {
  const { setToken, setUser } = useAuthContext(); // Usa o contexto de autenticação
  const navigate = useNavigate(); // Usa navegação para redirecionar após logout

  const handleLogout = () => {
    setToken(null); // Remove o token do contexto
    setUser(null); // Remove o usuário do contexto
    localStorage.removeItem("ACCESS_TOKEN"); // Remove o token do localStorage
    navigate("/"); // Redireciona para a página de login
    alert("Você foi deslogado!");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link to="/" className={styles.link}>
          <div className="animate__animated animate__zoomIn animate__infinite animate__slow">
            <img src={logo} alt="Logo" className={styles.logo} />
          </div>
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
      <button className={styles.logout} onClick={handleLogout || alert("Sair")}>
        Sair
      </button>
    </nav>
  );
}

export default Navbar;
