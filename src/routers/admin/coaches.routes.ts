import { Router } from 'express';

import coachesController from '../../controllers/coaches.controller';
import { CoachCreateValidated } from '../../validations/coach.dto';

const coachesRouter = Router();
/**
 * POST
 * 註冊
 */
coachesRouter.post('/:userId', ...CoachCreateValidated, coachesController.createCoach);

export default coachesRouter;
