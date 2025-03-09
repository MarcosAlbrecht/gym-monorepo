import { ImcClassificacaoEnum } from "../../../enums/classificacao-imc";

export function calcularIMC(
  peso: number,
  altura: number
): { imc: number; classificacao: ImcClassificacaoEnum } {
  if (peso <= 0 || altura <= 0) {
    throw new Error("Peso e altura devem ser valores positivos.");
  }

  const imc = parseFloat((peso / (altura * altura)).toFixed(2)); // Calcula e formata para 2 casas decimais

  let classificacao: ImcClassificacaoEnum;

  if (imc < 18.5) {
    classificacao = ImcClassificacaoEnum.ABAIXO_DO_PESO;
  } else if (imc < 25) {
    classificacao = ImcClassificacaoEnum.PESO_NORMAL;
  } else if (imc < 30) {
    classificacao = ImcClassificacaoEnum.SOBREPESO;
  } else if (imc < 35) {
    classificacao = ImcClassificacaoEnum.OBESIDADE_GRAU_I;
  } else if (imc < 40) {
    classificacao = ImcClassificacaoEnum.OBESIDADE_GRAU_II;
  } else {
    classificacao = ImcClassificacaoEnum.OBESIDADE_GRAU_III;
  }

  return { imc, classificacao };
}
