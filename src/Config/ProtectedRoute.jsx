import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider"; // Importa o contexto de autenticação

const ProtectedRoute = ({ children }) => {
  // const { token } = useAuthContext(); // Verifica se o token está definido

  // // Se não houver token, redireciona para a página de login
  // if (!token) {
  //   return <Navigate to="/login" replace />;
  // }

  // Se houver token, permite o acesso à página
  return children;
};

export default ProtectedRoute;
