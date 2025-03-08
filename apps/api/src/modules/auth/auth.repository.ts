import { Repository } from "typeorm";
import { dataSource } from "../../database/data-source";
import { CreateUserTokenDto } from "./dtos/create-user-token.dto";
import { UserToken } from "./entities/user-token";

export class UsuarioTokenRepository {
  private repository: Repository<UserToken>;
  constructor() {
    this.repository = dataSource.getRepository(UserToken);
  }

  async createUser(userTokenCreate: CreateUserTokenDto): Promise<UserToken> {
    const user = this.repository.create(userTokenCreate);
    return await this.repository.save(user);
  }
}
