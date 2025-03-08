import { Repository } from "typeorm";
import { dataSource } from "../../database/data-source";

import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entities/user";

export class UsuarioRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async createUser(userCreate: CreateUserDto): Promise<User> {
    const user = this.repository.create(userCreate);
    return await this.repository.save(user);
  }

  async findAll(): Promise<User[]> {
    const user = this.repository.find();
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = this.repository.findOne({ where: { id } });
    return user;
  }
}
