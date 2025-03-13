import { PerfilEnum } from "../enums/perfil";
import { SituacaoEnum } from "../enums/situacao";

export interface ReturnUserDto {
  id: string;
  nome: string;
  usuario: string;
  perfil: PerfilEnum;
  situacao: SituacaoEnum;
  usuario_professor?: ReturnUserDto | null;
}
