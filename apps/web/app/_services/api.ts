import axios from "axios";
import { storage } from "../_utils/storage";

const api = axios.create({
  baseURL: "http://localhost:3001",
  withCredentials: true, // ✅ Envia cookies automaticamente
});

api.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const { data } = await axios.post(
          "http://localhost:3001/auth/refresh-token",
          {},
          { withCredentials: true }
        );

        // Atualiza o token e refaz a requisição
        storage.setToken(data.token);
        error.config.headers.Authorization = `Bearer ${data.token}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("Erro ao renovar token:", refreshError);
        storage.removeToken();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
