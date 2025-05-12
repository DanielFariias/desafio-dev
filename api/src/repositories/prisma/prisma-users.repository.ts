import { prisma } from '../../libs/prisma';
import { UsersRepository } from '../users.repository';
import { User } from '@prisma/client';

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: { email: string; password: string }): Promise<User> {
    return prisma.user.create({ data });
  }
}
