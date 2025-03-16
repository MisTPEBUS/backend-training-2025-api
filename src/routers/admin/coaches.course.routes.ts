import { Router } from 'express';

import courseController from '../../controllers/course.controller';
import { validateData } from '../../middleware/validateRequest';
import { courseCreateSchema } from '../../validations/course.dto';

const courseRouter = Router();
/**
 * POST
 * 註冊
 */
courseRouter.post('/', validateData(courseCreateSchema, 'body'), courseController.createCourse);

/**
 * put
 *
 */
courseRouter.put('/coaches/courses', validateData(courseCreateSchema, 'body'), courseController.createCourse);

export default courseRouter;
