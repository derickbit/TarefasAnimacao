import styles from "./forms.module.css";
import { Link } from "react-router-dom";

export default function EmailVerificado() {
  return (
    <div className={styles.loginContainer}>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>E-mail verificado!</h1>
          <p className={styles.prompt}>Sua conta foi ativada com sucesso.</p>
          <Link to="/login" className={styles.link}>
            Fazer login
          </Link>
        </div>
      </main>
    </div>
  );
}
