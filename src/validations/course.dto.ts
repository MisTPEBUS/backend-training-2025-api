import { z } from 'zod';

export const courseSchema = z.object({
  user_id: z.string().uuid({ message: 'user_id 必須是有效的 UUID' }),
  skill_id: z.string().uuid({ message: 'skill_id 必須是有效的 UUID' }),
  name: z.string().min(1, { message: '課程名稱不可為空' }),
  description: z.string().min(1, { message: '課程介紹不可為空' }),
  start_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'start_at 必須是有效的日期時間格式 (YYYY-MM-DD HH:mm:ss)',
  }),
  end_at: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'end_at 必須是有效的日期時間格式 (YYYY-MM-DD HH:mm:ss)',
  }),
  max_participants: z
    .number()
    .int({ message: '最大上課人數必須是整數' })
    .positive({ message: '最大上課人數必須大於 0' }),
  meeting_url: z.string().url({ message: 'meeting_url 必須是有效的 URL' }).optional(),
});

// Create course 時，需要欄位
export const courseCreateSchema = courseSchema.pick({
  user_id: true,
  skill_id: true,
  name: true,
  description: true,
  start_at: true,
  end_at: true,
  max_participants: true,
  meeting_url: true,
});

export default {
  courseCreateSchema,
};
