import { useState, useEffect } from "react";
import styles from "./Partida.module.css";
import SubmitButton from "../Form/SubmitButton";

const SimularPartidas = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("/api/usuarios"); // Endpoint para obter usuários
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const sortearPartida = () => {
    if (usuarios.length < 2) {
      setMensagem(
        "É necessário ao menos dois jogadores para realizar uma partida."
      );
      return;
    }

    // Sorteia dois jogadores diferentes
    const jogador1Index = Math.floor(Math.random() * usuarios.length);
    let jogador2Index;
    do {
      jogador2Index = Math.floor(Math.random() * usuarios.length);
    } while (jogador2Index === jogador1Index);

    const jogador1 = usuarios[jogador1Index];
    const jogador2 = usuarios[jogador2Index];

    // Sorteia o vencedor
    const vencedor = Math.random() < 0.5 ? jogador1 : jogador2;

    // Sorteia a pontuação
    const pontuacao = Math.floor(Math.random() * 11); // De 0 a 10

    // Registra a partida no banco de dados
    registrarPartida(jogador1, jogador2, vencedor, pontuacao);
  };

  const registrarPartida = async (jogador1, jogador2, vencedor, pontuacao) => {
    try {
      const response = await fetch("/api/partidas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Jogador1: jogador1.name,
          Jogador2: jogador2.name,
          Vencedor: vencedor.name,
          pontuacao,
        }),
      });

      const result = await response.json();
      setMensagem(result.message || "Partida registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar partida:", error);
      setMensagem("Erro ao registrar a partida.");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Simular Partidas</h1>

      <SubmitButton onClick={sortearPartida} text="Sortear Partida" />

      {mensagem && <p className={styles.message}>{mensagem}</p>}

      <section className={styles.usuariosSection}>
        <h3>Jogadores Disponíveis</h3>
        {usuarios.length > 0 ? (
          <ul className={styles.list}>
            {usuarios.map((usuario) => (
              <li key={usuario.id} className={styles.listItem}>
                {usuario.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.message}>Nenhum jogador encontrado.</p>
        )}
      </section>
    </div>
  );
};

export default SimularPartidas;
