import { ReturnUserDto } from "../../usuario/dtos/return-user.dto";
import { User } from "../../usuario/entities/user";

export class ReturnAuthDto {
  token: string;
  refresh_token: string;
  user?: ReturnUserDto;

  constructor(token: string, user: User) {
    this.token = token;
    this.user = user ? new ReturnUserDto(user) : undefined;
  }
}
