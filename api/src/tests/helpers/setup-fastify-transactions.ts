import fastify from 'fastify';
import fastifyMultipart from '@fastify/multipart';

import { InMemoryTransactionsRepository } from '../../repositories/in-memory/in-memory-transactions.repository';
import { InMemoryStoresRepository } from '../../repositories/in-memory/in-memory-stores.repository';
import {
  listTransactionsByStoreController,
  uploadTransactionsController,
} from '../../controllers/transactions.controller';

export async function setupFastifyTransactions() {
  const app = fastify();
  const storesRepository = new InMemoryStoresRepository();
  const transactionsRepository = new InMemoryTransactionsRepository();

  await app.register(fastifyMultipart);

  app.post(
    '/transactions/upload',
    uploadTransactionsController(storesRepository, transactionsRepository),
  );

  app.get(
    '/stores/:storeId/transactions',
    listTransactionsByStoreController(transactionsRepository),
  );

  await app.ready();

  return { app, storesRepository, transactionsRepository };
}
