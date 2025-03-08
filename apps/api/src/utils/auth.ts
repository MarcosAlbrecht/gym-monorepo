import { Request } from "express";
import { sign, verify } from "jsonwebtoken";

import { UnauthorizedException } from "../exceptions/unauthorized-exception";
import { UserAuth } from "../modules/auth/dtos/auth-user.dto";
import { ReturnUserDto } from "../modules/usuario/dtos/return-user.dto";

export const PASSWORD_JWT = "umasenhamuitogrande";

export const generateToken = (user: ReturnUserDto): string => {
  return sign(
    {
      id: user.id,
      nome: user.nome,
      usuario: user.usuario,
      perfil: user.perfil,
    } as ReturnUserDto,
    PASSWORD_JWT,
    {
      subject: String(user.id),
      expiresIn: "904800000",
    }
  );
};

export const verifyToken = async (
  authorization?: string
): Promise<UserAuth> => {
  if (!authorization) {
    throw new UnauthorizedException();
  }
  const [, token] = authorization.split(" ");

  try {
    const decodedToken = <UserAuth>verify(token, PASSWORD_JWT);

    return decodedToken;
  } catch (error) {
    throw new UnauthorizedException();
  }
};

export const getUserByToken = async (req: Request): Promise<UserAuth> => {
  const authorization = req.headers.authorization;

  return verifyToken(authorization);
};
