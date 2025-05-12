import { User } from '@prisma/client';
import { randomUUID } from 'crypto';

import { UsersRepository } from '../users.repository';

import { hashPassword } from '../../helpers/password';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(data: { email: string; password: string }) {
    const hashedPassword = await hashPassword(data.password);

    const user = {
      id: randomUUID(),
      email: data.email,
      password: hashedPassword,
    };

    this.users.push(user);
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }
}
