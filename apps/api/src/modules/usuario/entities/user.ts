import "reflect-metadata";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("usuario")
export class User {
  @PrimaryColumn({ type: "uuid", generated: "uuid" })
  id: string;

  @Column({ type: "varchar", length: 60, nullable: false })
  nome: string;

  @Column({ type: "varchar", length: 60, nullable: false })
  usuario: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  senha: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  perfil: string;

  @Column({ type: "varchar", length: 10, nullable: false })
  situacao: string;

  @CreateDateColumn({ name: "dt_inclusao" })
  dtInclusao: Date;
}
