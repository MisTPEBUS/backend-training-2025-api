// errorHandler.ts
import { Request, Response, NextFunction } from 'express';

import { AppErrorType } from '../utils/appResponse';
import logger from '../utils/logger';

export const errorHandler = (err: AppErrorType, req: Request, res: Response, _next: NextFunction) => {
  // 設定預設狀態碼
  err.statusCode = err.statusCode || 500;

  // 記錄錯誤訊息
  logger.error(`${err.statusCode} : ${req.originalUrl} - ${err.message}`);

  // 確保回傳 JSON 格式
  res.setHeader('Content-Type', 'application/json');

  // 錯誤處理中介軟體：捕捉 JSON 解析錯誤
  if (err instanceof SyntaxError && err.statusCode === 400 && 'body' in err) {
    console.error('JSON 解析錯誤:', err);
    return res.status(400).json({
      status: 'error',
      message: '傳入的 JSON 格式錯誤，請檢查逗號或引號是否正確',
    });
  }

  // 根據環境回傳不同內容
  if (process.env.NODE_ENV === 'dev') {
    return res.status(err.statusCode).json({
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
};
