import { useState, useEffect, useRef } from "react";
import Input from "../../Components/Form/Input";
import Select from "../../Components/Form/Select";
import SubmitButton from "../../Components/Form/SubmitButton";
import styles from "./Denuncias.module.css";

const DenunciarJogador = () => {
  const [pessoas, setPessoas] = useState([]);
  const [denuncias, setDenuncias] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [coddenunciado, setCodDenunciado] = useState("");
  const [imagem, setImagem] = useState(null);
  const [mensagem, setMensagem] = useState("");

  // Referência para o input de arquivo
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pessoasResponse = await fetch("/api/pessoas");
        const pessoasData = await pessoasResponse.json();
        setPessoas(pessoasData);

        const denunciasResponse = await fetch("/api/denuncias");
        const denunciasData = await denunciasResponse.json();
        setDenuncias(denunciasData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("coddenunciado", coddenunciado);
    formData.append("descricao", descricao);
    if (imagem) {
      formData.append("imagem", imagem);
    }

    try {
      const response = await fetch("/api/denuncias", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      setMensagem(result.message);
      if (result.success) {
        setDenuncias((prev) => [...prev, result.denuncia]);
      }
    } catch (error) {
      console.error("Erro ao registrar denúncia:", error);
    }
  };

  const handleExcluir = async (coddenuncia) => {
    if (window.confirm("Você tem certeza que deseja excluir esta denúncia?")) {
      try {
        const response = await fetch(`/api/denuncias/${coddenuncia}`, {
          method: "DELETE",
        });
        const result = await response.json();
        if (result.success) {
          setDenuncias((prev) =>
            prev.filter((denuncia) => denuncia.coddenuncia !== coddenuncia)
          );
        }
        setMensagem(result.message);
      } catch (error) {
        console.error("Erro ao excluir denúncia:", error);
      }
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
          options={pessoas.map((pessoa) => ({
            id: pessoa.codpessoa,
            name: pessoa.nome,
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

        {/* Input de arquivo oculto */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Botão personalizado para abrir o seletor de arquivos */}
        <SubmitButton
          text={imagem ? "Arquivo Selecionado" : "Anexar Imagem (opcional)"}
          onClick={(e) => {
            e.preventDefault();
            fileInputRef.current.click(); // Simula clique no input
          }}
        />

        <SubmitButton text="Registrar Denúncia" />
      </form>

      {mensagem && <p className={styles.message}>{mensagem}</p>}

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
                  <td>{denuncia.nome_denunciado}</td>
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
                      onClick={() => handleExcluir(denuncia.coddenuncia)}
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
