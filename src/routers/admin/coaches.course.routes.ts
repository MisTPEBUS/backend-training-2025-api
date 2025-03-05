import { Router } from 'express';

import coachesController from '../../controllers/coaches.controller';
import { CoachCreateValidated } from '../../validations/coach.dto';

const courseRouter = Router();
/**
 * POST
 * 註冊
 */
courseRouter.post('/:userId', ...CoachCreateValidated, coachesController.createCoach);

export default courseRouter;
