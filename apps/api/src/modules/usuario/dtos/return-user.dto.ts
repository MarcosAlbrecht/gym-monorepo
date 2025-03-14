import { User } from "../entities/user";

export class ReturnUserDto {
  id: string;
  nome: string;
  usuario: string;
  perfil: string;
  situacao: string;
  usuario_professor?: ReturnUserDto | null;

  constructor(user: User) {
    this.id = user.id;
    this.nome = user.nome;
    this.usuario = user.usuario;
    this.perfil = user.perfil;
    this.situacao = user.situacao;
    this.usuario_professor = user.usuario_professor
      ? new ReturnUserDto(user.usuario_professor) // Usar o professor real
      : null;
  }
}
