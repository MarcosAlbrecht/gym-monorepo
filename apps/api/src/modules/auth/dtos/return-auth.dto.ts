import { UserToken } from "../entities/user-token";

export class ReturnAuthDto {
  token: string;
  refresh_token: string;

  constructor(token: string, refreshToken: UserToken) {
    this.token = token;
    this.refresh_token = refreshToken.refreshToken;
  }
}
