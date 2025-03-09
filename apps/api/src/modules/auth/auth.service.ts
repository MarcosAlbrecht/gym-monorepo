import { NotFoundException } from "../../exceptions/not-found-exceptions";
import { UnauthorizedException } from "../../exceptions/unauthorized-exception";
import { generateToken } from "../../utils/auth";
import { ValidatePassword } from "../../utils/password";
import { generateRefreshToken } from "../../utils/refresh-token";
import { UserService } from "../usuario/user.service";
import { UserTokenRepository } from "./auth.repository";
import { AuthDto } from "./dtos/auth.dto";

import { CreateUserTokenDto } from "./dtos/create-user-token.dto";
import { ReturnAuthDto } from "./dtos/return-auth.dto";
import { UserToken } from "./entities/user-token";

export class AuthService {
  private authRepository: UserTokenRepository;
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
    this.authRepository = new UserTokenRepository();
  }
  //funçao para validaçao do login do usuario
  async validateAuth(user: AuthDto): Promise<ReturnAuthDto> {
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
    let userTokenRefresh = null;
    const refreshTokenExists =
      await this.authRepository.findUserTokenByUserId(existingUser);
    if (refreshTokenExists) {
      userTokenRefresh = await this.authRepository.updateUserToken(userToken);
    } else {
      userTokenRefresh = await this.authRepository.createUserToken(userToken);
    }

    return new ReturnAuthDto(generateToken(existingUser), userTokenRefresh);
  }
  //funçao para revalidaçao do token JWT
  async refreshAuth(refreshToken: string): Promise<ReturnAuthDto> {
    // Buscar o refreshToken no banco
    const [, token] = refreshToken.split(" ");
    const existingUserToken =
      await this.authRepository.findUserTokenByRefreshToken(token);

    if (!existingUserToken) {
      throw new UnauthorizedException();
    }

    if (this.verifyRefreshTokenIsValid(existingUserToken.expiracaoToken)) {
      // Ainda é válido, gerar apenas um novo accessToken
      const accessToken = generateToken(existingUserToken.usuario);
      return new ReturnAuthDto(accessToken, existingUserToken);
    } else {
      // Expirou, gerar um novo refreshToken e accessToken
      const novoRefreshToken = generateRefreshToken();
      const novaExpiracao = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 dias

      existingUserToken.refreshToken = novoRefreshToken;
      existingUserToken.expiracaoToken = novaExpiracao;

      await this.authRepository.updateUserToken(existingUserToken); // Atualiza no banco

      const novoAccessToken = generateToken(existingUserToken.usuario);
      return new ReturnAuthDto(novoAccessToken, existingUserToken);
    }
  }

  async findUserTokenByRefreshToken(refreshToken: string): Promise<UserToken> {
    return await this.authRepository.findUserTokenByRefreshToken(refreshToken);
  }

  async deleteUserTokenByIdUser(idUsuario: string): Promise<any> {
    const user = await this.userService.findUserById(idUsuario);
    if (!user) {
      return new NotFoundException("Usuário náo localizado");
    }
    return this.authRepository.deleteUserTokenByIdUser(user.id);
  }

  private verifyRefreshTokenIsValid(expiraToken: Date): boolean {
    const now = new Date();
    const expiracaoToken = new Date(expiraToken);
    return expiracaoToken > now;
  }
}
