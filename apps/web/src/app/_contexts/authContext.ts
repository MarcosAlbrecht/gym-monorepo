import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../_services/api";

interface AuthContextData {
  user: any;
  signIn: (credentials: SignInData) => Promise<void>;
  signOut: () => void;
}

interface SignInData {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextData | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      api.get("/me").then(({ data }) => setUser(data));
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    const { data } = await api.post("/auth/login", { email, password });

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    api.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;
    setUser(data.user);
  }

  function signOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    window.location.href = "/login";
  }

  return children;
}
