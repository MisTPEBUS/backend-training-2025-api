import { Router } from 'express';

import coachesController from '../../controllers/coaches.controller';
import { CoachCreateValidated } from '../../validations/coach.dto';

const coachesUserRouter = Router();
/**
 * POST
 * 註冊
 */
coachesUserRouter.post('/:userId', ...CoachCreateValidated, coachesController.createCoach);
/**
 * Get
 *
 */
coachesUserRouter.get('/', coachesController.getCoaches);

export default coachesUserRouter;
