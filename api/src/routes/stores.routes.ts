import { FastifyInstance } from 'fastify';
import { listStoresController } from '../controllers/stores.controller';
import { PrismaStoresRepository } from '../repositories/prisma/prisma-stores.repository';

export async function storesRoutes(fastify: FastifyInstance) {
  const storesRepository = new PrismaStoresRepository();

  fastify.get('/stores', listStoresController(storesRepository));
}
