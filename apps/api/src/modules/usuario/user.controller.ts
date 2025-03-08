import { Request, Response, Router } from "express";
// Ajuste o caminho conforme necessário
import { NotFoundException } from "../../exceptions/not-found-exceptions";
import { ReturnError } from "../../exceptions/return-error";
import { validate } from "../../middlewares/valitade.middleware";
import { createUserSchema } from "../schemas/create-user-schema";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UserService } from "./user.service";
// Ajuste o caminho conforme necessário

const userRouter = Router();

// Função do controller para inserir usuário
const createUser = async (
  req: Request<undefined, undefined, CreateUserDto>,
  res: Response
): Promise<void> => {
  console.log(req.body);
  const userService = new UserService(); // Instanciando o serviço UserService
  const user = await userService.createUser(req.body);

  res.send(user);
};

// Função do controller para buscar todos os usuários
const findAllUsers = async (req: Request, res: Response): Promise<void> => {
  res.status(200);
  const userService = new UserService(); // Instanciando o serviço UserService
  const users = await userService.findAll().catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(204).send();
    } else {
      new ReturnError(res, error as Error); // Tratamento de erro genérico
    }
  });
  res.status(200).json(users);
};

const findUsersById = async (req: Request, res: Response): Promise<void> => {
  res.status(200);
  const userService = new UserService(); // Instanciando o serviço UserService
  const { id } = req.params;
  const users = await userService.findUserById(id).catch((error) => {
    if (error instanceof NotFoundException) {
      res.status(204).send();
    } else {
      new ReturnError(res, error as Error); // Tratamento de erro genérico
    }
  });
  res.status(200).json(users);
};

userRouter.get("/", findAllUsers);
userRouter.get("/:id", findUsersById);
userRouter.post("/", validate(createUserSchema), createUser);

export default userRouter;
