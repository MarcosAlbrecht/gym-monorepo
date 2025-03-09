import { z } from "zod";

// Definição do schema para criação de usuário
export const avaliacaoImcSchema = z.object({
  altura: z
    .number()
    .positive("A altura deve ser um número positivo")
    .min(0.5, "Altura deve ser maior que 0.5m")
    .max(3, "Altura deve ser menor que 3m"), // Limita altura realista

  peso: z
    .number()
    .positive("O peso deve ser um número positivo")
    .min(10, "Peso deve ser maior que 10kg")
    .max(500, "Peso deve ser menor que 500kg"), // Limita peso realista
});

export type AvaliacaoImcSchema = z.infer<typeof avaliacaoImcSchema>;
