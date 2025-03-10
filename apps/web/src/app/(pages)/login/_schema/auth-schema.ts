import z from "zod";

// Definição do schema para autenticacao de usuário
export const authUserSchema = z.object({
  usuario: z.string().nonempty("O usuario é obrigatorio"),
  senha: z.string().nonempty("Senha é obrigatorio"),
});

export type AuthUserSchema = z.infer<typeof authUserSchema>;
