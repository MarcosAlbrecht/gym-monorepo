import { UserToken } from "../entities/user-token";

export interface CreateUserTokenDto {
  refreshToken: string;
  id_usuario: UserToken;
  expiracao_token: Date;
}
