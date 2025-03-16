import { Router } from 'express';

import userController from '../../controllers/user.controller';
import { verifyJWT } from '../../middleware/auth';
import { validateData } from '../../middleware/validateRequest';
import { userLoginSchema, userSchema, userUpdateSchema } from '../../validations/user.dto';

const userRouter = Router();
/**
 * POST
 * 登入
 * week6
 */
userRouter.post('/login', validateData(userLoginSchema, 'body'), userController.login);
/**
 * POST
 * 註冊
 */
userRouter.post('/signup', validateData(userSchema, 'body'), userController.signUp);
/**
 * GET /
 * 取得user profile
 */
userRouter.get('/profile', verifyJWT, userController.getUserProfile);
/**
 * PUT /
 * 修改user name
 */
userRouter.put('/profile', verifyJWT, validateData(userUpdateSchema, 'body'), userController.updateName);

export default userRouter;
