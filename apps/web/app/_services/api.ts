import axios from "axios";
import { storage } from "../_utils/storage";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use((config) => {
  const token = storage.getToken();
  console.log(`obteve o token: `, token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erro 401 e renovar token automaticamente
api.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    if (error.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) throw new Error("Refresh token ausente");

        const { data } = await axios.post(
          "http://localhost:3001/auth/refresh",
          {
            refreshToken,
          }
        );

        // Atualiza os tokens
        storage.setToken(data.token);
        storage.setRefreshToken(data.refresh_token);

        // Atualiza os headers da requisição original e reenvia
        error.config.headers.Authorization = `Bearer ${data.token}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("Erro ao renovar token:", refreshError);

        storage.removeToken();
        storage.removeRefreshToken();

        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
