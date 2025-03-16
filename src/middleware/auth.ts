// src/middlewares/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';

import config from '../config/config';
import { appError } from '../utils/appResponse';
import { responseCode } from '../utils/errorCode';

/**
 * JWT 驗證 middleware
 * 驗證失敗則回傳錯誤狀態
 */
export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return appError(req, '未提供有效的Token', next, responseCode.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as { id: string };

    req.user = decoded.id;
    next();
  } catch (error) {
    return appError(req, 'Token 驗證失敗或已過期', next, responseCode.FORBIDDEN);
  }
};

export const generateToken = (userId: string): string => {
  const payload = { id: userId };

  const options: SignOptions = {
    expiresIn: '1h', // 可以改成 '60m', '3600s' 等
  };

  return jwt.sign(payload, config.JWT_SECRET as jwt.Secret, options);
};
