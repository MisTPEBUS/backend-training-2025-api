import { NextFunction, Request, Response } from 'express';

import handleErrorAsync from '../middleware/handleErrorAsync';
import { UserRepo } from '../repos/user.repo';
import { Success, appError } from '../utils/appResponse';
import { responseCode } from '../utils/errorCode';

const signUp = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  try {
    //409
    const checkBeforeCreate = await UserRepo.getByEmail(email);
    if (checkBeforeCreate) {
      return appError(req, `資料重複。Email已被使用`, next, responseCode.CONFLICT);
    }

    //201;

    const newUser = await UserRepo.create({ name, email, password });
    Success(req, res, { user: newUser });
  } catch (error) {
    if (error instanceof appError) {
      return appError(req, `欄位未填寫正確`, next);
    }
    return next(error);
  }
});

const userController = {
  signUp,
};

export default userController;
