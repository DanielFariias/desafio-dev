import { FastifyInstance } from 'fastify';

export default async function app(fastify: FastifyInstance) {
  fastify.get('/hello', async () => {
    return { message: 'Hello World!' };
  });
}
