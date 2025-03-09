import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAvaliacaoImcTable1741544944080 implements MigrationInterface {
    name = 'CreateAvaliacaoImcTable1741544944080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "usuario" varchar(60) NOT NULL, "senha" varchar(255) NOT NULL, "perfil" varchar CHECK( "perfil" IN ('admin','aluno','professor') ) NOT NULL, "situacao" varchar CHECK( "situacao" IN ('ativo','inativo') ) NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id_usuario_professor" varchar, CONSTRAINT "FK_344bba6d8632a5acb79b71e78f4" FOREIGN KEY ("id_usuario_professor") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_usuario"("id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao", "id_usuario_professor") SELECT "id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao", "id_usuario_professor" FROM "usuario"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`ALTER TABLE "temporary_usuario" RENAME TO "usuario"`);
        await queryRunner.query(`CREATE TABLE "temporary_avaliacao_imc" ("id" varchar PRIMARY KEY NOT NULL, "altura" decimal(5,2) NOT NULL, "peso" decimal(5,2) NOT NULL, "imc" decimal(5,2) NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id_usuario_avaliacao" varchar, "id_usuario_aluno" varchar, "classificacao" varchar CHECK( "classificacao" IN ('Abaixo do peso','Peso normal','Sobrepeso','Obesidade grau I','Obesidade grau II','Obesidade grau III') ) NOT NULL, CONSTRAINT "FK_d276f2482c6d64ddc36c3229fa6" FOREIGN KEY ("id_usuario_avaliacao") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b3b4bd4196d4d625dc4307412e8" FOREIGN KEY ("id_usuario_aluno") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_avaliacao_imc"("id", "altura", "peso", "imc", "dt_inclusao", "id_usuario_avaliacao", "id_usuario_aluno", "classificacao") SELECT "id", "altura", "peso", "imc", "dt_inclusao", "id_usuario_avaliacao", "id_usuario_aluno", "classificacao" FROM "avaliacao_imc"`);
        await queryRunner.query(`DROP TABLE "avaliacao_imc"`);
        await queryRunner.query(`ALTER TABLE "temporary_avaliacao_imc" RENAME TO "avaliacao_imc"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "avaliacao_imc" RENAME TO "temporary_avaliacao_imc"`);
        await queryRunner.query(`CREATE TABLE "avaliacao_imc" ("id" varchar PRIMARY KEY NOT NULL, "altura" decimal(5,2) NOT NULL, "peso" decimal(5,2) NOT NULL, "imc" decimal(5,2) NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id_usuario_avaliacao" varchar, "id_usuario_aluno" varchar, "classificacao" varchar CHECK( "classificacao" IN ('Abaixo do peso','Peso normal','Sobrepeso','Obesidade grau I','Obesidade grau II','Obesidade grau III') ) NOT NULL, CONSTRAINT "FK_d276f2482c6d64ddc36c3229fa6" FOREIGN KEY ("id_usuario_avaliacao") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_b3b4bd4196d4d625dc4307412e8" FOREIGN KEY ("id_usuario_aluno") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "avaliacao_imc"("id", "altura", "peso", "imc", "dt_inclusao", "id_usuario_avaliacao", "id_usuario_aluno", "classificacao") SELECT "id", "altura", "peso", "imc", "dt_inclusao", "id_usuario_avaliacao", "id_usuario_aluno", "classificacao" FROM "temporary_avaliacao_imc"`);
        await queryRunner.query(`DROP TABLE "temporary_avaliacao_imc"`);
        await queryRunner.query(`ALTER TABLE "usuario" RENAME TO "temporary_usuario"`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" varchar PRIMARY KEY NOT NULL, "nome" varchar(60) NOT NULL, "usuario" varchar(60) NOT NULL, "senha" varchar(255) NOT NULL, "perfil" varchar CHECK( "perfil" IN ('admin','aluno','professor') ) NOT NULL, "situacao" varchar CHECK( "situacao" IN ('ativo','inativo') ) NOT NULL, "dt_inclusao" datetime NOT NULL DEFAULT (CURRENT_TIMESTAMP), "id_usuario_professor" varchar, CONSTRAINT "FK_344bba6d8632a5acb79b71e78f4" FOREIGN KEY ("id_usuario_professor") REFERENCES "usuario" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "usuario"("id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao", "id_usuario_professor") SELECT "id", "nome", "usuario", "senha", "perfil", "situacao", "dt_inclusao", "id_usuario_professor" FROM "temporary_usuario"`);
        await queryRunner.query(`DROP TABLE "temporary_usuario"`);
    }

}
