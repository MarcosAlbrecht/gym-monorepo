import { NotFoundException } from "../../exceptions/not-found-exceptions";
import { CreatePasswordHashed } from "../../utils/password";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ReturnCreateUserDto } from "./dtos/return-create-user.dto";
import { ReturnUserDto } from "./dtos/return-user.dto";
import { User } from "./entities/user";
import { UsuarioRepository } from "./user.repository";

export class UserService {
  private userRepository: UsuarioRepository;

  constructor() {
    this.userRepository = new UsuarioRepository();
  }

  async createUser(user: CreateUserDto): Promise<ReturnCreateUserDto> {
    const hashedPwd = await CreatePasswordHashed(user.senha);
    user.senha = hashedPwd;

    const existingUser = await this.userRepository.findUserByNomeAndUsuario(
      user.nome,
      user.usuario
    );
    if (existingUser) {
      throw new NotFoundException("Usuario já registrado.");
    }
    const createdUser = await this.userRepository.createUser(user);

    return new ReturnCreateUserDto(createdUser);
  }

  async findAll(): Promise<ReturnUserDto[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => new ReturnUserDto(user));
  }

  async findUserById(id: string): Promise<ReturnUserDto> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException("Usuário não localizado");
    }

    return new ReturnUserDto(user);
  }

  async findUserByUsuarioAndPassword(
    usuario: string,
    senha: string
  ): Promise<ReturnUserDto> {
    const user = await this.userRepository.findUserByUsuarioAndPassword(
      usuario,
      senha
    );

    if (!user) {
      throw new NotFoundException("Usuário não localizado");
    }

    return new ReturnUserDto(user);
  }

  async findUserByUsuario(usuario: string): Promise<User> {
    const user = await this.userRepository.findUserByUsuario(usuario);

    if (!user) {
      throw new NotFoundException("Usuário não localizado");
    }

    return user;
  }
}
