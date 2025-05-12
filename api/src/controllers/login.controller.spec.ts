import { fastify, FastifyInstance } from 'fastify';
import { describe, it, beforeEach, expect } from 'vitest';
import fastifyJwt from '@fastify/jwt';

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository';

import { setupFastifyLogin } from '../tests/helpers/setup-fastify-login';

import { authMiddleware } from '../plugins/auth';

describe('Login Controller', () => {
  let app: FastifyInstance;
  let usersRepository: InMemoryUsersRepository;

  beforeEach(async () => {
    ({ app, usersRepository } = await setupFastifyLogin());
  });

  it('should login with valid credentials', async () => {
    await usersRepository.create({
      email: 'admin@admin.com',
      password: 'admin123',
    });

    const response = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'admin@admin.com',
        password: 'admin123',
      },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('access_token');
  });

  it('should return 401 with invalid credentials', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: 'invalid@user.com',
        password: 'wrongpassword',
      },
    });

    expect(response.statusCode).toBe(401);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('error', 'Invalid credentials');
  });

  it('should block access to private routes without token', async () => {
    const privateApp = fastify();
    privateApp.register(fastifyJwt, { secret: 'testsecret' });

    await authMiddleware(privateApp);

    privateApp.get('/private', async () => ({ message: 'ok' }));

    await privateApp.ready();

    const response = await privateApp.inject({
      method: 'GET',
      url: '/private',
    });

    expect(response.statusCode).toBe(401);
  });

  it('should allow access to private routes with valid token', async () => {
    const privateApp = fastify();
    privateApp.register(fastifyJwt, { secret: 'testsecret' });

    await authMiddleware(privateApp);

    privateApp.get('/private', async () => ({ message: 'ok' }));

    await privateApp.ready();

    const token = privateApp.jwt.sign({ sub: 'user-id' });

    const response = await privateApp.inject({
      method: 'GET',
      url: '/private',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body).toEqual({ message: 'ok' });
  });
});
