import { User } from "../entities/user";
import { UpdateUserDto } from "./update-user.dto";

export class InsertUpdateUserDto {
  nome: string;
  usuario: string;
  perfil: string;
  situacao: string;
  usuario_professor?: User;

  constructor(user: UpdateUserDto, professor?: User) {
    this.nome = user.nome;
    this.usuario = user.usuario;
    this.perfil = user.perfil;
    this.situacao = user.situacao;
    this.usuario_professor = professor ?? null;
  }
}
