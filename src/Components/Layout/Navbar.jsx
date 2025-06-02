import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import styles from "./Navbar.module.css";
import logo from "../../assets/blackjack_logo.jpg";
import "animate.css";
import Logo from "./Logo";
import Hamburger from "../Cards/Hamburger";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { DiGithubBadge } from "react-icons/di";
import { useState } from "react";

function Navbar() {
  const { setToken, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("ACCESS_TOKEN");
    navigate("/");
    alert("Você foi deslogado!");
  };

  const handleSociaisClick = () => {
    setIsDropdownOpen((prev) => !prev);
    setIsHamburgerActive((prev) => !prev);
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
            <Link to="/ranking">Ranking</Link>
          </li>
          <li className={styles.item}>
            <Link to="/partida">Partida</Link>
          </li>
          <li className={styles.item}>
            <Link to="/reports">Contato</Link>
          </li>
          <li
            className={styles.item}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5em",
              position: "relative",
            }}
          >
            <div
              onClick={handleSociaisClick}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                color: "#fff",
                fontWeight: "bold",
                userSelect: "none",
              }}
              className={styles.link}
            >
              <span style={{ marginRight: "0.5em" }}>Sociais:</span>
              <Hamburger border={false} active={isHamburgerActive} />
            </div>
            {isDropdownOpen && (
              <ul
                className={styles.dropdown}
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  minWidth: "120px",
                }}
              >
                <li>
                  <Link
                    to="https://www.linkedin.com/in/derick-bitencourte-da-silva/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "inherit",
                    }}
                  >
                    <DiGithubBadge /> <p>GitHub</p>
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://github.com/derickbit"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "inherit",
                    }}
                  >
                    <FaLinkedin /> <p>Linkedin</p>
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      <button className={styles.logout} onClick={handleLogout}>
        Sair
      </button>
    </nav>
  );
}

export default Navbar;
