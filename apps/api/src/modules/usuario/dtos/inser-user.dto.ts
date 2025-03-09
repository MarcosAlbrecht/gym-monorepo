import { User } from "../entities/user";
import { CreateUserDto } from "./create-user.dto";

export class InsertUserDto {
  nome: string;
  usuario: string;
  senha: string;
  perfil: string;
  situacao: string;
  usuario_professor?: User;

  constructor(user: CreateUserDto, professor?: User) {
    this.nome = user.nome;
    this.usuario = user.usuario;
    this.senha = user.senha;
    this.perfil = user.perfil;
    this.situacao = user.situacao;
    this.usuario_professor = professor ?? null;
  }
}
