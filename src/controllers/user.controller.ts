import { NextFunction, Request, Response } from 'express';

import { generateToken } from '../middleware/auth';
import handleErrorAsync from '../middleware/handleErrorAsync';
import { UserRepo } from '../repos/user.repo';
import { Success, appError } from '../utils/appResponse';
import { responseCode } from '../utils/errorCode';

/**
 * 註冊使用者 Controller
 *
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
const login = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  //201;

  const newUser = await UserRepo.findOneByLogin(email, password);
  if (!newUser) {
    return appError(req, `使用者不存在或密碼輸入錯誤`, next, responseCode.BAD_REQUEST);
  }
  const token = generateToken(newUser.id);
  Success(req, res, { token, user: { name: newUser.name } }, responseCode.CREATED);
});
const getUserProfile = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.user;

  //201;

  const newUser = await UserRepo.getById(String(id));
  console.log(newUser);
  if (!newUser) {
    return appError(req, `使用者不存在`, next, responseCode.CONFLICT);
  }

  Success(req, res, { user: newUser }, responseCode.CREATED);
});
const updateName = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  const id = req.user;
  const { name } = req.body;

  if (!id) {
    return appError(req, `未授權`, next, responseCode.UNAUTHORIZED);
  }

  // 確認使用者是否存在
  const existingUser = await UserRepo.getById(String(id));

  if (!existingUser) {
    return appError(req, `使用者不存在`, next, responseCode.CONFLICT);
  }

  const updateUser = await UserRepo.updateNameById(name, String(id));

  if (!updateUser) {
    return appError(req, `更新失敗`, next, responseCode.CONFLICT);
  }

  Success(req, res, null);
});

const userController = {
  signUp,
  login,
  getUserProfile,
  updateName,
};

export default userController;
