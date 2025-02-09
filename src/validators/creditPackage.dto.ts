import { z } from 'zod';

export const createCreditPackageSchema = z.object({
  name: z.string().min(1, { message: 'name為必填' }),
  credit_amount: z.number().int({ message: 'credit_amount 必須是整數' }),
  price: z.number().int({ message: 'price 必須是整數' }),
});

export default {
  createCreditPackageSchema,
};
