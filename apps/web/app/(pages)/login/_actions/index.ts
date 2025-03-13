"use server";

import { z } from "zod";
// Importe a função de login
import { useAuth } from "@/app/_hooks/useAuth";
import { authUserSchema } from "@/app/_services/schemas/auth-schema";

export async function loginAction(values: z.infer<typeof authUserSchema>) {
  const { login, user } = useAuth();
  try {
    const parsedValues = authUserSchema.parse(values); // Validação com Zod

    // Executa o login e obtém o token
    const data = await login(parsedValues.usuario, parsedValues.senha);

    if (user) throw new Error("Token não recebido");

    return { success: true };
  } catch (error) {
    console.error("Erro ao logar:", error);
    return { success: false, message: "Usuário ou senha inválidos" };
  }
}
