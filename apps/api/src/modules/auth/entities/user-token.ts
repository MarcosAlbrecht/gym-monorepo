import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "../../usuario/entities/user";

@Entity("usuario_token")
export class UserToken {
  @PrimaryColumn({ type: "uuid", generated: "uuid", nullable: false })
  id: string;

  @Column({
    name: "refresh_token",
    type: "varchar",
    length: 255,
    nullable: false,
  })
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn({ name: "id_usuario" })
  usuario: User;

  @CreateDateColumn({
    name: "expiracao_token",
    type: "datetime",
    nullable: false,
  })
  expiracaoToken: string;

  @CreateDateColumn({
    name: "dt_inclusao",
    type: "datetime",
    default: () => "CURRENT_TIMESTAMP",
  })
  dtInclusao: Date;
}
