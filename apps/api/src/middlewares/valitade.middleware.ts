import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // Valida os dados
      next(); // Se for válido, segue para o próximo middleware/controller
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.format(), // Retorna erros formatados corretamente
        });
      }

      return res.status(500).json({
        message: "Erro interno do servidor",
      });
    }
  };
