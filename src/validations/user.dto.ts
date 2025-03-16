import { z } from 'zod';
export const userSchema = z.object({
  name: z
    .string({
      required_error: 'name 為必填',
    })
    .min(2, { message: '使用者名稱至少需要2個字' })
    .max(10, { message: '使用者名稱最多10個字' })
    .regex(/^[A-Za-z0-9\u4e00-\u9fff]+$/, { message: '使用者名稱不可包含特殊符號與空白' }),

  email: z
    .string({
      required_error: 'email 為必填',
    })
    .email({ message: '請輸入正確的電子信箱格式' }),
  password: z
    .string({
      required_error: 'email 為必填',
    })
    .min(8, { message: '密碼至少需要8個字' })
    .max(16, { message: '密碼最多16個字' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/, {
      message: '密碼必須包含大寫字母、小寫字母以及數字',
    }),
});

export const userUpdateSchema = userSchema.pick({
  name: true,
});

export const userLoginSchema = userSchema.pick({
  email: true,
  password: true,
});
