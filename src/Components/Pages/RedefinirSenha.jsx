import { useState } from "react";
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import axiosClient from "../../utils/axios_client";
import styles from "./forms.module.css";
import SubmitButton from "../Form/SubmitButton";
import { Link } from "react-router-dom";

export default function RedefinirSenha() {
  const [searchParams] = useSearchParams();
  const { token } = useParams();
  const email = searchParams.get("email") || "";
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);
  const navigate = useNavigate();

  // Regras individuais para a senha
  const passwordRules = [
    {
      label: "Ao menos 6 caracteres",
      test: (pw) => pw.length >= 6,
    },
    {
      label: "Ao menos uma letra",
      test: (pw) => /[A-Za-z]/.test(pw),
    },
    {
      label: "Ao menos um número",
      test: (pw) => /\d/.test(pw),
    },
  ];

  // Validação de senha: mínimo 6 caracteres, pelo menos uma letra e um número
  function isValidPassword(password) {
    return passwordRules.every((rule) => rule.test(password));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensagem("");

    if (!isValidPassword(password)) {
      setMensagem(
        "A senha deve ter pelo menos 6 caracteres, incluindo letras e números."
      );
      setEnviando(false);
      return;
    }

    if (password !== password_confirmation) {
      setMensagem("As senhas não coincidem.");
      setEnviando(false);
      return;
    }

    try {
      await axiosClient.post("/reset-password", {
        token,
        email,
        password,
        password_confirmation,
      });
      setMensagem("Senha redefinida com sucesso! Você será redirecionado.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        let msg = "";
        Object.keys(errors).forEach((key) => {
          msg += `${key}: ${errors[key].join(", ")}\n`;
        });
        setMensagem(msg);
      } else {
        setMensagem("Erro ao redefinir senha. Tente novamente.");
      }
    }
    setEnviando(false);
  };

  return (
    <div className={styles.loginContainer}>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Redefinir Senha</h1>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup} style={{ position: "relative" }}>
              <label htmlFor="password" className={styles.label}>
                Nova senha:
              </label>
              <input
                type="password"
                id="password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPasswordRules(true)}
                onBlur={() => setShowPasswordRules(false)}
                required
                autoComplete="new-password"
              />
              {showPasswordRules && (
                <div className={styles.passwordPopover}>
                  <div className={styles.passwordPopoverTitle}>
                    A senha deve possuir:
                  </div>
                  <ul className={styles.passwordRules}>
                    {passwordRules.map((rule, idx) => (
                      <li
                        key={idx}
                        style={{
                          color: rule.test(password) ? "green" : "red",
                          listStyle: "none",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5em",
                          fontWeight: rule.test(password) ? "bold" : "normal",
                        }}
                      >
                        <span>{rule.test(password) ? "✔️" : "❌"}</span>
                        {rule.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password_confirmation" className={styles.label}>
                Confirmar nova senha:
              </label>
              <input
                type="password"
                id="password_confirmation"
                className={styles.input}
                value={password_confirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
                autoComplete="new-password"
              />
            </div>
            <SubmitButton
              text={enviando ? "Redefinindo..." : "Redefinir Senha"}
              type="submit"
              disabled={enviando}
              className={styles.button}
            />
          </form>
          <h3 className={styles.prompt}>
            Voltar à página de{" "}
            <Link to="/login" className={styles.link}>
              Login
            </Link>
          </h3>
          {mensagem && <p className={styles.prompt}>{mensagem}</p>}
        </div>
      </main>
    </div>
  );
}
