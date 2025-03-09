import axios from "axios";

// Criar uma instância do Axios
const api = axios.create({
  baseURL: "http://localhost:3001",
});

// Intercepta erros 401 para tentar renovar o token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refreshToken"); // Pegando do localStorage ou AsyncStorage
        if (!refreshToken) {
          window.location.href = "/login"; // Se não tiver refresh token, redireciona para login
          return Promise.reject(error);
        }

        // Tentar renovar o token
        const { data } = await axios.post(
          "http://localhost:3001/auth/refresh",
          { refreshToken }
        );

        // Atualiza o novo token nos headers do Axios
        api.defaults.headers["Authorization"] = `Bearer ${data.accessToken}`;

        // Reenvia a requisição original com o novo token
        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        window.location.href = "/auth"; // Se falhar, redireciona para login
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
