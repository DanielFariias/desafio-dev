import { User } from '@prisma/client';

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  create(data: { email: string; password: string }): Promise<User>;
}
