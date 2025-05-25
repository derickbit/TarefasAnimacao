import { useState, useRef, useEffect } from "react";
import { useDenunciasContext } from "../../contexts/DenunciasProvider";
import Input from "../../Components/Form/Input";
import Select from "../../Components/Form/Select";
import SubmitButton from "../../Components/Form/SubmitButton";
import styles from "./Denuncias.module.css";
import { useAuthContext } from "../../contexts/AuthProvider";

const DenunciarJogador = () => {
  const {
    jogadores,
    fetchDenunciasDoUsuario,
    registrarDenuncia,
    excluirDenuncia,
  } = useDenunciasContext();
  const [descricao, setDescricao] = useState("");
  const [minhasDenuncias, setMinhasDenuncias] = useState([]);
  const [coddenunciado, setCodDenunciado] = useState("");
  const [imagem, setImagem] = useState(null);
  const fileInputRef = useRef(null);
  const { user } = useAuthContext();

  // Função para transformar a nova denúncia no formato esperado
  const transformarNovaDenuncia = (novaDenuncia) => {
    const { data } = novaDenuncia;

    // Encontra o nome do denunciado com base no ID fornecido na denúncia
    const nomeDenunciado = jogadores.find(
      (jogador) => jogador.id === parseInt(data.denunciado_id)
    )?.name;

    // Retorna um objeto formatado com as informações da denúncia transformada
    return {
      coddenuncia: data.coddenuncia,
      denunciado: { name: nomeDenunciado || "Nome não disponível" },
      descricao: data.descricao || "Sem descrição",
      imagem: data.imagem, // A URL da imagem deve vir do backend
      created_at: data.created_at,
    };
  };

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

    try {
      const novaDenuncia = await registrarDenuncia(formData);
      console.log("Nova denúncia registrada:", novaDenuncia);

      if (novaDenuncia) {
        // Transformar a nova denúncia antes de adicioná-la ao estado
        const denunciaFormatada = transformarNovaDenuncia(novaDenuncia);
        setMinhasDenuncias((prev) => [...prev, denunciaFormatada]);
        alert("Denúncia registrada com sucesso!");
      }

      // Limpar formulário
      setDescricao("");
      setCodDenunciado("");
      setImagem(null);
      window.location.reload(); // Recarrega a página
    } catch (error) {
      console.error("Erro ao registrar denúncia:", error);
      alert("Erro ao registrar denúncia. Tente novamente.");
    }
  };

  const handleFileChange = (e) => {
    setImagem(e.target.files[0]);
  };

  useEffect(() => {
    // Função para carregar as denúncias do usuário
    const carregarDenuncias = async () => {
      try {
        const denuncias = await fetchDenunciasDoUsuario();
        console.log("Denúncias retornadas:", denuncias); // Verifique o conteúdo
        setMinhasDenuncias(Array.isArray(denuncias) ? denuncias : []);
      } catch (error) {
        console.error("Erro ao carregar denúncias:", error);
        setMinhasDenuncias([]);
      }
    };

    carregarDenuncias(); // Chama a função ao montar o componente
  }, []);

  const handleExcluirDenuncia = async (coddenuncia) => {
    try {
      await excluirDenuncia(coddenuncia);
      alert("Denúncia excluída com sucesso!");
      setMinhasDenuncias((prev) =>
        prev.filter((denuncia) => denuncia.coddenuncia !== coddenuncia)
      );
    } catch (error) {
      console.error("Erro ao excluir denúncia:", error);
      alert("Erro ao excluir denúncia. Tente novamente.");
    }
  };

  return (
    <div className={styles.denuncia_container}>
      {/* Seção do formulário */}
      <div className={styles.denuncias_section}>
        <h3 className={styles.form_title}>Denunciar Jogador</h3>

        <div className={styles.form_section}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
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
            </div>

            <div className={styles.formGroup}>
              <Input
                type="text"
                text="Descrição da Denúncia"
                name="descricao"
                placeholder="Descreva a denúncia"
                handleOnChange={(e) => setDescricao(e.target.value)}
                value={descricao}
              />
            </div>

            <div className={styles.formGroup}>
              <Input
                type="file"
                text="Anexar Imagem (opcional)"
                name="imagem"
                handleOnChange={(e) => setImagem(e.target.files[0])}
              />
            </div>

            <SubmitButton text="Registrar Denúncia" type="submit" />
          </form>
        </div>
      </div>

      {/* Seção da lista de denúncias */}
      <div className={styles.denuncias_section}>
        <h3 className={styles.denuncias_title}>Minhas Denúncias</h3>
        <section className={styles.denunciasSection}>
          {Array.isArray(minhasDenuncias) && minhasDenuncias.length > 0 ? (
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
                {minhasDenuncias.map((denuncia) => (
                  <tr key={denuncia.coddenuncia}>
                    <td>{denuncia.coddenuncia}</td>
                    <td>
                      {denuncia.denunciado?.name || "Nome não disponível"}
                    </td>
                    <td>{denuncia.descricao || "Sem descrição"}</td>
                    <td>
                      {denuncia.imagem ? (
                        <a
                          href={`http://localhost:8000/storage/denuncias/${denuncia.imagem}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`http://localhost:8000/storage/denuncias/${denuncia.imagem}`}
                            alt="Imagem denúncia"
                            width="50"
                          />
                        </a>
                      ) : (
                        "Nenhuma imagem"
                      )}
                    </td>
                    <td>
                      {new Date(denuncia.created_at).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className={styles.deleteButton}
                        onClick={() =>
                          handleExcluirDenuncia(denuncia.coddenuncia)
                        }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Nenhuma denúncia encontrada</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default DenunciarJogador;
