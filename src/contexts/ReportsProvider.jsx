import { createContext, useContext, useState, useCallback } from "react";
import axiosClient from "../utils/axios_client";
import { useAuthContext } from "./AuthProvider";
import PropTypes from "prop-types";

const ReportsContext = createContext();

export default function ReportsProvider({ children }) {
  const { token } = useAuthContext();
  const [reports, setReports] = useState([]);

  // Buscar todos os reports do usuário
  const fetchReports = useCallback(async () => {
    try {
      const response = await axiosClient.get("/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data);
    } catch (error) {
      console.error("Erro ao buscar reports:", error);
    }
  }, [token]);

  const updateReportStatus = async (reportId, newStatus) => {
    try {
      await axiosClient.patch(
        `/reports/${reportId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Erro ao atualizar status do report:", error);
      throw error;
    }
  };

  // Criar novo report
  const createReport = async (formData) => {
    try {
      await axiosClient.post("/reports", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Atualiza a lista após criar
      await fetchReports();
    } catch (error) {
      console.error("Erro ao criar report:", error);
    }
  };

  // Buscar mensagens de um report
  const fetchReportMessages = async (reportId) => {
    try {
      const response = await axiosClient.get(`/reports/${reportId}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data || [];
    } catch (error) {
      console.error("Erro ao buscar mensagens do report:", error);
      return [];
    }
  };

  // Enviar mensagem em um report
  const sendReportMessage = async (reportId, formData) => {
    try {
      await axiosClient.post(`/reports/${reportId}/messages`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <ReportsContext.Provider
      value={{
        reports,
        fetchReports,
        createReport,
        fetchReportMessages,
        sendReportMessage,
        updateReportStatus,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

ReportsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useReportsContext() {
  return useContext(ReportsContext);
}
