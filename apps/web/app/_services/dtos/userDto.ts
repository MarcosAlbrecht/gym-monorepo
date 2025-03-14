import { PerfilEnum } from "../enums/perfil";
import { SituacaoEnum } from "../enums/situacao";

export interface UserDto {
  id: string;
  nome: string;
  usuario: string;
  perfil: PerfilEnum;
  situacao: SituacaoEnum;
  usuario_professor?: UserDto;
}
