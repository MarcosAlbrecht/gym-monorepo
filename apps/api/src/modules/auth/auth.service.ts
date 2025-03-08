import { NotFoundException } from "../../exceptions/not-found-exceptions";
import { generateToken } from "../../utils/auth";
import { CreatePasswordHashed } from "../../utils/password";
import { UserService } from "../usuario/user.service";
import { UserAuth } from "./dtos/auth-user.dto";
import { ReturnAuthDto } from "./dtos/return-auth.dto";

export class AuthService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async validateAuth(user: UserAuth): Promise<ReturnAuthDto> {
    const hashedPwd = await CreatePasswordHashed(user.senha);
    user.senha = hashedPwd;

    const existingUser = await this.userService.findUserByUsuarioAndassword(
      user.usuario,
      user.usuario
    );
    if (existingUser) {
      throw new NotFoundException("Usuario nao localiado.");
    }

    return new ReturnAuthDto(generateToken(existingUser));
  }
}
