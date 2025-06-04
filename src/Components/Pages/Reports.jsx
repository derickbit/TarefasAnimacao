import { useState, useEffect, useRef, useCallback } from "react"; // Adicionado useCallback
import { useReportsContext } from "../../contexts/ReportsProvider";
import styles from "./forms.module.css";
import SubmitButton from "../Form/SubmitButton";
import { useAuthContext } from "../../contexts/AuthProvider";

// Ícone de atualização simples (SVG) - Coloque onde preferir ou use um ícone de biblioteca
const RefreshIcon = ({ onClick, style, title = "Atualizar" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    viewBox="0 0 16 16"
    style={{
      cursor: "pointer",
      marginLeft: "10px",
      verticalAlign: "middle",
      ...style,
    }}
    onClick={onClick}
    title={title}
  >
    <path
      fillRule="evenodd"
      d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
    />
    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
  </svg>
);

// Helper para obter a URL base do backend (como você ajustou)
const getBackendBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || ""; // CORRIGIDO para import.meta.env
  if (apiUrl && apiUrl.endsWith("/api")) {
    return apiUrl.slice(0, -"/api".length);
  }
  if (apiUrl && apiUrl.startsWith("https://")) {
    return apiUrl;
  }
  return "http://localhost:8000";
};
const BACKEND_BASE_URL = getBackendBaseUrl();

