import { NextFunction, Request, Response } from 'express';

import handleErrorAsync from '../middleware/handleErrorAsync';
import prisma from '../prisma';
import { SkillRepo } from '../repos/skill.repo';
import { Success, appError, delSuccess } from '../utils/appResponse';
import { ErrorMessage, responseCode } from '../utils/errorCode';

const getSkillList = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const skillList = await SkillRepo.getAll();
    Success(req, res, skillList);
  } catch (error) {
    appError(req, ErrorMessage[responseCode.INTERNAL_SERVER_ERROR], next);
  }
});

const createSkill = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const existingPackage = await SkillRepo.getByName(name);
    if (existingPackage) {
      return appError(req, `資料重複。Name 為 ${name} 資料已存在`, next, responseCode.CONFLICT);
    }
    const newSkill = await prisma.skill.create({
      data: {
        name,
      },
    });

    Success(req, res, newSkill, responseCode.CREATED);
  } catch (error) {
    appError(req, ErrorMessage[responseCode.INTERNAL_SERVER_ERROR], next);
  }
});

const deleteSkillById = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skillId } = req.params;

    const existingPackage = await SkillRepo.getById(skillId);

    if (!existingPackage) {
      return appError(req, `ID錯誤,請輸入正確的格式`, next, 400);
    }
    const existSkill = await SkillRepo.deleteById(skillId);

    if (!existSkill) {
      return appError(req, `找不到 ID 為 ${skillId} 的 Skill資料`, next, responseCode.CONFLICT);
    }

    delSuccess(req, res);
  } catch (error) {
    appError(req, ErrorMessage[responseCode.INTERNAL_SERVER_ERROR], next);
  }
});

const SkillController = {
  getSkillList,
  createSkill,
  deleteSkillById,
};

export default SkillController;
