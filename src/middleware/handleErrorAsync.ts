// src/middlewares/handleErrorAsync.ts
import { Request, Response, NextFunction } from 'express';

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const handleErrorAsync = (func: AsyncRequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(func(req, res, next)).catch(next);

export default handleErrorAsync;
