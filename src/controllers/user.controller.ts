import { NextFunction, Request, Response } from 'express';

import handleErrorAsync from '../middleware/handleErrorAsync';
import { UserRepo } from '../repos/user.repo';
import { Success, appError } from '../utils/appResponse';
import { responseCode } from '../utils/errorCode';

/**
 * 註冊使用者 Controller
 * @throws {appError} - 若 email 已被使用或資料驗證失敗，則會拋出對應的錯誤訊息。
 */
const signUp = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  //409
  const checkBeforeCreate = await UserRepo.getByEmail(email);
  if (checkBeforeCreate) {
    return appError(req, `資料重複。Email已被使用`, next, responseCode.CONFLICT);
  }

  //201;

  const newUser = await UserRepo.create({ name, email, password });
  Success(req, res, { user: newUser }, responseCode.CREATED);
});

const userController = {
  signUp,
};

export default userController;
