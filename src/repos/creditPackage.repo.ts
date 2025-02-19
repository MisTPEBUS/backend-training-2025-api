import { Prisma } from '@prisma/client';

import prisma from '../prisma';

export interface CreditPackage {
  id: string;
  name: string;
  credit_amount: number;
  price: Prisma.Decimal;
  created_at?: Date;
  updated_at?: Date;
}

export const CreditPackageRepo = {
  getAll: async (): Promise<CreditPackage[]> => {
    return await prisma.creditPackage.findMany();
  },
  getById: async (id: string): Promise<CreditPackage | null> => {
    return await prisma.creditPackage.findUnique({
      where: { id },
    });
  },
  getByName: async (name: string): Promise<CreditPackage | null> => {
    return await prisma.creditPackage.findUnique({
      where: { name },
    });
  },
  create: async (Skill: Omit<CreditPackage, 'id'>): Promise<CreditPackage> => {
    const newSkill = await prisma.creditPackage.create({
      data: Skill,
    });
    return newSkill;
  },
  deleteById: async (id: string): Promise<CreditPackage> => {
    return await prisma.creditPackage.delete({ where: { id } });
  },
};
