import styles from "./forms.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../utils/axios_client";
import SubmitButton from "../Form/SubmitButton";

export default function AguardeVerificacao() {
  const [reenviando, setReenviando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const handleReenviar = async () => {
    setReenviando(true);
    setMensagem("");
    try {
      await axiosClient.post("/email/resend-public", {
        email: localStorage.getItem("LAST_REGISTER_EMAIL"),
      });
      setMensagem(
        "E-mail de verificação reenviado! Verifique sua caixa de entrada."
      );
    } catch (error) {
      setMensagem("Erro ao reenviar e-mail. Tente novamente.");
    }
    setReenviando(false);
  };

  return (
    <div className={styles.loginContainer}>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Verifique seu e-mail</h1>
          <p className={styles.prompt}>
            Enviamos um link de verificação para seu e-mail.
            <br />
            Clique no link para ativar sua conta.
          </p>
          <SubmitButton
            text={
              reenviando ? "Reenviando..." : "Reenviar e-mail de verificação"
            }
            type="button"
            onClick={handleReenviar}
            disabled={reenviando}
            className={styles.button}
            style={{ marginBottom: "16px" }}
          />
          {mensagem && (
            <p className={styles.prompt} style={{ color: "#198754" }}>
              {mensagem}
            </p>
          )}
          <Link to="/login" className={styles.link}>
            Ir para o login
          </Link>
        </div>
      </main>
    </div>
  );
}
