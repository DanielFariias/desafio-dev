import fastify from 'fastify';

import { InMemoryStoresRepository } from '../../repositories/in-memory/in-memory-stores.repository';
import { listStoresController } from '../../controllers/stores.controller';

export async function setupFastifyStores() {
  const app = fastify();
  const storesRepository = new InMemoryStoresRepository();

  app.get('/stores', listStoresController(storesRepository));

  await app.ready();

  return { app, storesRepository };
}
