import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Cadastro.module.css"; // Arquivo CSS para o estilo da página
import logo from "../../assets/blackjack_logo.jpg"; // Caminho da logo
import axiosClient from "../../utils/axios_client";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../Form/SubmitButton";

function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      name,
      email,
      password,
    };

    try {
      const response = await axiosClient.post("/users", payload);
      if (response.status === 201) {
        alert("Usuário criado com sucesso!");
        navigate("/home");
      }
    } catch (error) {
      console.error(error);

      // Tratamento de erros específicos
      if (error.response && error.response.status === 422) {
        const errors = error.response.data;
        let errorMessage = "Erro ao criar usuário:\n";
        Object.keys(errors).forEach((key) => {
          errorMessage += `${key}: ${errors[key].join(", ")}\n`;
        });
        alert(errorMessage);
      } else {
        alert("Erro ao criar usuário. Tente novamente.");
      }
    }
  };

  return (
    <div className={styles.bodyCadastro}>
      <main className={styles.mainCadastro}>
        <img src={logo} alt="Logo Blackjack" className={styles.logo} />
        <h1 className={styles.tituloCadastro}>Cadastro</h1>
        <section className={styles.sectionCadastroForm}>
          <form
            className={styles.formCadastro}
            onSubmit={onSubmit}
            method="POST"
          >
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={name}
                onChange={handleName}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmail}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                name="senha"
                id="senha"
                onChange={handlePassword}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <SubmitButton text="Cadastrar" type="submit" />
            </div>
          </form>
        </section>
        <h3 className={styles.cadastroPrompt}>
          Já possui cadastro?{" "}
          <Link to="/login" className={styles.linkCadastro}>
            Login
          </Link>
        </h3>
      </main>
    </div>
  );
}

export default Cadastro;
