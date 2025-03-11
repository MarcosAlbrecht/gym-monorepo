export interface UserDto {
  id: string;
  nome: string;
  usuario: string;
  perfil: string;
  situacao: string;
  usuario_professor?: UserDto;
}
