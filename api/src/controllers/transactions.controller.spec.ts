import { fastify, FastifyInstance } from 'fastify';
import { describe, it, beforeEach, expect } from 'vitest';
import multipart from '@fastify/multipart';
import { Readable } from 'stream';
import FormData from 'form-data';

import { uploadTransactionsController } from './transactions.controller';

import { InMemoryTransactionsRepository } from '../repositories/in-memory/in-memory-transactions.repository';
import { InMemoryStoresRepository } from '../repositories/in-memory/in-memory-stores.repository';

import { setupFastifyTransactions } from '../tests/helpers/setup-fastify-transactions';

const sampleCNABLine =
  '1201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO        \n';

const multipleCNABLines = [
  '1201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO        ',
  '4201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO        ',
  '7201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO        ',
].join('\n');

function createUploadForm(content: string) {
  const form = new FormData();
  form.append('file', Readable.from([content]), { filename: 'file.txt' });
  return form;
}

describe('Transactions Controller', () => {
  let app: FastifyInstance;
  let transactionsRepository: InMemoryTransactionsRepository;

  beforeEach(async () => {
    ({ app, transactionsRepository } = await setupFastifyTransactions());
  });

  it('should process CNAB lines and store transactions', async () => {
    const form = createUploadForm(`${sampleCNABLine}\n`);

    const response = await app.inject({
      method: 'POST',
      url: '/transactions/upload',
      headers: form.getHeaders(),
      payload: form,
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);

    expect(body.inserted).toBeGreaterThanOrEqual(1);
    expect(body.duplicates).toBe(0);
  });

  it('should return 400 if no file field is sent', async () => {
    const form = new FormData();
    form.append('dummy', 'value');

    const response = await app.inject({
      method: 'POST',
      url: '/transactions/upload',
      headers: form.getHeaders(),
      payload: form,
    });

    expect(response.statusCode).toBe(400);
    const body = JSON.parse(response.body);
    expect(body).toHaveProperty('error', 'File is required');
  });

  it('should detect and count duplicate transactions', async () => {
    const form1 = createUploadForm(`${sampleCNABLine}\n`);

    const firstResponse = await app.inject({
      method: 'POST',
      url: '/transactions/upload',
      headers: form1.getHeaders(),
      payload: form1,
    });

    expect(firstResponse.statusCode).toBe(201);
    const firstBody = JSON.parse(firstResponse.body);
    expect(firstBody.inserted).toBeGreaterThanOrEqual(1);
    expect(firstBody.duplicates).toBe(0);

    const form2 = createUploadForm(`${sampleCNABLine}\n`);

    const secondResponse = await app.inject({
      method: 'POST',
      url: '/transactions/upload',
      headers: form2.getHeaders(),
      payload: form2,
    });

    expect(secondResponse.statusCode).toBe(201);
    const secondBody = JSON.parse(secondResponse.body);
    expect(secondBody.inserted).toBe(0);
    expect(secondBody.duplicates).toBeGreaterThanOrEqual(1);
  });

  it('should process multiple CNAB lines in a single upload', async () => {
    const form = createUploadForm(multipleCNABLines);

    const response = await app.inject({
      method: 'POST',
      url: '/transactions/upload',
      headers: form.getHeaders(),
      payload: form,
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);

    expect(body.inserted).toBe(3);
    expect(body.duplicates).toBe(0);
  });

  it('should ignore empty lines in CNAB file', async () => {
    const cnabContent = ['', sampleCNABLine, ''].join('\n');

    const form = createUploadForm(cnabContent);

    const response = await app.inject({
      method: 'POST',
      url: '/transactions/upload',
      headers: form.getHeaders(),
      payload: form,
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);

    expect(body.inserted).toBe(1);
    expect(body.duplicates).toBe(0);
  });

  it('should count invalid lines', async () => {
    const cnabContent = ['123', sampleCNABLine, '999'].join('\n');

    const form = createUploadForm(cnabContent);

    const response = await app.inject({
      method: 'POST',
      url: '/transactions/upload',
      headers: form.getHeaders(),
      payload: form,
    });

    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.body);

    expect(body.inserted).toBe(1);
    expect(body.duplicates).toBe(0);
    expect(body.invalid).toBe(2);
  });

  it('should return 500 if repository throws unexpected error', async () => {
    const failingTransactionsRepository = {
      create: () => {
        throw new Error('Unexpected error');
      },
      findByUniqueKey: async () => null,
      findByStoreId: async () => ({
        data: [],
        totalCount: 0,
        hasNextPage: false,
      }),
    };
    const storesRepository = new InMemoryStoresRepository();

    const localApp = fastify();
    await localApp.register(multipart);

    localApp.post(
      '/transactions/upload',
      uploadTransactionsController(
        storesRepository,
        failingTransactionsRepository,
      ),
    );

    await localApp.ready();

    const form = createUploadForm(`${sampleCNABLine}\n`);

    const response = await localApp.inject({
      method: 'POST',
      url: '/transactions/upload',
      headers: form.getHeaders(),
      payload: form,
    });

    expect(response.statusCode).toBe(500);
  });

  it('should return empty array if no transactions', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/stores/test-store-id/transactions`,
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.data).toEqual([]);
  });

  it('should return paginated transactions', async () => {
    const storeId = 'store-123';

    for (let i = 0; i < 15; i++) {
      await transactionsRepository.create({
        type: 'DEBIT',
        transactionAt: new Date(
          `2024-05-${String(i + 1).padStart(2, '0')}T00:00:00Z`,
        ),
        value: 100,
        cpf: '12345678901',
        card: '123456789012',
        storeId,
      });
    }

    const response = await app.inject({
      method: 'GET',
      url: `/stores/${storeId}/transactions?page=2&limit=5&order=asc`,
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.page).toBe(2);
    expect(body.limit).toBe(5);
    expect(body.data.length).toBe(5);
    expect(body.totalCount).toBe(15);
  });
});
