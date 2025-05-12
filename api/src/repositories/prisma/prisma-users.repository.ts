import { User } from '@prisma/client';

import { prisma } from '../../libs/prisma';

import { UsersRepository } from '../users.repository';

import { hashPassword } from '../../helpers/password';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: { email: string; password: string }) {
    const hashedPassword = await hashPassword(data.password);
    return prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
