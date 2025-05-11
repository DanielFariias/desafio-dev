import fastifyMultipart from '@fastify/multipart';
import { FastifyInstance } from 'fastify';
import { transactionsRoutes } from './routes/transactions.routes';

export async function app(fastify: FastifyInstance) {
  fastify.register(fastifyMultipart);

  fastify.get('/', async () => {
    return { message: 'Hello World!' };
  });

  fastify.register(transactionsRoutes);
}
