"use client";
import { createContext, useEffect, useState } from "react";
import Loading from "../_components/loading";
import api from "../_services/api";
import { UserDto } from "../_services/dtos/userDto";
import { storage } from "../_utils/storage";

interface AuthContextData {
  user: UserDto | null;
  login: (usuario: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  token?: string;
}

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDto | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  useEffect(() => {
    const token = storage.getToken(); // Pega o token de forma segura

    if (!token) {
      setIsLoading(false);
      return;
    } // Se não houver token, não busca o usuário

    const fetchUser = async () => {
      try {
        const { data } = await api.get<UserDto>("/users/logged");
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
        logout(); // Remove token inválido automaticamente
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (usuario: string, senha: string) => {
    try {
      const { token, user } = await api
        .post("/auth", { usuario, senha })
        .then((res) => res.data);
      console.log("dados retornados: ", user);
      console.log("dados retornados: ", token);
      storage.setToken(token);
      setToken(token);
      setUser(user);
    } catch (error) {
      console.error("Erro ao realizar login", error);
      throw new Error("Usuário ou senha inválidos");
    }
  };

  const logout = () => {
    storage.removeToken();
    setUser(null);
    window.location.href = "/login"; // Redireciona para login
  };

  if (isLoading) {
    return <Loading />; // Exibe uma tela de carregamento
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
