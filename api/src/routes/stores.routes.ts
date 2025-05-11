import { FastifyInstance } from 'fastify';
import { PrismaStoresRepository } from '../repositories/prisma/prisma-stores.repository';
import { listStoresController } from '../controllers/stores.controller';

export async function storesRoutes(fastify: FastifyInstance) {
  const storesRepository = new PrismaStoresRepository();

  fastify.get('/stores', {
    schema: {
      description: 'Listar todas as lojas com saldo e paginação',
      tags: ['Stores'],
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1 },
          limit: { type: 'integer', minimum: 1 },
          name: { type: 'string' },
          order: { type: 'string', enum: ['asc', 'desc'] },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: {
            page: { type: 'integer' },
            limit: { type: 'integer' },
            totalCount: { type: 'integer' },
            hasNextPage: { type: 'boolean' },
            data: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  ownerName: { type: 'string' },
                  balance: { type: 'number' },
                },
              },
            },
          },
        },
      },
    },
    handler: listStoresController(storesRepository),
  });
}
