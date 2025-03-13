import { Request, Response, Router } from "express";
import { ReturnError } from "../../exceptions/return-error";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/valitade.middleware";
import { avaliacaoImcSchema } from "../schemas/avaliacao-imc.schema";
import { AvaliacaoImcService } from "./avaliacao-imc.service";
import { CreateAvaliacaoImcDto } from "./dtos/create-avaliacao-imc.dto";

const avaliacaoRoute = Router();

// Função do controller para inserir usuário
const createAvaliacaoImc = async (
  req: Request<undefined, undefined, CreateAvaliacaoImcDto>,
  res: Response
): Promise<void> => {
  const avaliacaoImcService = new AvaliacaoImcService(); // Instanciando o serviço UserService
  const avaliacao = await avaliacaoImcService
    .createAvaliacaoImc(req)
    .catch((error) => {
      new ReturnError(res, error);
    });

  res.status(200).json(avaliacao);
};

const findAll = async (req: Request, res: Response): Promise<void> => {
  const avaliacaoImcService = new AvaliacaoImcService(); // Instanciando o serviço UserService
  const avaliacao = await avaliacaoImcService.findAll(req).catch((error) => {
    new ReturnError(res, error);
  });

  res.status(200).json(avaliacao);
};

const findAvaliacaoById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const avaliacaoImcService = new AvaliacaoImcService(); // Instanciando o serviço UserService
  const avaliacao = await avaliacaoImcService
    .findAvaliacaoImcById(req)
    .catch((error) => {
      new ReturnError(res, error);
    });

  res.status(200).json(avaliacao);
};

const findAvaliacaoByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const avaliacaoImcService = new AvaliacaoImcService(); // Instanciando o serviço UserService
  const avaliacao = await avaliacaoImcService
    .findAvaliacaoImcByUserId(req)
    .catch((error) => {
      new ReturnError(res, error);
    });

  res.status(200).json(avaliacao);
};

const updateAvaliacaoImc = async (
  req: Request<undefined, undefined, CreateAvaliacaoImcDto>,
  res: Response
): Promise<void> => {
  const avaliacaoImcService = new AvaliacaoImcService(); // Instanciando o serviço UserService
  const avaliacao = await avaliacaoImcService
    .updateAvaliacaoImc(req)
    .catch((error) => {
      new ReturnError(res, error);
    });

  res.status(200).json(avaliacao);
};

const deleteAvaliacaoImc = async (
  req: Request<undefined, undefined, CreateAvaliacaoImcDto>,
  res: Response
): Promise<void> => {
  const avaliacaoImcService = new AvaliacaoImcService(); // Instanciando o serviço UserService
  const avaliacao = await avaliacaoImcService
    .deleteAvaliacaoImc(req)
    .catch((error) => {
      new ReturnError(res, error);
    });

  res.status(200).json(avaliacao);
};

avaliacaoRoute.use(authMiddleware);
avaliacaoRoute.get("/", findAll);
avaliacaoRoute.get("/:idAvaliacao", findAvaliacaoById);
avaliacaoRoute.get("/user/:idUser", findAvaliacaoByUserId);
avaliacaoRoute.post(
  "/:idAvaliacao",
  validate(avaliacaoImcSchema),
  createAvaliacaoImc
);

avaliacaoRoute.put(
  "/:idAvaliacao",
  validate(avaliacaoImcSchema),
  updateAvaliacaoImc
);

avaliacaoRoute.delete("/:idAvaliacao", deleteAvaliacaoImc);

export default avaliacaoRoute;
