"use server";
import api from "@/app/_services/api";
import { ReturnAvaliacaoDto } from "@/app/_services/dtos/return-avaliacao-imc.dto";
import { ReturnUserDto } from "@/app/_services/dtos/return-user.dto";
import { UserDto } from "@/app/_services/dtos/userDto";
import { PerfilEnum } from "@/app/_services/enums/perfil";

interface UpsertAvaliacao {
  altura: number;
  peso: number;
  user: UserDto;
  avaliacao?: ReturnAvaliacaoDto;
  idAluno?: string;
}

export const upsertAvaliacao = async (params: UpsertAvaliacao) => {
  if (params.avaliacao) {
    await api.put(`/avaliacao/${params.avaliacao.id}`, {
      altura: params.altura,
      peso: params.peso,
    });
  } else {
    await api.post(`/avaliacao/${params.idAluno!}`, {
      altura: params.altura,
      peso: params.peso,
    });
  }
};

export const deleteAvaliacao = async (idAvaliacao: string) => {
  await api.delete(`/avaliacao/${idAvaliacao}`);
};

export async function findAvaliacoes(): Promise<ReturnAvaliacaoDto[]> {
  try {
    //pode ser usado com paginaçao, realizar o tratamento
    const response = await api.get("/avaliacao?skip=0&limit=99999"); // Usando a instância do Axios
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return [];
  }
}

export async function findAlunos(): Promise<ReturnUserDto[]> {
  try {
    console.log("buscando usuarios");
    const response = await api.get(
      `/users?skip=0&limit=10&perfil=${PerfilEnum.ALUNO}`
    ); // Usando a instância do Axios

    return response.data;
  } catch (error) {
    console.error("Erro ao buscar avaliações:", error);
    return [];
  }
}
