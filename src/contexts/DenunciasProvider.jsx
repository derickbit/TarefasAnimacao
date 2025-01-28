import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../utils/axios_client";
import { useAuthContext } from "./AuthProvider";
import PropTypes from "prop-types";

const DenunciasContext = createContext();

export default function DenunciasProvider({ children }) {
  const { token } = useAuthContext();
  const [denuncias, setDenuncias] = useState([]);
  const [jogadores, setJogadores] = useState([]);

  useEffect(() => {
    fetchDenuncias();
    fetchJogadores();
  }, []);

  const fetchDenuncias = async () => {
    try {
      const response = await axiosClient.get("/denuncias", {});
      setDenuncias(response.data);
    } catch (error) {
      console.error("Erro ao carregar denúncias:", error);
    }
  };

  const fetchJogadores = async () => {
    try {
      const response = await axiosClient.get("/jogadores", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJogadores(response.data);
    } catch (error) {
      console.error("Erro ao carregar jogadores:", error);
    }
  };

  const fetchDenunciasDoUsuario = async () => {
    try {
      const response = await axiosClient.get("/denuncias/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data?.data || []; // Ajuste conforme a estrutura do retorno
    } catch (error) {
      console.error("Erro ao buscar denúncias do usuário:", error);
      return [];
    }
  };

  const registrarDenuncia = async (formData) => {
    try {
      const response = await axiosClient.post("/denuncias", formData, {});

      if (response.data?.data) {
        setDenuncias((prev) =>
          Array.isArray(prev)
            ? [...prev, response.data.data]
            : [response.data.data]
        );
      } else {
        console.warn(
          "Resposta inesperada ao registrar denúncia:",
          response.data
        );
      }

      return response.data; // Retorna a resposta, se necessário
    } catch (error) {
      console.error("Erro ao registrar denúncia:", error);
      throw error;
    }
  };

  const excluirDenuncia = async (coddenuncia) => {
    try {
      await axiosClient.delete(`/denuncias/${coddenuncia}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Garante que `prev` é um array
      setDenuncias((prev) => {
        if (Array.isArray(prev)) {
          return prev.filter(
            (denuncia) => denuncia.coddenuncia !== coddenuncia
          );
        } else {
          console.warn("Estado `denuncias` não é um array:", prev);
          return [];
        }
      });
    } catch (error) {
      console.error("Erro ao excluir denúncia:", error);
    }
  };

  return (
    <DenunciasContext.Provider
      value={{
        denuncias,
        jogadores,
        fetchDenunciasDoUsuario,
        registrarDenuncia,
        excluirDenuncia,
      }}
    >
      {children}
    </DenunciasContext.Provider>
  );
}

DenunciasProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useDenunciasContext() {
  return useContext(DenunciasContext);
}
