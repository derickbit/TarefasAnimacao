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
        navigate("/login");
      }
    } catch (error) {
      console.error(error);

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
        <div className={styles.imgContainer}>
          <img src={logo} alt="Logo Blackjack" className={styles.logo} />

          <h1 className={styles.titleCadastro}>Cadastro</h1>
          <form
            className={styles.formCadastro}
            onSubmit={onSubmit}
            method="POST"
          >
            <div className={styles.inputGroup}>
              <label htmlFor="nome" className={styles.label}>
                Nome:
              </label>
              <input
                type="text"
                name="nome"
                id="nome"
                value={name}
                onChange={handleName}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmail}
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
                value={password}
                onChange={handlePassword}
                required
                className={styles.input}
              />
            </div>
            <SubmitButton text="Cadastrar" type="submit" />
          </form>

          <h3 className={styles.prompt}>
            Já possui cadastro?{" "}
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </h3>
        </div>
      </main>
    </div>
  );
}

export default Cadastro;
