import { randomBytes } from "crypto";

export const generateRefreshToken = (): string => {
  return randomBytes(64).toString("hex"); // Gera um token aleatório de 64 bytes em hexadecimal
};
