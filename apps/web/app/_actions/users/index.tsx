import api from "@/app/_services/api";
import { ReturnUserDto } from "@/app/_services/dtos/return-user.dto";

export async function findUsers(): Promise<ReturnUserDto[]> {
  try {
    //pode ser usado com paginaçao, realizar o tratamento
    const response = await api.get("/users?skip=0&limit=99999"); // Usando a instância do Axios
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return [];
  }
}

export const deleteUser = async (idAvaliacao: string) => {
  await api.delete(`/users/${idAvaliacao}`);
};
