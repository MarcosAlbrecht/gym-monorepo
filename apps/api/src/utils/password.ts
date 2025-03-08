import { compare, hash } from "bcrypt";
export const CreatePasswordHashed = async (
  password: string
): Promise<string> => {
  const saltRounds = 10;

  return await hash(password, saltRounds);
};

export const ValidatePassword = async (
  password: string,
  passwordHashed: string
): Promise<boolean> => {
  return await compare(password, passwordHashed);
};
