import "reflect-metadata";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { ImcClassificacaoEnum } from "../../../enums/classificacao-imc";
import { User } from "../../usuario/entities/user";

@Entity("avaliacao_imc")
export class AvaliacaoImc {
  @PrimaryColumn({ type: "uuid", generated: "uuid" })
  id: string;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  altura: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  peso: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  imc: number;

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
    enum: ImcClassificacaoEnum,
  })
  classificacao: ImcClassificacaoEnum;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_usuario_avaliacao" })
  usuario_avaliacao: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "id_usuario_aluno" })
  usuario_aluno: User;

  @CreateDateColumn({
    name: "dt_inclusao",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  dtInclusao: Date;
}
