import { Response, NextFunction } from 'express';

export const Success = (res: Response, data: any = '', status = 200) => {
  return res.status(status).json({
    status: true,
    data,
  });
};

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const appError = (errMessage: string, next: NextFunction, httpStatus = 400) => {
  const error = new Error(errMessage) as AppError;
  error.statusCode = httpStatus;
  error.isOperational = true;

  next(error);
};
