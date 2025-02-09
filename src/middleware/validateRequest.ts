import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * validateRequest middleware
 * @param schema - Zod 驗證 schema
 * @returns 一個 middleware，用來驗證 req.body，驗證通過則呼叫 next()，否則傳遞錯誤
 */
const validateRequest = (schema: ZodSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req);
    req.body = await schema.parseAsync(req.body);
    next();
  } catch (error) {
    console.log(1);
    next(error);
  }
};

export default validateRequest;
