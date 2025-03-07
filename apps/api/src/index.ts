import { log } from "@repo/logger";
import "reflect-metadata";
import { dataSource } from "./database/data-source";
import { createServer } from "./server";

const port = process.env.PORT || 3001;
const server = createServer();

dataSource
  .initialize()
  .then(() => {
    log("DataSource has been initialized!");

    // Inicie o servidor após a conexão com o banco de dados estar pronta
    server.listen(port, () => {
      log(`api running on ${port}`);
    });
  })
  .catch((err) => {
    log("Error during DataSource initialization: " + err);
  });
