import { FastifyInstance } from 'fastify';
import { describe, it, beforeEach, expect } from 'vitest';

import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users.repository';

import { setupFastifyRegister } from '../tests/helpers/setup-fastify-register';

describe('Register Controller', () => {
  let app: FastifyInstance;
  let usersRepository: InMemoryUsersRepository;

  beforeEach(async () => {
    ({ app, usersRepository } = await setupFastifyRegister());
  });

  it('should register a new user', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'test@example.com',
        password: '123456',
      },
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('User registered successfully');
  });

  it('should not allow duplicate email', async () => {
    await usersRepository.create({
      email: 'existing@example.com',
      password: '123456',
    });

    const response = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        email: 'existing@example.com',
        password: 'anotherpass',
      },
    });

    expect(response.statusCode).toBe(409);
    const body = JSON.parse(response.body);
    expect(body.error).toBe('User already exists');
  });
});
