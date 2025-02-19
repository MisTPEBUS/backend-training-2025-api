import { Router } from 'express';

import SkillController from '../../controllers/skill.controller';
import { validateData } from '../../middleware/validateRequest';
import { skillParamsID, skillSchema } from '../../schema/skill.dto';

const skillRouter = Router();
/**
 * GET
 * 取得所有清單
 */
skillRouter.get('/', SkillController.getSkillList);
/**
 * POST
 * 新增一筆資料
 */
skillRouter.post('/', validateData(skillSchema, 'body'), SkillController.createSkill);
/**
 * DELETE
 * 刪除一筆資料
 */
skillRouter.delete('/:skillId', validateData(skillParamsID, 'params'), SkillController.deleteSkillById);

export default skillRouter;
