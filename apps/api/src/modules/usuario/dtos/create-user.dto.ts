export interface CreateUserDto {
  nome: string;
  usuario: string;
  senha: string;
  perfil: string;
  situacao: string;
  id_professor?: string;
}
