import { User } from "../entities/user";

export class ReturnUserDto {
  id: string;
  nome: string;
  usuario: string;
  perfil: string;
  situacao: string;
  dt_inclusao: Date;

  constructor(user: User) {
    this.id = user.id;
    this.nome = user.nome;
    this.usuario = user.usuario;
    this.perfil = user.perfil;
    this.situacao = user.situacao;
    this.dt_inclusao = user.dtInclusao;
  }
}
