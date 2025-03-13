import { Repository } from "typeorm";
import { dataSource } from "../../database/data-source";
import { PerfilEnum } from "../../enums/perfil";
import { UserAuthDto } from "../auth/dtos/user-auth.dto";
import { InsertAvaliacaoImcDto } from "./dtos/insert-avaliacao-imc.dto";
import { UpdateAvaliacaoImcDto } from "./dtos/update-avaliacao-imc.dto";
import { AvaliacaoImc } from "./entities/avaliacao-imc";

export class AvaliacaoImcRepository {
  private repository: Repository<AvaliacaoImc>;
  constructor() {
    this.repository = dataSource.getRepository(AvaliacaoImc);
  }

  async createAvaliacaoImc(
    avaliacaoCreate: InsertAvaliacaoImcDto
  ): Promise<AvaliacaoImc> {
    const avaliacao = this.repository.create(avaliacaoCreate);
    const saved = await this.repository.save(avaliacao);
    return await this.findAvaliacaoImcById(saved.id);
  }

  async findAll(
    skip: number = 0,
    limit: number = 9999999999,
    userAuth: UserAuthDto
  ): Promise<AvaliacaoImc[]> {
    const whereCondition: any = {};

    //adiciona a condição no where com base no perfil
    if (userAuth.perfil === PerfilEnum.PROFESSOR) {
      whereCondition.usuario_avaliacao = { id: userAuth.id };
    } else if (userAuth.perfil === PerfilEnum.ALUNO) {
      whereCondition.usuario_aluno = { id: userAuth.id };
    }
    const user = this.repository.find({
      skip,
      take: limit,
      where: whereCondition,
      relations: {
        usuario_aluno: true,
        usuario_avaliacao: true,
      },
      order: { dtInclusao: "DESC" },
    });
    return user;
  }

  async findAvaliacaoImcById(id: string): Promise<AvaliacaoImc> {
    const avaliacao = this.repository.findOne({
      where: { id },
      relations: { usuario_aluno: true, usuario_avaliacao: true },
    });

    return avaliacao;
  }

  async findAvaliacaoImcByUserId(id: string): Promise<AvaliacaoImc> {
    const avaliacao = this.repository.findOne({
      where: { usuario_aluno: { id } },
      relations: { usuario_aluno: true, usuario_avaliacao: true },
    });

    return avaliacao;
  }

  async updateAvaliacaoImc(
    idAvaliacao: string,
    avaliacaoCreate: UpdateAvaliacaoImcDto
  ): Promise<AvaliacaoImc> {
    await this.repository.update(idAvaliacao, avaliacaoCreate);
    return await this.findAvaliacaoImcById(idAvaliacao);
  }

  async deleteAvaliacaoImc(idAvaliacao: string): Promise<any> {
    await this.repository.delete(idAvaliacao);
  }
}
