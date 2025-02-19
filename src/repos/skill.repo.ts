import prisma from '../prisma';

export interface CreditPackage {
  id: string;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

export const SkillRepo = {
  getAll: async (): Promise<CreditPackage[]> => {
    return await prisma.skill.findMany();
  },
  getByName: async (name: string): Promise<CreditPackage | null> => {
    return await prisma.skill.findUnique({
      where: { name },
    });
  },
  getById: async (id: string): Promise<CreditPackage | null> => {
    return await prisma.skill.findUnique({
      where: { id },
    });
  },
  create: async (Skill: Omit<CreditPackage, 'id'>): Promise<CreditPackage> => {
    const newSkill = await prisma.skill.create({
      data: Skill,
    });
    return newSkill;
  },
  deleteById: async (id: string): Promise<CreditPackage> => {
    return await prisma.skill.delete({ where: { id } });
  },
};
