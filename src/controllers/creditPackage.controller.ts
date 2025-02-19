import { NextFunction, Request, Response } from 'express';

import handleErrorAsync from '../middleware/handleErrorAsync';
import prisma from '../prisma';
import { CreditPackageRepo } from '../repos/creditPackage.repo';
import { Success, appError, delSuccess } from '../utils/appResponse';
import { ErrorMessage, responseCode } from '../utils/errorCode';

const getAsyncPublicCreditPackages = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const creditPackages = await CreditPackageRepo.getAll();

    Success(req, res, creditPackages);
  } catch (error) {
    appError(req, ErrorMessage[responseCode.INTERNAL_SERVER_ERROR], next);
  }
});

const createAsyncCreditPackage = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  // 模擬非同步操作，例如資料庫存取
  try {
    const { name, credit_amount, price } = req.body;
    const existingPackage = await CreditPackageRepo.getByName(name);

    if (existingPackage) {
      return appError(req, `資料重複。Name 為 ${name} 資料已存在`, next, responseCode.CONFLICT);
    }

    const newCreditPackage = await prisma.creditPackage.create({
      data: { name, credit_amount, price },
    });

    Success(req, res, newCreditPackage, responseCode.CREATED);
  } catch (error) {
    if (error instanceof appError) {
      return appError(req, `欄位未填寫正確`, next);
    }
    return next(error);
  }
});

const deleteAsyncCreditPackage = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  //驗證

  const { creditPackageId } = req.params;
  const existingPackage = await CreditPackageRepo.getById(creditPackageId);

  if (!existingPackage) {
    return appError(req, `ID錯誤,請輸入正確的格式`, next, 400);
  }

  await CreditPackageRepo.deleteById(creditPackageId);

  delSuccess(req, res);
});

/**
 * （管理員用）
 */
const getAdminCreditPackages = (req: Request, res: Response) => {
  // 待補： 實作管理員相關邏輯
  res.status(200).json({ success: true, data: [] });
};

/**
 * CreditPackage Controller 物件。
 */
const creditPackageController = {
  getAsyncPublicCreditPackages,
  createAsyncCreditPackage,
  deleteAsyncCreditPackage,
  getAdminCreditPackages,
};

export default creditPackageController;
