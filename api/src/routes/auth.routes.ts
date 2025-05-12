import { FastifyInstance } from 'fastify';

import { PrismaUsersRepository } from '../repositories/prisma/prisma-users.repository';

import { registerController } from '../controllers/register.controller';
import { loginController } from '../controllers/login.controller';

export async function authRoutes(fastify: FastifyInstance) {
  const usersRepository = new PrismaUsersRepository();

  fastify.post('/auth/register', {
    schema: {
      tags: ['Auth'],
      summary: 'Register new user',
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
          },
          password: { type: 'string', minLength: 6 },
        },
      },
      response: {
        201: {
          description: 'User created successfully',
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
          },
        },
        409: {
          description: 'User already exists',
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    handler: registerController(usersRepository),
  });

  fastify.post('/auth/login', {
    schema: {
      description: 'Realiza login do usuário',
      tags: ['Auth'],
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            access_token: { type: 'string' },
          },
        },
      },
    },
    handler: loginController(usersRepository),
  });
}
