import { User } from "../entities/user";

export class UserDto {
  id: string;
  nome: string;
  usuario: string;
  perfil: string;
  situacao: string;
  dt_inclusao: Date;
  senha: string;

  constructor(user: User) {
    this.id = user.id;
    this.nome = user.nome;
    this.usuario = user.usuario;
    this.perfil = user.perfil;
    this.situacao = user.situacao;
    this.dt_inclusao = user.dtInclusao;
    this.senha = user.senha;
  }
}
