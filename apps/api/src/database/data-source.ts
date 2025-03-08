import { DataSource } from "typeorm";
import { UserToken } from "../modules/auth/entities/user-token";
import { User } from "../modules/usuario/entities/user";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "src/database/database.sqlite", // Nome do arquivo do banco de dados SQLite
  entities: [User, UserToken], // Lista de entidades
  migrations: ["src/migration/**/*.ts"], // Caminho para as migrations
  synchronize: false, // Desative sync para usar migrations
  logging: true, // Ative logs para depuração
});

// Inicialize o DataSource (opcional, pode ser feito em outro arquivo)
dataSource
  .initialize()
  .then(() => {
    console.log("DataSource has been initialized!");
  })
  .catch((err) => {
    console.error("Error during DataSource initialization", err);
  });
