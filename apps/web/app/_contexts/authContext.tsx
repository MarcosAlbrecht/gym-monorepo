"use client";
import { createContext, useEffect, useState } from "react";
import api from "../_services/api";
import { UserDto } from "../_services/dtos/userDto";
import { storage } from "../_utils/storage";

interface AuthContextData {
  user: UserDto | null;
  login: (usuario: string, senha: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextData | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    const token = storage.getToken(); // Pega o token de forma segura

    if (!token) return; // Se não houver token, não busca o usuário

    const fetchUser = async () => {
      try {
        const { data } = await api.get<UserDto>("/users/logged");
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
        logout(); // Remove token inválido automaticamente
      }
    };

    fetchUser();
  }, []);

  const login = async (usuario: string, senha: string) => {
    try {
      const { token, refresh_token, user } = await api
        .post("/auth", { usuario, senha })
        .then((res) => res.data);

      storage.setToken(token);
      storage.setRefreshToken(refresh_token);

      setUser(user);
    } catch (error) {
      console.error("Erro ao realizar login", error);
      throw new Error("Usuário ou senha inválidos");
    }
  };

  const logout = () => {
    storage.removeToken();
    storage.removeRefreshToken();
    setUser(null);
    window.location.href = "/login"; // Redireciona para login
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
