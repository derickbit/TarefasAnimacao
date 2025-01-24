import styles from "./Login.module.css";
import logo from "../../assets/blackjack_logo.jpg";
import { Link } from "react-router-dom";
import axiosClient from "../../utils/axios_client";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthProvider";
import { useRef } from "react";
import SubmitButton from "../Form/SubmitButton";

function Login() {
  // Contextos e navegação
  const { setToken, setUser } = useAuthContext();
  const emailRef = useRef(); // Referência para o campo de email
  const passwordRef = useRef(); // Referência para o campo de senha
  const navigate = useNavigate();

  // Função de envio do formulário
  const onSubmit = async (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    // Captura os valores dos campos
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      // Envia os dados para a API
      const response = await axiosClient.post("/login", payload);

      // Verifica a resposta
      if (response?.status !== 200) throw new Error(response.data);

      // Extrai os dados retornados
      const { data } = response;

      // Atualiza o contexto e o localStorage
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem("CURRENT_USER", JSON.stringify(data.user));

      // Alerta de sucesso
      alert("Usuário logado!");

      // Redireciona para a página home
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);

      const errorMessage = document.getElementById("mensagemErro");
      errorMessage.textContent = "Credenciais inválidas. Tente novamente!";
      errorMessage.style.display = "block";
    }
  };

  return (
    <div className={styles.body_login}>
      <main className={styles.main_login}>
        <img src={logo} alt="Logo" />
        <h1 className={styles.titulo_login}>Login</h1>
        <section className={styles.section_login_form}>
          <form className={styles.form_login} method="post" onSubmit={onSubmit}>
            <div className={styles.input_group}>
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                name="email"
                id="email"
                ref={emailRef}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="senha">Senha: </label>
              <input
                type="password"
                name="senha"
                id="senha"
                ref={passwordRef}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.button_group}>
              <SubmitButton
                text="Entrar"
                type="submit"
                id="btn_entrar"
                name="entrar"
                value="Entrar"
                className={styles.button}
              />
            </div>
          </form>
        </section>

        <h3 className={styles.cadastro_prompt}>
          Não possui login? Faça um cadastro:
          <Link to="/cadastro">Cadastro</Link>
        </h3>
      </main>
    </div>
  );
}

export default Login;
