// import { useState, useEffect, useRef } from "react";
// import { useReportsContext } from "../../contexts/ReportsProvider";
// import styles from "./forms.module.css";
// import SubmitButton from "../Form/SubmitButton";

// const AllReports = () => {
//   const {
//     fetchAllReports, // Você precisa criar esse método no contexto, que busca todos os reports
//     fetchReportMessages,
//     sendReportMessage,
//   } = useReportsContext();

//   const [loading, setLoading] = useState(true);
//   const [reports, setReports] = useState([]);
//   const [showChat, setShowChat] = useState(false);
//   const [selectedReport, setSelectedReport] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [newImage, setNewImage] = useState(null);
//   const messagesEndRef = useRef(null);
//   const intervalRef = useRef();

//   useEffect(() => {
//     const loadReports = async () => {
//       const all = await fetchAllReports();
//       setReports(all);
//       setLoading(false);
//     };
//     loadReports();
//   }, [fetchAllReports]);

//   useEffect(() => {
//     if (showChat && selectedReport) {
//       const fetchMessages = async () => {
//         const msgs = await fetchReportMessages(selectedReport.id);
//         setMessages(msgs);
//       };
//       fetchMessages();
//       intervalRef.current = setInterval(fetchMessages, 3000);
//       return () => clearInterval(intervalRef.current);
//     }
//   }, [showChat, selectedReport, fetchReportMessages]);

//   useEffect(() => {
//     if (showChat) {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages, showChat]);

//   const openChat = async (report) => {
//     setSelectedReport(report);
//     setShowChat(true);
//     const msgs = await fetchReportMessages(report.id);
//     setMessages(msgs);
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage && !newImage) return;
//     const formData = new FormData();
//     formData.append("mensagem", newMessage);
//     if (newImage) formData.append("imagem", newImage);
//     await sendReportMessage(selectedReport.id, formData);
//     const msgs = await fetchReportMessages(selectedReport.id);
//     setMessages(msgs);
//     setNewMessage("");
//     setNewImage(null);
//   };

//   return (
//     <div className={styles.loginContainer}>
//       <main className={styles.main}>
//         <div className={styles.container}>
//           <h1 className={styles.title}>Todos os Relatos</h1>
//           {loading ? (
//             <p>Carregando...</p>
//           ) : (
//             <div className={styles.reportsTableWrapper}>
//               <table className={styles.reportsTable}>
//                 <thead>
//                   <tr>
//                     <th>Usuário</th>
//                     <th>Título</th>
//                     <th>Status</th>
//                     <th>Data</th>
//                     <th>Ações</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {[...reports].reverse().map((report) => (
//                     <tr key={report.id}>
//                       <td>{report.user?.name || "Desconhecido"}</td>
//                       <td>{report.titulo}</td>
//                       <td>{report.status}</td>
//                       <td>{new Date(report.created_at).toLocaleString()}</td>
//                       <td>
//                         <SubmitButton
//                           text="Abrir Chat"
//                           onClick={() => openChat(report)}
//                           className={styles.smallBtn}
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}

//           {/* Modal/chat do report */}
//           {showChat && selectedReport && (
//             <div className={styles.chatbox}>
//               <div
//                 className={styles.title}
//                 style={{
//                   fontSize: "1.1rem",
//                   marginBottom: 8,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <span>
//                   {selectedReport.user?.name
//                     ? `${selectedReport.user.name} - `
//                     : ""}
//                   {selectedReport.titulo}
//                 </span>
//                 <button
//                   className={styles.closeBtn}
//                   onClick={() => setShowChat(false)}
//                   title="Fechar"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className={styles.chatMessagesArea}>
//                 {messages.map((msg) => (
//                   <div key={msg.id} style={{ marginBottom: 12 }}>
//                     <strong>{msg.user?.name || "Usuário"}</strong>:{" "}
//                     {msg.mensagem}
//                     {msg.imagem && (
//                       <div>
//                         <img
//                           src={`http://localhost:8000/storage/${msg.imagem}`}
//                           alt="imagem"
//                           width={100}
//                           style={{ borderRadius: 6, marginTop: 4 }}
//                         />
//                       </div>
//                     )}
//                     <div style={{ fontSize: "0.85em", color: "#888" }}>
//                       {new Date(msg.created_at).toLocaleString()}
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>
//               <form
//                 className={styles.form}
//                 onSubmit={handleSendMessage}
//                 style={{ marginTop: 8 }}
//               >
//                 <div className={styles.chatInputRow}>
//                   <input
//                     className={styles.chatInput}
//                     type="text"
//                     id="novaMensagem"
//                     placeholder="Digite sua mensagem"
//                     value={newMessage}
//                     onChange={(e) => setNewMessage(e.target.value)}
//                   />
//                   <label
//                     className={styles.attachmentLabel}
//                     title="Anexar imagem"
//                   >
//                     <input
//                       className={styles.attachmentInput}
//                       type="file"
//                       accept="image/*"
//                       onChange={(e) => setNewImage(e.target.files[0])}
//                     />
//                     <span className={styles.attachmentIcon}>📎</span>
//                   </label>
//                   <SubmitButton text="Enviar" type="submit" />
//                 </div>
//               </form>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AllReports;
