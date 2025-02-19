import { z } from 'zod';

export const skillSchema = z.object({
  name: z.string(),
});

export const skillParamsID = z.object({
  skillId: z.string().uuid({ message: 'ID錯誤,請輸入正確的格式' }),
});
