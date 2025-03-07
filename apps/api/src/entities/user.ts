import { Column, Entity, PrimaryColumn } from "typeorm";
import { PerfilEnum } from "../../../enums/perfil";
import { SituacaoEnum } from "../../../enums/situacao";

@Entity("usuario")
export class User {
  @PrimaryColumn({ type: "uuid", generated: "uuid" })
  id: string;

  @Column({ length: 60, nullable: false })
  nome: string;

  @Column({ length: 60, nullable: false })
  usuario: string;

  @Column({ length: 255, nullable: false })
  senha: string;

  @Column({ length: 20, nullable: false, enum: PerfilEnum })
  perfil: string;

  @Column({ length: 10, nullable: false, enum: SituacaoEnum })
  siatuacao: string;

  @Column({ name: "dt_inclusao", default: () => "CURRENT_TIMESTAMP" })
  dtInclusao: Date;
}
