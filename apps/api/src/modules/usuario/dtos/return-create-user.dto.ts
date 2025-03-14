import { User } from "../entities/user";

export class ReturnCreateUserDto {
  id: string;
  nome: string;
  usuario: string;
  perfil: string;
  situacao: string;

  constructor(user: User) {
    this.id = user.id;
    this.nome = user.nome;
    this.usuario = user.usuario;
    this.perfil = user.perfil;
    this.situacao = user.situacao;
  }
}
