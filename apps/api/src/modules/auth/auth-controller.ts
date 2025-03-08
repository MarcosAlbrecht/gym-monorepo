import { Request, Response, Router } from "express";
import { ReturnError } from "../../exceptions/return-error";
import { AuthService } from "./auth.service";
import { UserAuthDto } from "./dtos/auth-user.dto";

const authRouter = Router();

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

authRouter.post("/", auth);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;
