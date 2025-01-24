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
      const response = await axiosClient.get("/denuncias", {
        headers: { Authorization: `Bearer ${token}` },
      });
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

  const registrarDenuncia = async (formData) => {
    try {
      const response = await axiosClient.post("/denuncias", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setDenuncias((prev) => [...prev, response.data.denuncia]);
      return response.data;
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
      setDenuncias((prev) =>
        prev.filter((denuncia) => denuncia.coddenuncia !== coddenuncia)
      );
    } catch (error) {
      console.error("Erro ao excluir denúncia:", error);
    }
  };

  return (
    <DenunciasContext.Provider
      value={{ denuncias, jogadores, registrarDenuncia, excluirDenuncia }}
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
