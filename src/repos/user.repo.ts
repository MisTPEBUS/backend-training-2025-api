import prisma from '../prisma';

export type Role = 'USER' | 'COACH';

export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}
export const UserRepo = {
  getAll: async (): Promise<User[]> => {
    return await prisma.user.findMany();
  },
  findOneByLogin: async (email: string, password: string): Promise<Pick<User, 'id' | 'name'> | null> => {
    return await prisma.user.findFirst({
      where: {
        email,
        password,
      },
      select: { id: true, name: true },
    });
  },

  getById: async (id: string): Promise<Pick<User, 'email' | 'name'> | null> => {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        email: true,
        name: true,
      },
    });
  },
  getByEmail: async (email: string): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },
  updateNameById: async (name: string, id: string): Promise<User | null> => {
    return await prisma.user.update({
      where: { id },
      data: { name },
    });
  },
  create: async (user: Omit<User, 'id'>): Promise<Pick<User, 'id' | 'name'>> => {
    const newUser = await prisma.user.create({
      data: {
        ...user,
        role: user.role ?? 'USER', //預設為 "user"
      },
      select: {
        id: true,
        name: true,
      },
    });
    return newUser;
  },
  updateRoleByID: async (id: string, role: Role) => {
    return await prisma.user.update({
      where: { id },
      data: { role },
    });
  },

  deleteById: async (id: string): Promise<User> => {
    return await prisma.user.delete({ where: { id } });
  },
};
