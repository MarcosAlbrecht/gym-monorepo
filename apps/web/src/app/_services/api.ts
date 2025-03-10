import axios from "axios";

export interface LoginResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

export const loginUser = async (
  usuario: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    "http://localhost:3001/auth",
    {
      usuario,
      senha: password,
    }
  );
  return response.data;
};
