import { FastifyInstance } from 'fastify';
import { listStoresController } from '../controllers/stores.controller';

export async function storesRoutes(fastify: FastifyInstance) {
  fastify.get('/stores', listStoresController);
}
