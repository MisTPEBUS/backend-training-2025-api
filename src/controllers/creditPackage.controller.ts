import { NextFunction, Request, Response } from 'express';
import handleErrorAsync from '../middleware/handleErrorAsync';
import { PrismaClient } from '@prisma/client';
import { Success, appError } from '../utils/appResponse';
import logger from '../middleware/logger';
const prisma = new PrismaClient();

const getPublicCreditPackage = handleErrorAsync(async (req: Request, res: Response) => {
  const creditPackages = await prisma.creditPackage.findMany();
  logger.info(`creditRouter POST:${req.path}`);
  Success(res, creditPackages);
});

const createCreditPackage = handleErrorAsync(async (req: Request, res: Response) => {
  const { name, credit_amount, price } = req.body;
  logger.info(`creditRouter POST:${req.path}`);
  // Prisma 建立資料
  const newCreditPackage = await prisma.creditPackage.create({
    data: {
      name,
      credit_amount,
      price,
    },
  });

  Success(res, newCreditPackage, 201);
});

const updateCreditPackage = handleErrorAsync(async (req: Request, res: Response) => {
  logger.info(`creditRouter PUT:${req.path}`);
  console.log(res);
});
const deleteCreditPackage = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  logger.info(`creditRouter POST:${req.path}`);
  const existPackage = await prisma.creditPackage.findUnique({
    where: { id },
  });
  if (!existPackage) {
    return next(appError(`找不到 ID 為 ${id} 的 CreditPackage`, next, 400));
  }

  // 刪除
  await prisma.creditPackage.delete({
    where: { id },
  });

  Success(res, '', 200);
});

const getAdminOrders = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: [] });
};

const creditPackageController = {
  getPublicCreditPackage,
  createCreditPackage,
  updateCreditPackage,
  deleteCreditPackage,
  getAdminOrders,
};

export default creditPackageController;
