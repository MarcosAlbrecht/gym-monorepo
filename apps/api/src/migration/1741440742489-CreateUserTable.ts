import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1741440742489 implements MigrationInterface {
    name = 'CreateUserTable1741440742489'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "usuario" varchar(60) NOT NULL, "senha" varchar(255) NOT NULL, "perfil" varchar CHECK( "perfil" IN ('admin','aluno','professor') ) NOT NULL, "situacao" varchar CHECK( "situacao" IN ('ativo','inativo') ) NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
