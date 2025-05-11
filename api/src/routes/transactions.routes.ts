import { FastifyInstance } from 'fastify';
import { PrismaStoresRepository } from '../repositories/prisma/prisma-stores.repository';
import { PrismaTransactionsRepository } from '../repositories/prisma/prisma-transactions.repository';
import { uploadTransactionsController } from '../controllers/transactions.controller';

export async function transactionsRoutes(fastify: FastifyInstance) {
  const storesRepository = new PrismaStoresRepository();
  const transactionsRepository = new PrismaTransactionsRepository();

  fastify.post('/transactions/upload', {
    schema: {
      description: 'Upload CNAB (.txt) via multipart/form-data. Campo: file',
      tags: ['Transactions'],
      consumes: ['multipart/form-data'],
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            inserted: { type: 'integer' },
            duplicates: { type: 'integer' },
            invalid: { type: 'integer' },
          },
        },
      },
    },
    handler: uploadTransactionsController(
      storesRepository,
      transactionsRepository,
    ),
  });
}
