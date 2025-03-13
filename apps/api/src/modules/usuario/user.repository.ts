import { Repository } from "typeorm";
import { dataSource } from "../../database/data-source";

import { PerfilEnum } from "../../enums/perfil";
import { UserAuthDto } from "../auth/dtos/user-auth.dto";
import { CreateUserDto } from "./dtos/create-user.dto";
import { InsertUpdateUserDto } from "./dtos/insert-update-user.dto";
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

  async findAll(
    skip: number = 0,
    limit: number = 9999999999,
    userAuth: UserAuthDto,
    perfil?: PerfilEnum
  ): Promise<User[]> {
    const whereCondition: any = {};

    // Se o usuário autenticado for um professor, filtrar pelo ID do professor
    if (userAuth.perfil === PerfilEnum.PROFESSOR) {
      whereCondition.usuario_professor = { id: userAuth.id };
    }

    // Se o perfil foi passado como parâmetro, adiciona no filtro
    if (perfil) {
      whereCondition.perfil = perfil;
    }
    const user = this.repository.find({
      skip,
      take: limit,
      where: whereCondition,
      relations: {
        usuario_professor: true,
      },
    });
    return user;
  }

  async findUserById(id: string): Promise<User> {
    const user = this.repository.findOne({
      where: { id },
      relations: { usuario_professor: true },
    });
    return user;
  }

  async findUserByIdProfessor(id: string): Promise<User> {
    const user = this.repository.findOne({
      where: { usuario_professor: { id } },
    });
    return user;
  }

  async findUserByUsuario(usuario: string): Promise<User> {
    const user = this.repository.findOne({ where: { usuario } });
    return user;
  }

  async findUserByNomeAndUsuario(nome: string, usuario: string): Promise<User> {
    const user = this.repository.findOne({ where: { nome, usuario } });
    return user;
  }

  async findUserByUsuarioAndPassword(
    usuario: string,
    senha: string
  ): Promise<User> {
    const user = this.repository.findOne({ where: { usuario, senha } });
    return user;
  }

  async findUsersByIdUsuarioProfessor(
    skip: number = 0,
    limit: number = 9999999999,
    usuarioProfessor: User
  ): Promise<User[]> {
    const user = this.repository.find({
      skip,
      take: limit,
      where: { usuario_professor: usuarioProfessor },
      relations: { usuario_professor: true },
    });
    return user;
  }

  async updateUserById(id: string, user: InsertUpdateUserDto): Promise<User> {
    await this.repository.update(id, user);

    // Após a atualização, você pode retornar o próprio objeto de token atualizado
    const usrToken = await this.repository.findOne({
      where: { id },
      relations: {
        usuario_professor: true,
      },
    });
    return usrToken;
  }

  async deleteUserById(id: string): Promise<any> {
    return await this.repository.delete({ id });
  }
}
