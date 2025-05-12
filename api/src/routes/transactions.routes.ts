import { FastifyInstance } from 'fastify';
import { PrismaStoresRepository } from '../repositories/prisma/prisma-stores.repository';
import { PrismaTransactionsRepository } from '../repositories/prisma/prisma-transactions.repository';
import {
  listTransactionsByStoreController,
  uploadTransactionsController,
} from '../controllers/transactions.controller';
import fastifyMultipart from '@fastify/multipart';

export async function transactionsRoutes(fastify: FastifyInstance) {
  await fastify.register(fastifyMultipart);

  const storesRepository = new PrismaStoresRepository();
  const transactionsRepository = new PrismaTransactionsRepository();

  fastify.post('/transactions/upload', {
    schema: {
      description: 'Upload CNAB (.txt) via multipart/form-data. Campo: file',
      tags: ['Transactions'],
      security: [{ bearerAuth: [] }],
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

  fastify.get('/stores/:storeId/transactions', {
    schema: {
      description: 'Listar transações de uma loja específica',
      tags: ['Transactions'],
      security: [{ bearerAuth: [] }],
      params: {
        type: 'object',
        properties: {
          storeId: { type: 'string' },
        },
        required: ['storeId'],
      },
      querystring: {
        type: 'object',
        properties: {
          page: { type: 'integer', minimum: 1 },
          limit: { type: 'integer', minimum: 1 },
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
                  storeId: { type: 'string' },
                  transactionAt: { type: 'string', format: 'date-time' },
                  value: { type: 'number' },
                  cpf: { type: 'string' },
                  card: { type: 'string' },
                  type: { type: 'string' },
                },
              },
            },
          },
        },
      },
    },
    handler: listTransactionsByStoreController(transactionsRepository),
  });
}
