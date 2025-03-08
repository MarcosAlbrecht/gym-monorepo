import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1741444702244 implements MigrationInterface {
    name = 'CreateUserTable1741444702244'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "usuario" varchar(60) NOT NULL, "senha" varchar(255) NOT NULL, "perfil" varchar CHECK( "perfil" IN ('admin','aluno','professor') ) NOT NULL, "situacao" varchar CHECK( "situacao" IN ('ativo','inativo') ) NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_usuario"("id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao") SELECT "id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao" FROM "usuario"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario" RENAME TO "usuario"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" RENAME TO "temporary_usuario"`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "usuario" varchar(60) NOT NULL, "senha" varchar(255) NOT NULL, "perfil" varchar CHECK( "perfil" IN ('admin','aluno','professor') ) NOT NULL, "situacao" varchar CHECK( "situacao" IN ('ativo','inativo') ) NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "usuario"("id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao") SELECT "id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao" FROM "temporary_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario"`);
    }

}
