import { Repository } from "typeorm";
import { dataSource } from "../../database/data-source";
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

  async updateUserToken(userToken: UserToken): Promise<UserToken> {
    await this.repository.update(userToken.id, {
      refreshToken: userToken.refreshToken,
      expiracaoToken: userToken.expiracaoToken,
    });

    // Após a atualização, você pode retornar o próprio objeto de token atualizado
    return this.repository.findOneBy({ id: userToken.id });
  }
}
