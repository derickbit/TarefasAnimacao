import { useState, useEffect } from "react";
import { useReportsContext } from "../../contexts/ReportsProvider";
import styles from "./forms.module.css";
import SubmitButton from "../Form/SubmitButton";
import { useRef } from "react";
import { useAuthContext } from "../../contexts/AuthProvider";

const Reports = () => {
  const {
    fetchReports,
    reports,
    createReport,
    fetchReportMessages,
    sendReportMessage,
    updateReportStatus,
  } = useReportsContext();
  const intervalRef = useRef();
  const messagesEndRef = useRef(null);
  const [lastReportId, setLastReportId] = useState(null);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newReport, setNewReport] = useState({
    titulo: "",
    mensagem: "",
    imagem: null,
  });

  // Carrega os reports do usuário
  useEffect(() => {
    let intervalId;
    const loadReports = async () => {
      await fetchReports();
      setLoading(false);
    };
    loadReports();
    // Atualiza a lista a cada 3 segundos
    intervalId = setInterval(loadReports, 3000);
    return () => clearInterval(intervalId);
  }, [fetchReports]);

  useEffect(() => {
    if (showChat && selectedReport) {
      // Função para buscar mensagens
      const fetchMessages = async () => {
        const msgs = await fetchReportMessages(selectedReport.id);
        setMessages(msgs);
      };
      // Buscar imediatamente ao abrir
      fetchMessages();
      // Buscar a cada 3 segundos
      intervalRef.current = setInterval(fetchMessages, 3000);
      // Limpar intervalo ao fechar chat ou trocar de report
      return () => clearInterval(intervalRef.current);
    }
  }, [showChat, selectedReport, fetchReportMessages]);

  useEffect(() => {
    if (showChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showChat]);

  useEffect(() => {
    if (!loading && reports.length > 0) {
      // Pega o report mais recente (assumindo que o maior ID é o mais novo)
      const latest = [...reports].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )[0];
      if (latest && latest.id !== lastReportId) {
        setLastReportId(latest.id);
        setSelectedReport(latest);
        setShowChat(true);
        // Busca as mensagens do novo report
        fetchReportMessages(latest.id).then(setMessages);
      }
    }
    // eslint-disable-next-line
  }, [reports, loading]);

  // Abre o chat de um report
  const openChat = async (report) => {
    setSelectedReport(report);
    setShowChat(true);
    const msgs = await fetchReportMessages(report.id);
    setMessages(msgs);
  };

  const handleStatusChange = async (reportId, newStatus) => {
    try {
      await updateReportStatus(reportId, newStatus);
      await fetchReports();
    } catch (e) {
      alert(
        "Erro ao atualizar status. Verifique se você está autenticado como admin."
      );
    }
  };

  // Envia uma nova mensagem no chat
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage && !newImage) return;
    const formData = new FormData();
    formData.append("mensagem", newMessage);
    if (newImage) formData.append("imagem", newImage);
    await sendReportMessage(selectedReport.id, formData);
    const msgs = await fetchReportMessages(selectedReport.id);
    setMessages(msgs);
    setNewMessage("");
    setNewImage(null);
  };

  // Cria um novo report
  const handleCreateReport = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", newReport.titulo);
    formData.append("mensagem", newReport.mensagem);
    if (newReport.imagem) formData.append("imagem", newReport.imagem);
    await createReport(formData);
    setNewReport({ titulo: "", mensagem: "", imagem: null });
    await fetchReports();
  };

  return (
    <div className={styles.loginContainer}>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Envie seu recado</h1>
          <h3 className={styles.subtitle}>
            <p>Tem alguma dúvida, elogio, report, feedbacks em geral?</p>
            <p> Nos envie por aqui:</p>
          </h3>
          {/* Formulário para novo report */}
          <form className={styles.form} onSubmit={handleCreateReport}>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="titulo">
                Título:
              </label>
              <input
                className={styles.input}
                type="text"
                id="titulo"
                placeholder="Título"
                value={newReport.titulo}
                onChange={(e) =>
                  setNewReport({ ...newReport, titulo: e.target.value })
                }
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="mensagem">
                Descreva seu relato:
              </label>
              <textarea
                className={styles.input}
                id="mensagem"
                placeholder="Descreva seu relato"
                value={newReport.mensagem}
                onChange={(e) =>
                  setNewReport({ ...newReport, mensagem: e.target.value })
                }
                required
                rows={3}
              />
            </div>
            <div
              className={styles.inputGroup}
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <label className={styles.attachmentLabel} title="Anexar imagem">
                <input
                  className={styles.attachmentInput}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewReport({ ...newReport, imagem: e.target.files[0] })
                  }
                />
                <span className={styles.attachmentIcon}>📎</span>
              </label>
              {newReport.imagem && (
                <img
                  src={URL.createObjectURL(newReport.imagem)}
                  alt="preview"
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    objectFit: "cover",
                    marginLeft: 8,
                  }}
                />
              )}
              <span style={{ color: "#888", fontSize: "0.95em" }}>
                {newReport.imagem ? newReport.imagem.name : "Anexar imagem"}
              </span>
            </div>
            <SubmitButton text="Enviar Relato" type="submit" />
          </form>

          {/* Lista de reports */}
          <h2
            className={styles.title}
            style={{ fontSize: "1.3rem", marginTop: 30 }}
          >
            Relatos enviados
          </h2>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div className={styles.reportsTableWrapper}>
              <table className={styles.reportsTable}>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {[...reports].reverse().map((report) => (
                    <tr key={report.id}>
                      <td>{report.titulo}</td>
                      <td>
                        {user?.role === "admin" ? (
                          <select
                            value={report.status}
                            onChange={(e) =>
                              handleStatusChange(report.id, e.target.value)
                            }
                          >
                            <option value="aberto">Aberto</option>
                            <option value="em_análise">Em análise</option>
                            <option value="concluído">Concluído</option>
                          </select>
                        ) : (
                          report.status
                        )}
                      </td>
                      <td>{new Date(report.created_at).toLocaleString()}</td>
                      <td>
                        {(user?.role === "admin" ||
                          report.status !== "concluído") && (
                          <SubmitButton
                            text="Abrir Chat"
                            onClick={() => openChat(report)}
                            className={styles.smallBtn}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Modal/chat do report */}
          {showChat && selectedReport && (
            <div className={styles.chatbox}>
              <div
                className={styles.title}
                style={{
                  fontSize: "1.1rem",
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>-{selectedReport.titulo}</span>
                <button
                  className={styles.closeBtn}
                  onClick={() => setShowChat(false)}
                  title="Fechar"
                >
                  ×
                </button>
              </div>
              <div className={styles.chatMessagesArea}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ marginBottom: 12 }}>
                    <strong>{msg.user?.name || "Usuário"}</strong>:{" "}
                    {msg.mensagem}
                    {msg.imagem && (
                      <div>
                        <img
                          src={`http://localhost:8000/storage/${msg.imagem}`}
                          alt="imagem"
                          width={100}
                          style={{ borderRadius: 6, marginTop: 4 }}
                        />
                      </div>
                    )}
                    <div style={{ fontSize: "0.85em", color: "#888" }}>
                      {new Date(msg.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <form
                className={styles.form}
                onSubmit={handleSendMessage}
                style={{ marginTop: 8 }}
              >
                <div className={styles.chatInputRow}>
                  <input
                    className={styles.chatInput}
                    type="text"
                    id="novaMensagem"
                    placeholder="Digite sua mensagem"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <label
                    className={styles.attachmentLabel}
                    title="Anexar imagem"
                  >
                    <input
                      className={styles.attachmentInput}
                      type="file"
                      accept="image/*"
                      onChange={(e) => setNewImage(e.target.files[0])}
                    />
                    <span className={styles.attachmentIcon}>📎</span>
                  </label>
                  <SubmitButton text="Enviar" type="submit" />
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reports;
