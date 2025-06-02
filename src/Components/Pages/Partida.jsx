import { useState, useEffect } from "react";
import styles from "./Partida.module.css";
import SubmitButton from "../Form/SubmitButton";
import { usePartidas } from "../../contexts/PartidasProvider";
import { useAuthContext } from "../../contexts/AuthProvider";
import axiosClient from "../../utils/axios_client";

const SimularPartidas = () => {
  const [setUsuarios] = useState([]);
  const { mensagem, sortearPartida, fetchHistoricoPartidas, historico } =
    usePartidas(); // Acesso aos estados e funções do contexto
  const { user } = useAuthContext(); // Acesso ao usuário autenticado

  // Busca os usuários no carregamento inicial

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("/api/usuarios");
        setUsuarios(response.data); // axios já retorna `data` diretamente
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  // Busca o histórico de partidas do usuário autenticado
  useEffect(() => {
    if (user) {
      fetchHistoricoPartidas();
    }
  }, [user, fetchHistoricoPartidas]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Simular e Histórico de Partidas</h1>

      <SubmitButton
        onClick={sortearPartida}
        text="Sortear Partida"
        disabled={!user} // Desabilita o botão se o usuário não estiver disponível
      />

      {mensagem && <p className={styles.message}>{mensagem}</p>}

      <h3>Histórico de Partidas</h3>
      <section className={styles.historicoSection}>
        {historico.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Jogador 1</th>
                <th>Jogador 2</th>
                <th>Vencedor</th>
                <th>Pontuação</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {historico
                .slice()
                .reverse()
                .map((partida) => (
                  <tr key={partida.id}>
                    <td>{partida.jogador1}</td>
                    <td>{partida.jogador2}</td>
                    <td>{partida.vencedor}</td>
                    <td>{partida.pontuacao}</td>
                    <td>{new Date(partida.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.message}>Nenhuma partida encontrada.</p>
        )}
      </section>
    </div>
  );
};

export default SimularPartidas;
