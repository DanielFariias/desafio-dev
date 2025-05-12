import { FastifyInstance } from 'fastify';
import { transactionsRoutes } from './routes/transactions.routes';
import { storesRoutes } from './routes/stores.routes';
import { setupSwagger } from './plugins/swagger';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { env } from './config/env';
import { authMiddleware } from './plugins/auth';
import { authRoutes } from './routes/auth.routes';

export async function app(fastify: FastifyInstance) {
  await fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET,
  });

  await fastify.register(fastifyCors, {
    origin: '*',
  });

  await setupSwagger(fastify);

  await authMiddleware(fastify);

  fastify.register(authRoutes);

  fastify.register(transactionsRoutes);
  fastify.register(storesRoutes);

  fastify.setErrorHandler((error, _, reply) => {
    fastify.log.error(error);

    reply.status(500).send({
      statusCode: 500,
      message: 'Internal server error. Please try again later.',
    });
  });
}
