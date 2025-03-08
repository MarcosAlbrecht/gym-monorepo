import { User } from "../../usuario/entities/user";

export interface CreateUserTokenDto {
  refreshToken: string;
  usuario: User;
  expiracaoToken: Date;
}
