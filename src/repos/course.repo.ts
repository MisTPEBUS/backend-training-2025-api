import prisma from '../prisma';

export interface Course {
  id: string;
  userId: string;
  skillId: string;
  name: string;
  description: string;
  startAt: Date;
  endAt: Date;
  maxParticipants: number;
  meetingUrl?: string; // 直播網址可選
  createdAt: Date;
  updatedAt: Date;
  coachLinkSkillId?: string | null; // 教練關聯 ID 可為 null
}

export type CourseCreateInput = Omit<Course, 'id' | 'createdAt' | 'updatedAt'> & {
  meetingUrl: string | null; // 明確設定為 string | null，避免 undefined
  coachLinkSkillId?: string | null;
};

export const CourseRepo = {
  //  取得所有課程 (包含 user 名字、skill 相關資訊)
  getAll: async (): Promise<Course[]> => {
    return await prisma.course.findMany({
      include: {
        user: {
          select: { name: true },
        },
        skill: true,
      },
    });
  },
  /* 
  //  ID 取得課程
  getById: async (id: string): Promise<CourseWithRelations | null> => {
    return await prisma.course.findUnique({
      where: { id },
      include: {
        user: { select: { name: true } },
        skill: true,
      },
    });
  },

  // ID 取得課程
  getByUserId: async (userId: string): Promise<CourseWithRelations[]> => {
    return await prisma.course.findMany({
      where: { userId },
      include: {
        user: { select: { name: true } },
        skill: true,
      },
    });
  },
 */
  //創建課程
  create: async (courseData: CourseCreateInput): Promise<Course> => {
    return await prisma.course.create({
      data: {
        ...courseData,
        meetingUrl: courseData.meetingUrl ?? '',
      },
    });
  },

  /*   // 更新課程
  updateById: async (id: string, data: Partial<CourseCreateInput>): Promise<Course | null> => {
    return await prisma.course.update({
      where: { id },
      data,
    });
  },

  //刪除課程
  deleteById: async (id: string): Promise<Course> => {
    return await prisma.course.delete({ where: { id } });
  } */
};
