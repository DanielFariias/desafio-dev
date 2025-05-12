import { FastifyInstance } from 'fastify';
import { loginController } from '../controllers/auth.controller';
import { PrismaUsersRepository } from '../repositories/prisma/prisma-users.repository';

export async function authRoutes(fastify: FastifyInstance) {
  const usersRepository = new PrismaUsersRepository();

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
