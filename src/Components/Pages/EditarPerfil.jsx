import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styles from "./EditarPerfil.module.css";
import { useAuthContext } from "../../contexts/AuthProvider";
import { useUsersContext } from "../../contexts/UsersProvider";
import SubmitButton from "../Form/SubmitButton";

function EditarPerfil() {
  const { token } = useAuthContext();
  const { currentUser, updateUser, deleteUser } = useUsersContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    senha: "",
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        senha: "", // Mantemos vazio inicialmente
      });
    }
  }, [currentUser]);

  // Função para atualizar os dados do usuário
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Preparar o payload com os nomes corretos
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.senha, // Backend espera "password" em vez de "senha"
      };

      // Remover o campo `password` se estiver vazio

      // Enviar atualização
      const updatedUser = await updateUser(payload);
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      alert("Erro ao atualizar perfil. Tente novamente.");
    }
  };

  // Função para excluir a conta
  const handleDelete = async (e) => {
    e.preventDefault();

    if (window.confirm("Tem certeza que deseja excluir sua conta?")) {
      try {
        await deleteUser();
        alert("Conta excluída com sucesso!");
      } catch (error) {
        alert("Erro ao excluir conta. Tente novamente.");
      }
    }
  };

  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className={styles.bodyEditarPerfil}>
      <h1 className={styles.tituloEditarPerfil}>Editar Perfil</h1>
      <main className={styles.mainEditarPerfil}>
        <section className={styles.sectionEditarPerfil}>
          <form className={styles.formEditarPerfil} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formExcluirConta}>
              <SubmitButton
                text="Editar Perfil"
                type="submit"
                id="btn_editar_perfil"
                name="editar_perfil"
                value="Editar"
                className={styles.button}
              />
            </div>
          </form>

          <form className={styles.formExcluirConta} onSubmit={handleDelete}>
            <SubmitButton
              text="Excluir conta"
              type="submit"
              id="btn_excluir_conta"
              name="excluir_conta"
              value="Excluir Conta"
              className={styles.button}
            />
          </form>
        </section>
      </main>
    </div>
  );
}

export default EditarPerfil;
