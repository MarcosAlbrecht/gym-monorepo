import { Request } from "express";
import { PerfilEnum } from "../../enums/perfil";
import { NotFoundException } from "../../exceptions/not-found-exceptions";
import { getUserByToken } from "../../utils/auth";
import { CreatePasswordHashed } from "../../utils/password";
import { CreateUserDto } from "./dtos/create-user.dto";
import { InsertUserDto } from "./dtos/inser-user.dto";
import { InsertUpdateUserDto } from "./dtos/insert-update-user.dto";
import { ReturnCreateUserDto } from "./dtos/return-create-user.dto";
import { ReturnUserDto } from "./dtos/return-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
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

    const typeUser = user.perfil;
    var professor = null;
    if (typeUser === PerfilEnum.ALUNO) {
      professor = await this.userRepository.findUserById(user.id_professor);
      if (!professor) {
        throw new NotFoundException("Professor não localizado.");
      }
      user.id_professor = professor.id;
    } else {
      user.id_professor = null;
    }
    const inertUser = new InsertUserDto(user, professor);
    const createdUser = await this.userRepository.createUser(inertUser);

    return new ReturnCreateUserDto(createdUser);
  }

  async findAll(req: Request): Promise<ReturnUserDto[]> {
    const { skip, limit } = req.query;
    const userAuth = await getUserByToken(req);
    const users = await this.userRepository.findAll(
      Number(skip),
      Number(limit),
      userAuth
    );

    return users.map((user) => new ReturnUserDto(user));
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException("Usuário não localizado");
    }

    return user;
  }

  async findLoggedUser(req: Request): Promise<User> {
    const { id } = await getUserByToken(req);
    const user = await this.userRepository.findUserById(id);

    if (!user) {
      throw new NotFoundException("Usuário não localizado");
    }

    return user;
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

  async findUsersByIdUsuarioProfessor(req: Request): Promise<ReturnUserDto[]> {
    const { skip, limit } = req.query;
    const { idProfessor } = req.params;
    const professor =
      await this.userRepository.findUserByIdProfessor(idProfessor);

    if (!professor) {
      throw new NotFoundException("Professor não localizado");
    }
    const users = await this.userRepository.findUsersByIdUsuarioProfessor(
      Number(skip),
      Number(limit),
      professor
    );

    return users.map((user) => new ReturnUserDto(user));
  }

  async updateUserById(
    req: Request,
    userBody: UpdateUserDto
  ): Promise<ReturnUserDto> {
    const { id } = req.params;

    // Verifica se o usuário existe
    const userExists = await this.userRepository.findUserById(id);
    if (!userExists) {
      throw new NotFoundException("Usuário não localizado");
    }

    // Obtém o professor, se necessário
    const professorExists = await this.getProfessorIfNecessary(
      userExists,
      userBody
    );

    // Cria DTO de atualização
    const createUpdateUser = new InsertUpdateUserDto(userBody, professorExists);

    // Atualiza o usuário
    const updatedUser = await this.userRepository.updateUserById(
      userExists.id,
      createUpdateUser
    );

    // Retorna DTO formatado
    return new ReturnUserDto(updatedUser);
  }

  async deleteUserById(req: Request): Promise<ReturnCreateUserDto> {
    const { id } = req.params;
    return await this.userRepository.deleteUserById(id);
  }

  // Função auxiliar para buscar professor se necessário
  private async getProfessorIfNecessary(
    user: User,
    userBody: UpdateUserDto
  ): Promise<User | null> {
    if (user.perfil !== PerfilEnum.ALUNO) return null;

    const professorId = userBody.id_professor || user.usuario_professor?.id;
    return professorId ? this.userRepository.findUserById(professorId) : null;
  }
}
