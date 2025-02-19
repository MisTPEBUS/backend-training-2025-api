import { Request, Response, NextFunction } from 'express';

import { responseCode, ErrorStatus } from './errorCode';
import logger from './logger';

export const delSuccess = (req: Request, res: Response, status = responseCode.SUCCESS): Response => {
  logger.info(`${req.method} : ${req.statusCode}- "${req.originalUrl}"`);
  return res.status(status).json({
    status: ErrorStatus[responseCode.SUCCESS],
  });
};
/**
 * Sends a successful JSON response.
 * 此函式用來回傳一個成功的 JSON 回應，回應內容包含一個 status 標記和資料內容。
 *
 * @template T - 回應資料的類型。
 * @param {Response} res - Express 回應物件。
 * @param {T} data - 要回傳的資料。
 * @param {number} [status=200] - HTTP 狀態碼（預設為 200）。
 * @returns {Response} 回傳包含 JSON 內容的 Express 回應物件。
 */
export const Success = <T>(req: Request, res: Response, data: T, status = responseCode.SUCCESS): Response => {
  console.log(status);
  logger.info(`${req.method}  : ${req.statusCode}-"${req.originalUrl}"`);
  return res.status(status).json({
    status: 'success',
    data,
  });
};
/**
 * Sends a 404 Not Found JSON response for undefined routes.
 *
 * 當請求的路由不存在時，此函式會回傳 404 錯誤的 JSON 回應，並記錄錯誤資訊。
 *
 * @param {Request} req - Express 請求物件。
 * @param {Response} res - Express 回應物件。
 */
export const NotFound = (req: Request, res: Response) => {
  logger.error(`${req.method}  : ${req.statusCode}-${req.originalUrl}`);
  res.status(404).json({
    status: 'error',
    message: '查無此路由，請確認 API 格式!',
  });
};

export interface AppErrorType extends Error {
  status?: string;
  statusCode?: number;
  isOperational?: boolean;
}
/**
 * Creates an application error and passes it to the next middleware.
 *
 * 此函式用來產生一個包含自訂訊息與狀態碼的錯誤，並將該錯誤傳遞給 Express 的錯誤處理中介軟體。
 *
 * @param {string} errMessage - 錯誤訊息。
 * @param {NextFunction} next - Express 的 next 函式，用於傳遞錯誤至下一個中介軟體。
 * @param {number} [httpStatus=400] - HTTP 狀態碼（預設為 400）。
 */
export const appError = (
  _req: Request,
  errMessage: string,
  next: NextFunction,
  httpStatus = responseCode.BAD_REQUEST
) => {
  const error = new Error(errMessage) as AppErrorType;
  error.statusCode = httpStatus;
  error.isOperational = true;
  error.status =
    httpStatus == responseCode.INTERNAL_SERVER_ERROR
      ? ErrorStatus[responseCode.INTERNAL_SERVER_ERROR]
      : ErrorStatus[responseCode.BAD_REQUEST];

  next(error);
};

export const resJsonError = (err: AppErrorType, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && err.statusCode === responseCode.BAD_REQUEST && 'body' in err) {
    console.error('JSON 解析錯誤:', err);
    return res.status(400).json({
      status: 'error',
      message: '傳入的 JSON 格式錯誤，請檢查逗號或引號是否正確',
    });
  }
  // 如果不是 JSON 解析錯誤，則交由下一個中介軟體處理
  next();
};
