// src/middlewares/handleErrorAsync.ts
import { Request, Response, NextFunction } from 'express';

const handleErrorAsync = (func: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(func(req, res, next)).catch(next);

export default handleErrorAsync;
