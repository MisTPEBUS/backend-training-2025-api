import { NextFunction, Request, Response } from 'express';

import handleErrorAsync from '../middleware/handleErrorAsync';
import prisma from '../prisma';
import { SkillRepo } from '../repos/skill.repo';
import { Success, appError, delSuccess } from '../utils/appResponse';
import { responseCode } from '../utils/errorCode';

/**
 * 取得所有 Skill 資料
 *
 *
 * @async
 * @function getSkillList
 */
const getSkillList = handleErrorAsync(async (req: Request, res: Response, _next: NextFunction) => {
  const skillList = await SkillRepo.getAll();

  Success(req, res, skillList);
});

/**
 * 新增 Skill 資料
 *
 * 從請求中取得 skill 名稱，先檢查是否已有相同名稱的資料，
 * 若存在則回傳 409 衝突錯誤；若不存在則新增 skill，
 * 成功後回傳建立的 skill 資料，並回傳 201 狀態碼。
 *
 * @async
 * @function createSkill
 * @param {Request} req - Express 的請求對象，包含 skill 名稱
 * @param {Response} res - Express 的回應對象
 * @param {NextFunction} next - Express 的下一個中介函式
 * @returns {Promise<void>}
 */
const createSkill = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
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
  // 回傳建立成功的資料，狀態碼 201
  Success(req, res, newSkill, responseCode.CREATED);
});

/**
 * 根據 ID 刪除 Skill 資料
 *
 * 從請求參數中取得 skillId，先檢查該 ID 是否存在，
 * 若不存在則回傳 400 或 409 錯誤；若存在則刪除該資料，
 * 成功後回傳刪除成功訊息。
 *
 * @async
 * @function deleteSkillById
 */
const deleteSkillById = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
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
});

const SkillController = {
  getSkillList,
  createSkill,
  deleteSkillById,
};

export default SkillController;
