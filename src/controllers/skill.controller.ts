import { NextFunction, Request, Response } from 'express';
import handleErrorAsync from '../middleware/handleErrorAsync';

import logger from '../utils/logger';

import { Success, appError } from '../utils/appResponse';
import prisma from '../prisma';

const getSkillList = handleErrorAsync(async (req: Request, res: Response) => {
  //a.檢查req
  const skillList = await prisma.skill.findMany();
  logger.info(`skillList GET"${req.path}`);
  Success(res, skillList);
});

const createSkill = handleErrorAsync(async (req: Request, res: Response) => {
  const { name } = req.body;
  logger.info(`skillList POST"${req.path}`);

  const newSkill = await prisma.skill.create({
    data: {
      name,
    },
  });

  Success(res, newSkill, 201);
});

const deleteSkillById = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  logger.info(`Skill DELETE:${req.path}`);
  const existSkill = await prisma.skill.findUnique({
    where: { id },
  });
  if (!existSkill) {
    return next(appError(`找不到 ID 為 ${id} 的 Skill資料`, next, 400));
  }

  await prisma.skill.delete({
    where: { id },
  });
  Success(res, '', 200);
});

const SkillController = {
  getSkillList,
  createSkill,
  deleteSkillById,
};

export default SkillController;
