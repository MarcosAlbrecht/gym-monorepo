import { Request } from "express";
import { sign, verify } from "jsonwebtoken";

import { UnauthorizedException } from "../exceptions/unauthorized-exception";
import { UserAuthDto } from "../modules/auth/dtos/auth-user.dto";
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
      expiresIn: "60s",
    }
  );
};

// Função para gerar o Refresh Token
export const generateRefreshToken = (user: User): string => {
  return sign(
    {
      id: user.id,
      nome: user.nome,
      usuario: user.usuario,
      perfil: user.perfil,
    } as ReturnUserDto,
    PASSWORD_REFRESH_JWT,
    {
      subject: String(user.id),
      expiresIn: "30D", // Tempo maior para o refresh token
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

// Função para verificar o Refresh Token e gerar um novo Access Token
// export const verifyAndRefreshToken = async (
//   authorization: string | undefined,
//   refreshToken: string | undefined
// ): Promise<UserAuth> => {
//   if (!authorization || !refreshToken) {
//     throw new UnauthorizedException();
//   }

//   // Primeiro, tentamos verificar o Access Token
//   try {
//     const decodedToken = await verifyToken(authorization);
//     return decodedToken; // Se o token for válido, retorna o usuário
//   } catch (error) {
//     // Se o access token expirou ou é inválido, tentamos verificar o refresh token
//     const storedToken = await RefreshTokenRepository.findOne({
//       where: { refresh_token: refreshToken },
//     });

//     if (!storedToken || new Date(storedToken.expiracao_token) < new Date()) {
//       throw new UnauthorizedException();
//     }

//     try {
//       // Se o refresh token for válido, geramos um novo access token
//       const decoded = verify(refreshToken, PASSWORD_REFRESH_JWT) as UserAuth;

//       // Gerar novo access token
//       const newAccessToken = generateToken({
//         id: decoded.id,
//         nome: decoded.nome,
//         usuario: decoded.usuario,
//         perfil: decoded.perfil,
//       });

//       return newAccessToken; // Retorna o novo access token junto com os dados do usuário
//     } catch (error) {
//       throw new UnauthorizedException();
//     }
//   }
// };

export const getUserByToken = async (req: Request): Promise<UserAuthDto> => {
  const authorization = req.headers.authorization;

  return verifyToken(authorization);
};
