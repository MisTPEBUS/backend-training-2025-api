import { NextFunction, Request, Response } from 'express';

import handleErrorAsync from '../middleware/handleErrorAsync';
import { CoachCreateInput, CoachRepo } from '../repos/coaches.repo';
import { Success, appError } from '../utils/appResponse';
import { responseCode } from '../utils/errorCode';

const createCoach = handleErrorAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { experience_years, description, profile_image_url } = req.body;

  const { userId } = req.params;

  const coachData: CoachCreateInput = {
    experienceYears: experience_years,
    description,
    profileImageUrl: profile_image_url,
    userId,
  };

  //409
  const checkBeforeCreate = await CoachRepo.getByUserId(userId);
  if (checkBeforeCreate) {
    return appError(req, '使用者已經是教練', next, responseCode.CONFLICT);
  }

  //201;
  try {
    const newCoach = await CoachRepo.create(coachData);
    Success(req, res, newCoach, responseCode.CREATED);
  } catch (error) {
    if (error instanceof Error) {
      return appError(req, error.message, next, 400);
    } else {
      return appError(req, '未知錯誤', next, 500);
    }
  }
});

const coachesController = {
  createCoach,
};

export default coachesController;
