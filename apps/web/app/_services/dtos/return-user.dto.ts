export interface ReturnUserDto {
  id: string;
  nome: string;
  usuario: string;
  perfil: string;
  situacao: string;
  usuario_professor?: ReturnUserDto | null;
}
