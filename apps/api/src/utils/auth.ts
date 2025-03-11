import { Request } from "express";
import { sign, verify } from "jsonwebtoken";

import { UnauthorizedException } from "../exceptions/unauthorized-exception";

import { UserAuthDto } from "../modules/auth/dtos/user-auth.dto";
import { ReturnUserDto } from "../modules/usuario/dtos/return-user.dto";
import { User } from "../modules/usuario/entities/user";

export const PASSWORD_JWT = "umasenhamuitogrande";
export const PASSWORD_REFRESH_JWT = "umasegundasenhamuitogrande";

export const generateToken = (user: User): string => {
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
      expiresIn: "10m",
    }
  );
};

export const verifyToken = async (
  authorization?: string
): Promise<UserAuthDto> => {
  if (!authorization) {
    throw new UnauthorizedException();
  }
  const [, token] = authorization.split(" ");

  try {
    const decodedToken = <UserAuthDto>verify(token, PASSWORD_JWT);

    return decodedToken;
  } catch (error) {
    throw new UnauthorizedException();
  }
};

export const getUserByToken = async (req: Request): Promise<UserAuthDto> => {
  const authorization = req.headers.authorization;

  return verifyToken(authorization);
};
