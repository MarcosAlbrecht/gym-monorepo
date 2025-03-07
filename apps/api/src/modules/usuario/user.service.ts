import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./entities/user";
import { UsuarioRepository } from "./user.repository";

export class UserService {
  private userRepository: UsuarioRepository;

  constructor() {
    this.userRepository = new UsuarioRepository();
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.createUser(user);
    // if (existingUser) {
    //   throw new Error("Email já registrado.");
    // }
    return existingUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
