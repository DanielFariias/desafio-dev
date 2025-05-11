import { FastifyInstance } from 'fastify';
import { uploadTransactionsController } from '../controllers/transactions.controller';
import { PrismaStoresRepository } from '../repositories/prisma/prisma-stores.repository';
import { PrismaTransactionsRepository } from '../repositories/prisma/prisma-transactions.repository';

export async function transactionsRoutes(fastify: FastifyInstance) {
  const storesRepository = new PrismaStoresRepository();
  const transactionsRepository = new PrismaTransactionsRepository();

  fastify.post(
    '/transactions/upload',
    uploadTransactionsController(storesRepository, transactionsRepository),
  );
}
