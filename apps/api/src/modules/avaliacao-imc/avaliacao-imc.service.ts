import { Request } from "express";
import { NotFoundException } from "../../exceptions/not-found-exceptions";
import { getUserByToken } from "../../utils/auth";
import { UserService } from "../usuario/user.service";
import { AvaliacaoImcRepository } from "./avaliacao-imc.repository";
import { InsertAvaliacaoImcDto } from "./dtos/insert-avaliacao-imc.dto";
import { ReturnAvaliacaoDto } from "./dtos/return-avaliacao-imc.dto";
import { UpdateAvaliacaoImcDto } from "./dtos/update-avaliacao-imc.dto";
import { calcularIMC } from "./functions/calcular-imc";
export class AvaliacaoImcService {
  private avaliacaoImcRepository: AvaliacaoImcRepository;
  private userService: UserService;

  constructor() {
    this.avaliacaoImcRepository = new AvaliacaoImcRepository();
    this.userService = new UserService();
  }

  async createAvaliacaoImc(req: Request): Promise<any> {
    const { altura, peso } = req.body;
    const { idAvaliacao } = req.params;
    const authorization = req.headers.authorization;
    const userAuth = await getUserByToken(req);
    const resultadoImc = calcularIMC(peso, altura);

    const userProfessor = await this.userService.findUserById(userAuth.id);
    if (!userProfessor) {
      throw new NotFoundException("Professor não localizado.");
    }
    const userAluno = await this.userService.findUserById(idAvaliacao);
    if (!userAluno) {
      throw new NotFoundException("Aluno não localizado.");
    }

    const insertAavaliacao = new InsertAvaliacaoImcDto(
      req.body,
      resultadoImc,
      userProfessor,
      userAluno
    );

    const resultInsert =
      await this.avaliacaoImcRepository.createAvaliacaoImc(insertAavaliacao);

    return new ReturnAvaliacaoDto(resultInsert);
  }

  async findAll(req: Request): Promise<ReturnAvaliacaoDto[]> {
    const { skip, limit } = req.query;
    const userAuth = await getUserByToken(req);

    const result = await this.avaliacaoImcRepository.findAll(
      Number(skip),
      Number(limit),
      userAuth
    );

    return result.map((ava) => new ReturnAvaliacaoDto(ava));
  }

  async findAvaliacaoImcById(req: Request): Promise<ReturnAvaliacaoDto> {
    const { idAvaliacao } = req.params;

    const result =
      await this.avaliacaoImcRepository.findAvaliacaoImcById(idAvaliacao);

    return new ReturnAvaliacaoDto(result);
  }

  async findAvaliacaoImcByUserId(req: Request): Promise<ReturnAvaliacaoDto> {
    const { idAvaliacao } = req.params;

    const result =
      await this.avaliacaoImcRepository.findAvaliacaoImcByUserId(idAvaliacao);

    return new ReturnAvaliacaoDto(result);
  }

  async updateAvaliacaoImc(req: Request): Promise<ReturnAvaliacaoDto> {
    const { altura, peso } = req.body;
    const { idAvaliacao } = req.params;

    const resultadoImc = calcularIMC(peso, altura);

    const update = new UpdateAvaliacaoImcDto(req.body, resultadoImc);

    const resultInsert = await this.avaliacaoImcRepository.updateAvaliacaoImc(
      idAvaliacao,
      update
    );

    return new ReturnAvaliacaoDto(resultInsert);
  }

  async deleteAvaliacaoImc(req: Request): Promise<any> {
    const { idAvaliacao } = req.params;

    const resultInsert =
      await this.avaliacaoImcRepository.deleteAvaliacaoImc(idAvaliacao);
  }
}
