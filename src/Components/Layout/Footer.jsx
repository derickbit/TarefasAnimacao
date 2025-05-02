import { DiReact, DiPhp, DiJsBadge, DiLaravel } from "react-icons/di";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.social_list}>
        <li>
          <DiReact />
        </li>
        <li>
          <DiPhp />
        </li>
        <li>
          <DiJsBadge />
        </li>
        <li>
          <DiLaravel />
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>Blackjack 2.0</span> &copy; 2025
      </p>
    </footer>
  );
}

export default Footer;
