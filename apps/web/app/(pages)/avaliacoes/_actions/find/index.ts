import api from "@/app/_services/api";
import { ReturnAvaliacaoDto } from "@/app/_services/dtos/return-avaliacao-imc.dto";

export async function findAvaliacoes(): Promise<ReturnAvaliacaoDto[]> {
  try {
    const response = await api.get("/avaliacao?skip=0&limit=10"); // Usando a instância do Axios
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return [];
  }
}
