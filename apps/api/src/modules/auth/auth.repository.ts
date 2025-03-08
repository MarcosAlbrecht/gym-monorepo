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
}
