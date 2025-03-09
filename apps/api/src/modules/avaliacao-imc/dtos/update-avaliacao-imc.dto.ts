import { ImcClassificacaoEnum } from "../../../enums/classificacao-imc";
import { CreateAvaliacaoImcDto } from "./create-avaliacao-imc.dto";

export class UpdateAvaliacaoImcDto {
  altura: number;
  peso: number;
  imc: number;
  classificacao: ImcClassificacaoEnum;

  constructor(
    avaliacao: CreateAvaliacaoImcDto,
    imc: { imc: number; classificacao: ImcClassificacaoEnum }
  ) {
    this.altura = avaliacao.altura;
    this.peso = avaliacao.peso;
    this.imc = imc.imc;
    this.classificacao = imc.classificacao;
  }
}