const Reports = () => {
  const {
    fetchReports,
    reports,
    createReport,
    fetchReportMessages,
    sendReportMessage,
    updateReportStatus,
  } = useReportsContext();

  // Refs para os timers de polling
  const reportsPollingRef = useRef(null); // <<< Novo ref para polling da lista de reports
  const messagesPollingRef = useRef(null); // <<< Renomeado 'intervalRef' para clareza

  const messagesEndRef = useRef(null);
  const fileInputRefNewReport = useRef(null);
  const fileInputRefChatMessage = useRef(null);

  const [lastReportId, setLastReportId] = useState(null);
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [newReport, setNewReport] = useState({
    titulo: "",
    mensagem: "",
    imagem: null,
  });
  const [newReportImagePreview, setNewReportImagePreview] = useState(null);
  const [newChatMessageImage, setNewChatMessageImage] = useState(null);
  const [newChatMessageImagePreview, setNewChatMessageImagePreview] =
    useState(null);

  // Função para carregar a lista de reports (para ser usada pelo polling e botão)
  const loadReportsList = useCallback(async () => {
    // console.log("Atualizando lista de reports..."); // Para depuração
    if (user) {
      await fetchReports();
    }
    setLoading(false); // Garante que o loading principal seja tratado
  }, [fetchReports, user]);

  // Carrega os reports do usuário e configura polling de 1 minuto para a lista
  useEffect(() => {
    loadReportsList(); // Carga inicial

    clearInterval(reportsPollingRef.current); // Limpa qualquer intervalo anterior
    reportsPollingRef.current = setInterval(loadReportsList, 60000); // <<< ATUALIZAÇÃO: Polling a cada 60 segundos

    return () => clearInterval(reportsPollingRef.current); // Limpa ao desmontar
  }, [loadReportsList]); // Depende da função memoizada

  // Função para carregar mensagens do chat (para ser usada pelo polling e botão)
  const loadChatMessages = useCallback(
    async (reportIdToLoad) => {
      if (user && reportIdToLoad) {
        // console.log(`Atualizando mensagens para report ${reportIdToLoad}...`); // Para depuração
        const msgs = await fetchReportMessages(reportIdToLoad);
        setMessages(msgs || []);
      }
    },
    [fetchReportMessages, user]
  );

  // Busca mensagens do chat e configura polling de 1 minuto (somente quando o chat está aberto)
  useEffect(() => {
    if (showChat && selectedReport?.id) {
      loadChatMessages(selectedReport.id); // Busca imediatamente ao abrir

      clearInterval(messagesPollingRef.current); // Limpa qualquer intervalo anterior
      messagesPollingRef.current = setInterval(
        () => loadChatMessages(selectedReport.id),
        60000
      ); // <<< ATUALIZAÇÃO: Polling a cada 60 segundos

      return () => clearInterval(messagesPollingRef.current); // Limpa ao fechar chat ou trocar de report
    } else {
      clearInterval(messagesPollingRef.current); // Garante limpeza se o chat for fechado
    }
  }, [showChat, selectedReport, loadChatMessages]); // Dependências corretas

  // Scroll para o final das mensagens (SEU CÓDIGO ORIGINAL)
  useEffect(() => {
    if (showChat) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showChat]);

  // Auto-abrir chat (SEU CÓDIGO ORIGINAL - comente ou ajuste se causar problemas)
  useEffect(() => {
    if (!loading && reports.length > 0 && !showChat) {
      const latest = [...reports].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      )[0];
      if (latest && latest.id !== lastReportId) {
        setLastReportId(latest.id);
        // setSelectedReport(latest); // Comentado para não auto-abrir
        // setShowChat(true);        // Comentado para não auto-abrir
        // if (latest.id) fetchReportMessages(latest.id).then(setMessages); // Comentado
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reports, loading, showChat]);

  // Limpa Object URLs (SEU CÓDIGO ORIGINAL)
  useEffect(() => {
    const currentReportPreview = newReportImagePreview;
    const currentMessagePreview = newChatMessageImagePreview;
    return () => {
      if (currentReportPreview) URL.revokeObjectURL(currentReportPreview);
      if (currentMessagePreview) URL.revokeObjectURL(currentMessagePreview);
    };
  }, [newReportImagePreview, newChatMessageImagePreview]);

  // Abre o chat de um report (SEU CÓDIGO ORIGINAL)
  const openChat = async (report) => {
    setSelectedReport(report);
    setShowChat(true);
    if (report.id) {
      // A busca inicial de mensagens agora é tratada pelo useEffect que observa showChat e selectedReport
      // Mas podemos chamar aqui para garantir que carrega ao clicar, caso o useEffect demore um ciclo.
      const msgs = await fetchReportMessages(report.id);
      setMessages(msgs || []);
    }
  };

  // Função para fechar o chat
  const handleCloseChat = () => {
    setShowChat(false);
    setSelectedReport(null);
    setMessages([]);
  };

  // Handler de status (SEU CÓDIGO ORIGINAL)
  const handleStatusChange = async (reportId, newStatus) => {
    try {
      await updateReportStatus(reportId, newStatus);
      await loadReportsList(); // <<< ATUALIZAÇÃO: Chama a função de recarregar reports
    } catch (e) {
      alert(
        "Erro ao atualizar status. Verifique se você está autenticado como admin."
      );
    }
  };

  // Handlers de imagem (SEU CÓDIGO ORIGINAL - já incluem preview e limpeza de ObjectURL)
  const handleNewReportImageChange = (e) => {
    const file = e.target.files[0];
    if (newReportImagePreview) URL.revokeObjectURL(newReportImagePreview);
    if (file) {
      setNewReport({ ...newReport, imagem: file });
      setNewReportImagePreview(URL.createObjectURL(file));
    } else {
      setNewReport({ ...newReport, imagem: null });
      setNewReportImagePreview(null);
    }
  };

  const handleNewChatMessageImageChange = (e) => {
    const file = e.target.files[0];
    if (newChatMessageImagePreview)
      URL.revokeObjectURL(newChatMessageImagePreview);
    if (file) {
      setNewChatMessageImage(file);
      setNewChatMessageImagePreview(URL.createObjectURL(file));
    } else {
      setNewChatMessageImage(null);
      setNewChatMessageImagePreview(null);
    }
  };

  // Envia uma nova mensagem no chat (SEU CÓDIGO ORIGINAL COM PEQUENO AJUSTE)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if ((!newMessage || !newMessage.trim()) && !newChatMessageImage) return;
    if (!selectedReport?.id) return;

    const formData = new FormData();
    formData.append("mensagem", newMessage.trim());
    if (newChatMessageImage) formData.append("imagem", newChatMessageImage);

    await sendReportMessage(selectedReport.id, formData); // O provider pode chamar fetchReports
    await loadChatMessages(selectedReport.id); // <<< ATUALIZAÇÃO: Chama a função de recarregar mensagens do chat

    setNewMessage("");
    setNewChatMessageImage(null);
    if (newChatMessageImagePreview)
      URL.revokeObjectURL(newChatMessageImagePreview);
    setNewChatMessageImagePreview(null);
    if (fileInputRefChatMessage.current) {
      fileInputRefChatMessage.current.value = "";
    }
  };

  // Cria um novo report (SEU CÓDIGO ORIGINAL COM PEQUENO AJUSTE)
  const handleCreateReport = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", newReport.titulo);
    formData.append("mensagem", newReport.mensagem);
    if (newReport.imagem) formData.append("imagem", newReport.imagem);

    await createReport(formData); // O provider já chama fetchReports
    setNewReport({ titulo: "", mensagem: "", imagem: null });
    if (newReportImagePreview) URL.revokeObjectURL(newReportImagePreview);
    setNewReportImagePreview(null);
    if (fileInputRefNewReport.current) {
      fileInputRefNewReport.current.value = "";
    }
    // Não precisa chamar fetchReports() aqui se o createReport no provider já o faz.
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

          {/* Formulário para novo report - SÓ APARECE SE NÃO FOR ADMIN */}
          {user && user.role !== "admin" && (
            <form
              className={styles.form}
              onSubmit={handleCreateReport}
              style={{ marginBottom: "20px" }}
            >
              {/* ... Seu formulário de novo report aqui (mantido como estava no seu código) ... */}
              {/* Input Título */}
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
              {/* Input Mensagem */}
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
              {/* Input Imagem NOVO REPORT com PREVIEW (mantendo sua estrutura que disse estar OK) */}
              <div
                className={styles.inputGroup}
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <label
                  className={styles.customFileUploadButton}
                  title="Anexar imagem"
                >
                  {" "}
                  {/* <<< NOVO ESTILO SUGERIDO */}
                  <input
                    ref={fileInputRefNewReport}
                    type="file"
                    accept="image/*"
                    onChange={handleNewReportImageChange}
                    style={{ display: "none" }} // Esconde o input padrão
                  />
                  <span className={styles.attachmentIcon}>📎</span>{" "}
                  {/* Ícone */}
                  <span className={styles.attachmentText}>
                    {" "}
                    {/* Texto ao lado do ícone */}
                    {newReport.imagem ? newReport.imagem.name : "Anexar imagem"}
                  </span>
                </label>
                {newReportImagePreview && (
                  <img
                    src={newReportImagePreview}
                    alt="preview novo report"
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
          )}

          {/* Lista de reports */}
          <h2
            className={styles.title}
            style={{
              fontSize: "1.3rem",
              marginTop: user && user.role === "admin" ? 0 : 30,
              display: "flex",
              alignItems: "center",
            }}
          >
            Relatos enviados
            {/* Botão de Atualizar Lista de Reports */}
            {!loading && user && (
              <RefreshIcon
                onClick={loadReportsList}
                title="Atualizar lista de relatos"
              />
            )}
          </h2>
          {loading ? (
            <p>Carregando...</p>
          ) : reports.length === 0 ? (
            <p>Nenhum relato encontrado.</p>
          ) : (
            <div className={styles.reportsTableWrapper}>
              {/* ... Sua tabela de reports (mantida como estava no seu código) ... */}
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
                          report.status?.replace("_", " ") || "N/A"
                        )}
                      </td>
                      <td>{new Date(report.created_at).toLocaleString()}</td>
                      <td>
                        {(user?.role === "admin" ||
                          (user?.id === report.user_id &&
                            report.status !== "concluído")) && (
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
            <div className={styles.chatModalOverlay} onClick={handleCloseChat}>
              <div
                className={styles.chatbox}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={styles.chatHeader}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "10px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <span>Chat: {selectedReport.titulo}</span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Botão de Atualizar Mensagens do Chat */}
                    <RefreshIcon
                      onClick={() => loadChatMessages(selectedReport.id)}
                      style={{ marginRight: "10px" }}
                      title="Atualizar mensagens"
                    />
                    <button
                      className={styles.closeBtn}
                      onClick={handleCloseChat}
                      title="Fechar"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className={styles.chatMessagesArea}>
                  {/* ... Seu map de mensagens (mantido como estava no seu código, mas esperando msg.imagem_url) ... */}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        marginBottom: 12,
                        textAlign: msg.user_id === user?.id ? "right" : "left",
                      }}
                    >
                      <div
                        style={{
                          backgroundColor:
                            msg.user_id === user?.id ? "#dcf8c6" : "#f1f0f0",
                          padding: "8px 12px",
                          borderRadius: "10px",
                          display: "inline-block",
                          maxWidth: "70%",
                          textAlign: "left",
                          boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                        }}
                      >
                        <strong>
                          {msg.user?.name ||
                            (msg.user_id === user?.id ? "Você" : "Suporte")}
                        </strong>
                        : <div>{msg.mensagem}</div>
                        {/* EXIBIÇÃO DE IMAGEM NO CHAT - ESPERA 'imagem_url' DO BACKEND */}
                        {msg.imagem_url && (
                          <div style={{ marginTop: "5px" }}>
                            <img
                              src={msg.imagem_url} // DEVE VIR DO BACKEND COM URL COMPLETA
                              alt="Imagem da mensagem"
                              style={{
                                maxWidth: "200px",
                                maxHeight: "200px",
                                borderRadius: 6,
                                cursor: "pointer",
                                display: "block",
                              }}
                              onClick={() =>
                                window.open(msg.imagem_url, "_blank")
                              }
                            />
                          </div>
                        )}
                        <div
                          style={{
                            fontSize: "0.8em",
                            color: "#888",
                            marginTop: "4px",
                            textAlign: "right",
                          }}
                        >
                          {new Date(msg.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                {/* Formulário de Envio de Mensagem no Chat com PREVIEW ACIMA (mantendo a estrutura que você gostou) */}
                <form
                  className={styles.form}
                  onSubmit={handleSendMessage}
                  style={{
                    marginTop: 8,
                    paddingTop: "10px",
                    borderTop: "1px solid #eee",
                  }}
                >
                  {newChatMessageImagePreview && (
                    <div style={{ marginBottom: "10px", textAlign: "center" }}>
                      <img
                        src={newChatMessageImagePreview}
                        alt="Preview da nova imagem do chat"
                        style={{
                          maxHeight: "80px",
                          maxWidth: "100%",
                          borderRadius: 4,
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}
                  <div className={styles.chatInputRow}>
                    {" "}
                    {/* Seu input de chat aqui (mantido como estava no seu código) */}
                    <input
                      className={styles.chatInput}
                      type="text"
                      placeholder="Digite sua mensagem"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <label
                      className={styles.attachmentLabel}
                      title="Anexar imagem"
                    >
                      <input
                        ref={fileInputRefChatMessage}
                        className={styles.attachmentInput}
                        type="file"
                        accept="image/*"
                        onChange={handleNewChatMessageImageChange} // Handler para preview
                      />
                      <span className={styles.attachmentIcon}>📎</span>
                    </label>
                    <SubmitButton text="Enviar" type="submit" />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Reports;
