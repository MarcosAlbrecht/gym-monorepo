// import axios from "axios";
// import { AuthResponse } from "./dtos/authResponseDto";

// export const loginUser = async (
//   usuario: string,
//   password: string
// ): Promise<AuthResponse> => {
//   const response = await axios.post<AuthResponse>(
//     "http://localhost:3001/auth",
//     {
//       usuario,
//       senha: password,
//     }
//   );
//   return response.data;
// };

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
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
        localStorage.setItem("token", data.token);
        localStorage.setItem("refresh_token", data.refresh_token);

        // Atualiza os headers da requisição original e reenvia
        error.config.headers.Authorization = `Bearer ${data.token}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("Erro ao renovar token:", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
