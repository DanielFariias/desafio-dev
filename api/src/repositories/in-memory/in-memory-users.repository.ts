import { UsersRepository } from '../users.repository';
import { User } from '@prisma/client';
import { randomUUID } from 'crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  async create(data: { email: string; password: string }): Promise<User> {
    const user: User = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
    };

    this.users.push(user);
    return user;
  }
}
