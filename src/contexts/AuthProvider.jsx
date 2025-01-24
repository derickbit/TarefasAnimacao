import { createContext, useState, useContext, useEffect } from "react";
import axiosClient from "../utils/axios_client";

const AuthContext = createContext({
  user: {},
  token: null,
  setUser: () => {},
  setToken: () => {},
  verifyLogin: () => {},
});

const verifyUser = async () => {
  try {
    const { data } = await axiosClient.get("/user");
    if (data) {
      localStorage.setItem("CURRENT_USER", JSON.stringify(data));
    }
    return data;
  } catch (error) {
    clearAuthStorages();
    console.error("Token inválido", error);
    return null;
  }
};

const verifyToken = () => {
  try {
    return localStorage.getItem("ACCESS_TOKEN");
  } catch (error) {
    console.error("Erro ao verificar token", error);
    clearAuthStorages();
    return null;
  }
};

const clearAuthStorages = () => {
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("CURRENT_USER");
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(verifyToken());

  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", newToken);
    } else {
      clearAuthStorages();
      setUser(null); // Limpar o usuário quando o token for removido
    }
  };

  const verifyLogin = async () => {
    const currentUser = await verifyUser();
    const currentToken = verifyToken();
    setUser(currentUser);
    return currentUser && currentToken;
  };

  useEffect(() => {
    if (token) {
      verifyUser().then(setUser).catch(console.error); // Chama a verificação do usuário ao carregar o componente
    } else {
      clearAuthStorages(); // Caso não haja token, limpa os dados
    }
  }, [token]); // Atualiza o estado do usuário apenas quando o token mudar

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, setToken, verifyLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
