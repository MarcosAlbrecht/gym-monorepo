import { Request, Response, Router } from "express";
import { ReturnError } from "../../exceptions/return-error";
import { getUserByToken } from "../../utils/auth";
import { AuthService } from "./auth.service";
import { UserAuthDto } from "./dtos/auth-user.dto";

const authRouter = Router();
const route = Router();

const auth = async (
  req: Request<undefined, undefined, UserAuthDto>,
  res: Response
): Promise<void> => {
  const authService = new AuthService();
  const user = await authService.validateAuth(req.body).catch((error) => {
    new ReturnError(res, error);
  });

  res.send(user);
};

const refreshToken = async (
  req: Request<undefined, undefined, UserAuthDto>,
  res: Response
): Promise<void> => {
  const authService = new AuthService();
  const token = await authService
    .refreshAuth(req.headers.authorization)
    .catch((error) => {
      new ReturnError(res, error);
    });

  res.send(token);
};

const deleteUserToken = async (
  req: Request<undefined, undefined, UserAuthDto>,
  res: Response
): Promise<void> => {
  const user = await getUserByToken(req);
  const authService = new AuthService();
  const token = await authService
    .refreshAuth(req.headers.authorization)
    .catch((error) => {
      new ReturnError(res, error);
    });

  res.send(token);
};

authRouter.post("/", auth);
authRouter.post("/refresh-token", refreshToken);
//route.use(authMiddleware);
authRouter.delete("/", deleteUserToken);

export default authRouter;
