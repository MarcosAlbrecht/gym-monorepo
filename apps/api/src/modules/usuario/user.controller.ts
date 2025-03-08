import { Request, Response, Router } from "express";
// Ajuste o caminho conforme necessário
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
  try {
    res.status(200);
    const userService = new UserService(); // Instanciando o serviço UserService
    const users = await userService.findAll(); // Chamada ao serviço para buscar os usuários
    res.status(200).json(users); // Retorna os usuários em caso de sucesso
  } catch (error) {
    // if (error instanceof NotFoundException) {
    //   res.status(204).send(); // Envia status 204 se nenhum usuário for encontrado
    // } else {
    //   new ReturnError(res, error); // Tratamento de erro genérico
    // }
  }
};

userRouter.get("/", findAllUsers);
userRouter.post("/", validate(createUserSchema), createUser);

export default userRouter;
