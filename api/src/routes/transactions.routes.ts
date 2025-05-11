import { FastifyInstance } from 'fastify';
import { uploadTransactionsController } from '../controllers/transactions.controller';

export async function transactionsRoutes(fastify: FastifyInstance) {
  fastify.post('/transactions/upload', uploadTransactionsController);
}
