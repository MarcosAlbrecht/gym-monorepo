import { z } from "zod";
import { PerfilEnum } from "../enums/perfil";
import { SituacaoEnum } from "../enums/situacao";

// Definição do schema para criação de usuário
export const userSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(60, "O nome deve ter no máximo 60 caracteres"),
  usuario: z.string().min(3, "O usuario deve ter pelo menos 3 caracteres"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  perfil: z.nativeEnum(PerfilEnum),
  situacao: z.nativeEnum(SituacaoEnum),
  id_professor: z.string().nullable(),
});

export type UserSchema = z.infer<typeof userSchema>;
