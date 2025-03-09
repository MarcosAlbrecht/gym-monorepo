import { ImcClassificacaoEnum } from "../../../enums/classificacao-imc";
import { ReturnUserDto } from "../../usuario/dtos/return-user.dto";
import { AvaliacaoImc } from "../entities/avaliacao-imc";

export class ReturnAvaliacaoDto {
  id: string;
  altura: number;
  peso: number;
  imc: number;
  classificacao: ImcClassificacaoEnum;
  usuario_avaliacao: ReturnUserDto;
  usuario_aluno: ReturnUserDto;

  constructor(avaliacao: AvaliacaoImc) {
    this.id = avaliacao.id;
    this.altura = avaliacao.altura;
    this.peso = avaliacao.peso;
    this.imc = avaliacao.imc;
    this.classificacao = avaliacao.classificacao;
    this.usuario_avaliacao = new ReturnUserDto(avaliacao.usuario_avaliacao);
    this.usuario_aluno = new ReturnUserDto(avaliacao.usuario_aluno);
  }
}
