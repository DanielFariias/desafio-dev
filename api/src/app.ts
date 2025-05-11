import fastifyMultipart from '@fastify/multipart';
import { FastifyInstance } from 'fastify';
import { transactionsRoutes } from './routes/transactions.routes';
import { storesRoutes } from './routes/stores.routes';

export async function app(fastify: FastifyInstance) {
  fastify.register(fastifyMultipart);

  fastify.get('/', async () => {
    return { message: 'Hello World!' };
  });

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
