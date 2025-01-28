import styles from "./Login.module.css";
import logo from "../../assets/blackjack_logo.jpg";
import { Link } from "react-router-dom";
import axiosClient from "../../utils/axios_client";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import { useRef } from "react";
import SubmitButton from "../Form/SubmitButton";

function Login() {
  const { setToken, setUser } = useAuthContext();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const response = await axiosClient.post("/login", payload);
      if (response?.status !== 200) throw new Error(response.data);

      const { data } = response;
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("CURRENT_USER", JSON.stringify(data.user));

      alert("Usuário logado!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      const errorMessage = document.getElementById("mensagemErro");
      errorMessage.textContent = "Credenciais inválidas. Tente novamente!";
      errorMessage.style.display = "block";
    }
  };

  return (
    <div className={styles.loginContainer}>
      <main className={styles.main}>
        <div className={styles.container}>
          <img src={logo} alt="Logo Blackjack" className={styles.logo} />
          <h1 className={styles.title}>Login</h1>
          <form className={styles.form} method="post" onSubmit={onSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email:
              </label>
              <input
                type="text"
                name="email"
                id="email"
                ref={emailRef}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="senha" className={styles.label}>
                Senha:
              </label>
              <input
                type="password"
                name="senha"
                id="senha"
                ref={passwordRef}
                required
                className={styles.input}
              />
            </div>
            <SubmitButton
              text="Entrar"
              type="submit"
              className={styles.button}
            />
          </form>

          <h3 className={styles.prompt}>
            Não possui login?{" "}
            <Link to="/cadastro" className={styles.link}>
              Cadastre-se aqui
            </Link>
          </h3>
        </div>
      </main>
    </div>
  );
}

export default Login;
