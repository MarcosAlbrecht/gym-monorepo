import { ImcClassificacaoEnum } from "../enums/classificacao-imc";
import { ReturnUserDto } from "./return-user.dto";

export interface ReturnAvaliacaoDto {
  id: string;
  altura: number;
  peso: number;
  imc: number;
  classificacao: ImcClassificacaoEnum;
  usuario_avaliacao: ReturnUserDto;
  usuario_aluno: ReturnUserDto;
}
