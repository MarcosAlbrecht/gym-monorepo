import { NotFoundException } from "../../exceptions/not-found-exceptions";
import { generateToken } from "../../utils/auth";
import { ValidatePassword } from "../../utils/password";
import { generateRefreshToken } from "../../utils/refresh-token";
import { UserService } from "../usuario/user.service";
import { UserTokenRepository } from "./auth.repository";
import { UserAuthDto } from "./dtos/auth-user.dto";

import { CreateUserTokenDto } from "./dtos/create-user-token.dto";
import { ReturnAuthDto } from "./dtos/return-auth.dto";

export class AuthService {
  private authRepository: UserTokenRepository;
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.authRepository = new UserTokenRepository();
  }

  async validateAuth(user: UserAuthDto): Promise<ReturnAuthDto> {
    const existingUser = await this.userService.findUserByUsuario(user.usuario);

    const isValid = await ValidatePassword(user.senha, existingUser.senha);
    if (!isValid) {
      throw new NotFoundException("Usuario nao localiado.");
    }

    const userToken: CreateUserTokenDto = {
      refreshToken: generateRefreshToken(),
      usuario: existingUser,
      expiracaoToken: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };
    const userTokenRefresh =
      await this.authRepository.createUserToken(userToken);

    return new ReturnAuthDto(generateToken(existingUser), userTokenRefresh);
  }
}
