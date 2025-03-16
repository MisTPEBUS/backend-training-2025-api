import { NextFunction, Request, Response } from 'express';

import handleErrorAsync from '../middleware/handleErrorAsync';
import { CourseCreateInput, CourseRepo } from '../repos/course.repo';
import { Success, appError } from '../utils/appResponse';
import { responseCode } from '../utils/errorCode';
/**
 * 新增教練 Controller
 * @throws {appError} - 若 user_id 已被使用，則會拋出對應的錯誤訊息。
 */
const createCourse = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { user_id, skill_id, name, description, start_at, end_at, max_participants, meeting_url } = req.body;

  const courseData: CourseCreateInput = {
    userId: user_id,
    skillId: skill_id,
    name,
    description,
    startAt: new Date(start_at),
    endAt: new Date(end_at),
    maxParticipants: max_participants,
    meetingUrl: meeting_url,
  };

  //201;
  try {
    const newCourse = await CourseRepo.create(courseData);
    Success(req, res, newCourse, responseCode.CREATED);
  } catch (error) {
    if (error instanceof Error) {
      return appError(req, error.message, next, 400);
    } else {
      return appError(req, '未知錯誤', next, 500);
    }
  }
});

const courseController = {
  createCourse,
};

export default courseController;
