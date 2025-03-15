import { z } from 'zod';

import { validateData } from '../middleware/validateRequest';
/**
 * 定義  Schema。
 *
 */
export const CoachSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string({ required_error: '使用者 ID 為必填' }).uuid({ message: '使用者 ID 格式錯誤' }),
  experience_years: z
    .number({
      required_error: '教練年資為必填',
    })
    .int({ message: '教練年資必須是整數' }),
  description: z.string({
    required_error: '教練簡介為必填',
  }),
  profile_image_url: z
    .string()
    .regex(/\.(png|jpg)$/i, { message: '教練大頭需為圖片網址(.png, .jpg)' })
    .optional(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

// Create coach 時，需要欄位
export const CoachCreateSchema = CoachSchema.pick({
  experience_years: true,
  description: true,
  profile_image_url: true,
});

/**
 * - id: 必須為一個符合 UUID 格式的字串。
 */
export const CoachParamsUserID = z.object({
  userId: z.string().uuid({ message: 'ID錯誤,請輸入正確的格式' }),
});
/**
 * 定義新增操作參數驗證。
 * 用於驗證新增。
 */
export const CoachCreateValidated = [
  validateData(CoachCreateSchema, 'body'),
  validateData(CoachParamsUserID, 'params'),
];

export default {
  CoachSchema,
  CoachCreateValidated,
};
