import type { Request, Response, NextFunction } from 'express';
import { ZodObject } from 'zod';

export class AuthMiddleware {
  public static validateRequest(schema: ZodObject) {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        await schema.parseAsync({
          body: req.body,
          query: req.query,
          params: req.params,
          cookies: req.cookies,
        });
        return next();
      } catch (error) {
        res.status(400).json({
          success: false,
          message: 'Validation Error',
          error,
        });
      }
    };
  }
}
