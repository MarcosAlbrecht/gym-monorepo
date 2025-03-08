import { Repository } from "typeorm";
import { dataSource } from "../../database/data-source";
import { User } from "../usuario/entities/user";
import { CreateUserTokenDto } from "./dtos/create-user-token.dto";
import { UserToken } from "./entities/user-token";

export class UserTokenRepository {
  private repository: Repository<UserToken>;
  constructor() {
    this.repository = dataSource.getRepository(UserToken);
  }

  async createUserToken(
    userTokenCreate: CreateUserTokenDto
  ): Promise<UserToken> {
    const user = this.repository.create(userTokenCreate);
    return await this.repository.save(user);
  }

  async findUserTokenByRefreshToken(refreshToken: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: { refreshToken },
      relations: {
        usuario: true,
      },
    });
    return userToken;
  }

  async findUserTokenByUserId(user: User): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      where: { usuario: { id: user.id } },
      relations: {
        usuario: true,
      },
    });
    return userToken;
  }

  async updateUserToken(userToken: CreateUserTokenDto): Promise<UserToken> {
    await this.repository.update(userToken.usuario.id, {
      refreshToken: userToken.refreshToken,
      expiracaoToken: userToken.expiracaoToken,
    });

    // Após a atualização, você pode retornar o próprio objeto de token atualizado
    const usrToken = await this.repository.findOneBy({
      usuario: { id: userToken.usuario.id },
    });
    return usrToken;
  }

  async deleteUserTokenByIdUser(userId: string): Promise<any> {
    await this.repository.delete(userId);
  }
}
