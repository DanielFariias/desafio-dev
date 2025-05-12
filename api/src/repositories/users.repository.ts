import { User } from '@prisma/client';

export interface UsersRepository {
  create(data: { email: string; password: string }): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
