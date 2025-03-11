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
    const token = localStorage.getItem("token");
    const fetchUser = async () => {
      try {
        const { data } = await api.get<UserDto>("/logged-user"); // 🔥 Obtém dados do usuário
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
      }
    };

    fetchUser();
  }, []);

  const login = async (usuario: string, senha: string) => {
    console.log("iniciou o login");

    const { token, refresh_token, user } = await api
      .post("/auth", { usuario, senha })
      .then((res) => res.data);

    console.log(`retorno chamada: `, user);
    // Salvar tokens e dados do usuário
    storage.setToken(token);
    storage.setRefreshToken(refresh_token);
    //localStorage.setItem("refresh_token", refresh_token);
    //localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    //localStorage.removeItem("user");
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
