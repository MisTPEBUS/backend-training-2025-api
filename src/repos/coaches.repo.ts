import { User } from '@prisma/client';

import prisma from '../prisma';

export interface Coach {
  id: string;
  userId: string;
  experienceYears: number;
  description: string;
  profileImageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CoachWithUser extends Coach {
  user: Pick<User, 'name' | 'role'>;
}

export type CoachCreateInput = Pick<Coach, 'userId' | 'experienceYears' | 'description' | 'profileImageUrl'>;

export const CoachRepo = {
  getAll: async (): Promise<Coach[]> => {
    return await prisma.coach.findMany();
  },
  getByUserId: async (userId: string) => {
    const coachWithUser = await prisma.coach.findUnique({
      where: { userId },
      include: {
        user: {
          select: { name: true, role: true },
        },
      },
    });
    if (!coachWithUser) {
      throw new Error('找不到建立的 coach 資料建立失敗');
    }
    return coachWithUser;
  },
  create: async (coach: Omit<CoachCreateInput, 'id'>) => {
    return await prisma.coach.create({
      data: coach,
    });
  },
  deleteById: async (id: string): Promise<Coach> => {
    return await prisma.coach.delete({ where: { id } });
  },
};
