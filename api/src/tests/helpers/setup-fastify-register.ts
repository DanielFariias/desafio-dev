import fastify, { FastifyInstance } from 'fastify';

import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users.repository';

import { registerController } from '../../controllers/register.controller';

export async function setupFastifyRegister(): Promise<{
  app: FastifyInstance;
  usersRepository: InMemoryUsersRepository;
}> {
  const app = fastify();
  const usersRepository = new InMemoryUsersRepository();

  app.post('/auth/register', registerController(usersRepository));

  await app.ready();

  return { app, usersRepository };
}
