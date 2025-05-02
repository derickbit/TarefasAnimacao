import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import styles from "./Navbar.module.css";
import logo from "../../assets/blackjack_logo.jpg";
import "animate.css";
import Logo from "./Logo"; // Importa o componente Logo
import Hamburger from "../Cards/Hamburger";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { DiGithubBadge } from "react-icons/di";
import { useState } from "react"; // Importa o hook useState para gerenciar o estado do dropdown

function Navbar() {
  const { setToken, setUser } = useAuthContext(); // Usa o contexto de autenticação
  const navigate = useNavigate(); // Usa navegação para redirecionar após logout
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    setToken(null); // Remove o token do contexto
    setUser(null); // Remove o usuário do contexto
    localStorage.removeItem("ACCESS_TOKEN"); // Remove o token do localStorage
    navigate("/"); // Redireciona para a página de login
    alert("Você foi deslogado!");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Alterna o estado do menu
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <Link to="/" className={styles.link}>
          <Logo src={logo} alt="Logo" className={styles.logo} />
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
          <li className={styles.item}>
            <div onClick={toggleDropdown}>
              <Hamburger border={false} />
            </div>
            {isDropdownOpen && (
              <ul className={styles.dropdown}>
                <li>
                  <FaFacebook />
                </li>
                <li>
                  <FaInstagram />
                </li>
                <li>
                  <FaLinkedin />
                </li>
                <li>
                  <DiGithubBadge />
                </li>
              </ul>
            )}
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
