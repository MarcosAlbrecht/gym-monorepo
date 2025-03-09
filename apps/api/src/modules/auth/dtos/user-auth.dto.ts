import { PerfilEnum } from "../../../enums/perfil";

export interface UserAuthDto {
  id: string;
  nome: string;
  usuario: string;
  perfil: PerfilEnum;
}
