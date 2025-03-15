import { NextFunction, Request, Response } from 'express';

import handleErrorAsync from '../middleware/handleErrorAsync';
/**
 * 新增教練 Controller
 * @throws {appError} - 若 user_id 已被使用，則會拋出對應的錯誤訊息。
 */
const createCourse = handleErrorAsync(async (_req: Request, _res: Response, _next: NextFunction) => {
  // Success(req, res, skillList);
});

const courseController = {
  createCourse,
};

export default courseController;
