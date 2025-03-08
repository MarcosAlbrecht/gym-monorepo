export class ReturnAuthDto {
  token: string;
  refresh_token: string;

  constructor(token: string, refreshToken: string) {
    this.token = token;
    this.refresh_token = refreshToken;
  }
}
