import { Request, Response, Router } from "express";
import { ReturnError } from "../../exceptions/return-error";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/valitade.middleware";
import { getUserByToken } from "../../utils/auth";
import { authUserSchema } from "../schemas/auth-schema";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dtos/auth.dto";

const authRouter = Router();
const route = Router();

const auth = async (
  req: Request<undefined, undefined, AuthDto>,
  res: Response
): Promise<void> => {
  const authService = new AuthService();
  const user = await authService.validateAuth(req.body, res).catch((error) => {
    new ReturnError(res, error);
  });

  res.send(user);
};

const refreshToken = async (
  req: Request<undefined, undefined, AuthDto>,
  res: Response
): Promise<void> => {
  const authService = new AuthService();
  const token = await authService.refreshAuth(req).catch((error) => {
    new ReturnError(res, error);
  });

  res.send(token);
};

const deleteUserToken = async (
  req: Request<undefined, undefined, AuthDto>,
  res: Response
): Promise<void> => {
  const user = await getUserByToken(req);
  const authService = new AuthService();
  const token = await authService
    .deleteUserTokenByIdUser(req)
    .catch((error) => {
      new ReturnError(res, error);
    });

  res.send(token);
};

authRouter.post("/", validate(authUserSchema), auth);
authRouter.post("/refresh-token", refreshToken);
authRouter.use(authMiddleware);
authRouter.delete("/:id", deleteUserToken);

export default authRouter;
