import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import morgan from "morgan";
import authRouter from "./modules/auth/auth-controller";
import avaliacaoRoute from "./modules/avaliacao-imc/avaliacao-imc.controller";
import userRouter from "./modules/usuario/user.controller";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(cookieParser())
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors({ credentials: true }));

  app.use("/users", userRouter);
  app.use("/auth", authRouter);
  app.use("/avaliacao", avaliacaoRoute);

  return app;
};
