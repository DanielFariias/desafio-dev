import { FastifyInstance } from 'fastify';

export async function authMiddleware(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    const publicRoutes = ['/auth/login', '/auth/register', '/docs'];

    const isPublic = publicRoutes.some((route) =>
      request.raw.url?.startsWith(route),
    );

    if (isPublic) return;

    try {
      await request.jwtVerify();
    } catch {
      return reply.status(401).send({ error: 'Unauthorized' });
    }
  });
}
