import fastify from 'fastify';
import fastifyJwt from '@fastify/jwt';

import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users.repository';

import { loginController } from '../../controllers/login.controller';

export async function setupFastifyLogin() {
  const app = fastify();
  const usersRepository = new InMemoryUsersRepository();

  app.register(fastifyJwt, { secret: 'testsecret' });
  app.post('/auth/login', loginController(usersRepository));

  await app.ready();

  return { app, usersRepository };
}
