import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../utils/axios_client";
import { useAuthContext } from "./AuthProvider";
import PropTypes from "prop-types";

const UsersContext = createContext();

export default function UsersProvider({ children }) {
  const { user, token } = useAuthContext();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  const updateUser = async (formData) => {
    if (!currentUser || !token) {
      throw new Error("Usuário não autenticado.");
    }

    try {
      const response = await axiosClient.put(
        `/users/${currentUser.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setCurrentUser(response.data); // Atualiza o estado local
        return response.data;
      } else {
        throw new Error("Falha ao atualizar o perfil.");
      }
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
      throw error;
    }
  };

  const deleteUser = async () => {
    if (!currentUser || !token) {
      throw new Error("Usuário não autenticado.");
    }

    try {
      const response = await axiosClient.delete(`/users/${currentUser.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setCurrentUser(null); // Limpa o estado do usuário
        return true;
      } else {
        throw new Error("Falha ao excluir a conta.");
      }
    } catch (error) {
      console.error("Erro ao excluir a conta:", error);
      throw error;
    }
  };

  return (
    <UsersContext.Provider value={{ currentUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
}

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useUsersContext() {
  return useContext(UsersContext);
}
