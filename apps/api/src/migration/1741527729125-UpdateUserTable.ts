import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1741527729125 implements MigrationInterface {
    name = 'UpdateUserTable1741527729125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "usuario" varchar(60) NOT NULL, "senha" varchar(255) NOT NULL, "perfil" varchar CHECK( "perfil" IN ('admin','aluno','professor') ) NOT NULL, "situacao" varchar CHECK( "situacao" IN ('ativo','inativo') ) NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id_usuario_professor" varchar, CONSTRAINT "FK_344bba6d8632a5acb79b71e78f4" FOREIGN KEY ("id_usuario_professor") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_usuario"("id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao", "id_usuario_professor") SELECT "id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao", "id_usuario_professor" FROM "usuario"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario" RENAME TO "usuario"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario" RENAME TO "temporary_usuario"`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "usuario" varchar(60) NOT NULL, "senha" varchar(255) NOT NULL, "perfil" varchar CHECK( "perfil" IN ('admin','aluno','professor') ) NOT NULL, "situacao" varchar CHECK( "situacao" IN ('ativo','inativo') ) NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id_usuario_professor" varchar, CONSTRAINT "FK_344bba6d8632a5acb79b71e78f4" FOREIGN KEY ("id_usuario_professor") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "usuario"("id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao", "id_usuario_professor") SELECT "id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao", "id_usuario_professor" FROM "temporary_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario"`);
    }

}
