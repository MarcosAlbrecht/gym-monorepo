import { ImcClassificacaoEnum } from "../../../enums/classificacao-imc";
import { User } from "../../usuario/entities/user";
import { CreateAvaliacaoImcDto } from "./create-avaliacao-imc.dto";

export class InsertAvaliacaoImcDto {
  altura: number;
  peso: number;
  imc: number;
  classificacao: ImcClassificacaoEnum;
  usuario_avaliacao: User;
  usuario_aluno: User;

  constructor(
    avaliacao: CreateAvaliacaoImcDto,
    imc: { imc: number; classificacao: ImcClassificacaoEnum },
    professor: User,
    aluno: User
  ) {
    this.altura = avaliacao.altura;
    this.peso = avaliacao.peso;
    this.imc = imc.imc;
    this.classificacao = imc.classificacao;
    this.usuario_avaliacao = professor;
    this.usuario_aluno = aluno;
  }
}
