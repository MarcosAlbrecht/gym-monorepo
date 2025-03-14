import { Request, Response, Router } from "express";
// Ajuste o caminho conforme necessário
import { ReturnError } from "../../exceptions/return-error";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/valitade.middleware";
import { createUserSchema } from "../schemas/create-user-schema";
import { CreateUserDto } from "./dtos/create-user.dto";
import { ReturnUserDto } from "./dtos/return-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserService } from "./user.service";
// Ajuste o caminho conforme necessário

const userRouter = Router();
const rote = Router();

// Função do controller para inserir usuário
const createUser = async (
  req: Request<undefined, undefined, CreateUserDto>,
  res: Response
): Promise<void> => {
  const userService = new UserService(); // Instanciando o serviço UserService
  const user = await userService.createUser(req.body).catch((error) => {
    new ReturnError(res, error);
  });

  res.status(200).json(user);
};

const findAllUsers = async (req: Request, res: Response): Promise<void> => {
  const userService = new UserService(); // Instanciando o serviço UserService
  const users = await userService.findAll(req).catch((error) => {
    new ReturnError(res, error);
  });
  res.status(200).json(users);
};

const findUsersById = async (req: Request, res: Response): Promise<void> => {
  const userService = new UserService(); // Instanciando o serviço UserService
  const { id } = req.params;
  try {
    const user = await userService.findUserById(id);
    if (user) {
      res.status(200).json(new ReturnUserDto(user));
    }
  } catch (error: any) {
    new ReturnError(res, error);
  }
};

const findLoggedUser = async (req: Request, res: Response): Promise<void> => {
  const userService = new UserService(); // Instanciando o serviço UserService
  try {
    const user = await userService.findLoggedUser(req);
    if (user) {
      res.status(200).json(new ReturnUserDto(user));
    }
  } catch (error: any) {
    new ReturnError(res, error);
  }
};

const findUsersByIdUsuarioProfessor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userService = new UserService(); // Instanciando o serviço UserService
  const users = await userService
    .findUsersByIdUsuarioProfessor(req)
    .catch((error) => {
      new ReturnError(res, error);
    });
  res.status(200).json(users);
};

const updateUserById = async (
  req: Request<undefined, undefined, UpdateUserDto>,
  res: Response
): Promise<void> => {
  const userService = new UserService(); // Instanciando o serviço UserService
  const user = await userService
    .updateUserById(req, req.body)
    .catch((error) => {
      new ReturnError(res, error);
    });
  res.status(200).json(user);
};

const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  const userService = new UserService(); // Instanciando o serviço UserService
  const user = await userService.deleteUserById(req).catch((error) => {
    new ReturnError(res, error);
  });
  res.status(200).json(user);
};

userRouter.post("/", validate(createUserSchema), createUser);
userRouter.use(authMiddleware);
userRouter.get("/", findAllUsers);
userRouter.get("/logged", findLoggedUser);
userRouter.get("/alunos-professor/:idProfessor", findUsersByIdUsuarioProfessor);
userRouter.get("/:id", findUsersById);
userRouter.put("/:id", updateUserById);
userRouter.delete("/:id", deleteUserById);

export default userRouter;
