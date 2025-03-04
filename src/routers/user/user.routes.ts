import { Router } from 'express';

import userController from '../../controllers/user.controller';
import { validateData } from '../../middleware/validateRequest';
import { userSchema } from '../../validations/user.dto';

const userRouter = Router();
/**
 * POST
 * 註冊
 */
userRouter.post('/signup', validateData(userSchema, 'body'), userController.signUp);

export default userRouter;
