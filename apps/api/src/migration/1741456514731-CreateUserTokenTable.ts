import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTokenTable1741456514731 implements MigrationInterface {
    name = 'CreateUserTokenTable1741456514731'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario_token" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" varchar(255) NOT NULL, "expiracao_token" datetime NOT NULL DEFAULT (datetime('now')), "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id_usuario" varchar, CONSTRAINT "REL_98f38347099798d02785592a67" UNIQUE ("id_usuario"))`);
        await queryRunner.query(`CREATE TABLE "temporary_usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "usuario" varchar(60) NOT NULL, "senha" varchar(255) NOT NULL, "perfil" varchar CHECK( "perfil" IN ('admin','aluno','professor') ) NOT NULL, "situacao" varchar CHECK( "situacao" IN ('ativo','inativo') ) NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "temporary_usuario"("id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao") SELECT "id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao" FROM "usuario"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario" RENAME TO "usuario"`);
        await queryRunner.query(`CREATE TABLE "temporary_usuario_token" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" varchar(255) NOT NULL, "expiracao_token" datetime NOT NULL DEFAULT (datetime('now')), "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id_usuario" varchar, CONSTRAINT "REL_98f38347099798d02785592a67" UNIQUE ("id_usuario"), CONSTRAINT "FK_98f38347099798d02785592a671" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_usuario_token"("id", "refresh_token", "expiracao_token", "dt_inclusao", "id_usuario") SELECT "id", "refresh_token", "expiracao_token", "dt_inclusao", "id_usuario" FROM "usuario_token"`);
        await queryRunner.query(`DROP TABLE "usuario_token"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario_token" RENAME TO "usuario_token"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_token" RENAME TO "temporary_usuario_token"`);
        await queryRunner.query(`CREATE TABLE "usuario_token" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" varchar(255) NOT NULL, "expiracao_token" datetime NOT NULL DEFAULT (datetime('now')), "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id_usuario" varchar, CONSTRAINT "REL_98f38347099798d02785592a67" UNIQUE ("id_usuario"))`);
        await queryRunner.query(`INSERT INTO "usuario_token"("id", "refresh_token", "expiracao_token", "dt_inclusao", "id_usuario") SELECT "id", "refresh_token", "expiracao_token", "dt_inclusao", "id_usuario" FROM "temporary_usuario_token"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario_token"`);
        await queryRunner.query(`ALTER TABLE "usuario" RENAME TO "temporary_usuario"`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "usuario" varchar(60) NOT NULL, "senha" varchar(255) NOT NULL, "perfil" varchar CHECK( "perfil" IN ('admin','aluno','professor') ) NOT NULL, "situacao" varchar CHECK( "situacao" IN ('ativo','inativo') ) NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP))`);
        await queryRunner.query(`INSERT INTO "usuario"("id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao") SELECT "id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao" FROM "temporary_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario"`);
        await queryRunner.query(`DROP TABLE "usuario_token"`);
    }

}
