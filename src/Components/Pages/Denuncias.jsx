import { useState, useRef } from "react";
import { useDenunciasContext } from "../../contexts/DenunciasProvider";
import Input from "../../Components/Form/Input";
import Select from "../../Components/Form/Select";
import SubmitButton from "../../Components/Form/SubmitButton";
import styles from "./Denuncias.module.css";
import { useAuthContext } from "../../contexts/AuthProvider";

const DenunciarJogador = () => {
  const {
    jogadores,
    denuncias,
    fetchJogadores,
    registrarDenuncia,
    excluirDenuncia,
  } = useDenunciasContext();
  const [descricao, setDescricao] = useState("");
  const [coddenunciado, setCodDenunciado] = useState("");
  const [imagem, setImagem] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coddenunciado || !descricao) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const formData = new FormData();
    formData.append("denunciante_id", user.id);
    formData.append("denunciado_id", coddenunciado);
    formData.append("descricao", descricao);
    if (imagem) {
      formData.append("imagem", imagem);
    }

    console.log("Dados enviados:", Object.fromEntries(formData.entries()));

    try {
      await registrarDenuncia(formData);
      alert("Denúncia registrada com sucesso!");
      setDescricao("");
      setCodDenunciado("");
      setImagem(null);
    } catch (error) {
      console.error("Erro ao registrar denúncia:", error);
      alert("Erro ao registrar denúncia. Tente novamente.");
    }
  };

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <h1>Denunciar Jogador</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <Select
          text="Jogador a ser denunciado"
          name="coddenunciado"
          options={jogadores.map((jogador) => ({
            id: jogador.id,
            name: jogador.name,
          }))}
          handleOnChange={(e) => setCodDenunciado(e.target.value)}
          value={coddenunciado}
        />

        <Input
          type="text"
          text="Descrição da Denúncia"
          name="descricao"
          placeholder="Descreva a denúncia"
          handleOnChange={(e) => setDescricao(e.target.value)}
          value={descricao}
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <SubmitButton
          text={imagem ? "Arquivo Selecionado" : "Anexar Imagem (opcional)"}
          onClick={(e) => {
            e.preventDefault();
            fileInputRef.current.click();
          }}
        />

        <SubmitButton text="Registrar Denúncia" type="submit" />
      </form>

      <section className={styles.denunciasSection}>
        <h3>Minhas Denúncias</h3>
        {denuncias.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Código</th>
                <th>Denunciado</th>
                <th>Descrição</th>
                <th>Imagem</th>
                <th>Data</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {denuncias.map((denuncia) => (
                <tr key={denuncia.coddenuncia}>
                  <td>{denuncia.coddenuncia}</td>
                  <td>{denuncia.denunciado.name}</td>
                  <td>{denuncia.descricao}</td>
                  <td>
                    {denuncia.imagem ? (
                      <img
                        src={`/imagens/${denuncia.imagem}`}
                        alt="Imagem denúncia"
                        width="50"
                      />
                    ) : (
                      "Nenhuma imagem anexada"
                    )}
                  </td>
                  <td>{denuncia.reg_date}</td>
                  <td>
                    <button
                      className={styles.deleteButton}
                      onClick={() => excluirDenuncia(denuncia.coddenuncia)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhuma denúncia registrada.</p>
        )}
      </section>
    </div>
  );
};

export default DenunciarJogador;
