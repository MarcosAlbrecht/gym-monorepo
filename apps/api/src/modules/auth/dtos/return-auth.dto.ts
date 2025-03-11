import { ReturnUserDto } from "../../usuario/dtos/return-user.dto";
import { User } from "../../usuario/entities/user";
import { UserToken } from "../entities/user-token";

export class ReturnAuthDto {
  token: string;
  refresh_token: string;
  user?: ReturnUserDto;

  constructor(token: string, refreshToken: UserToken, user: User) {
    this.token = token;
    this.refresh_token = refreshToken.refreshToken;
    this.user = user ? new ReturnUserDto(user) : undefined;
  }
}
