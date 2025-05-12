import { describe, it, beforeEach, expect } from 'vitest';
import { FastifyInstance } from 'fastify';

import { InMemoryStoresRepository } from '../../src/repositories/in-memory/in-memory-stores.repository';

import { setupFastifyStores } from '../tests/helpers/setup-fastify-stores';

describe('Stores Controller', () => {
  let app: FastifyInstance;
  let storesRepository: InMemoryStoresRepository;

  beforeEach(async () => {
    ({ app, storesRepository } = await setupFastifyStores());
  });

  it('should return an empty list if no stores exist', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/stores',
    });

    const body = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(body.page).toBe(1);
    expect(body.limit).toBe(10);
    expect(body.totalCount).toBe(0);
    expect(body.hasNextPage).toBe(false);
    expect(body.data).toEqual([]);
  });

  it('should return a paginated list of stores', async () => {
    await storesRepository.create({ name: 'Store A', ownerName: 'Owner A' });
    await storesRepository.create({ name: 'Store B', ownerName: 'Owner B' });

    const response = await app.inject({
      method: 'GET',
      url: '/stores?page=1&limit=10',
    });

    const body = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(body.totalCount).toBe(2);
    expect(body.data.length).toBe(2);
  });

  it('should respect pagination parameters', async () => {
    for (let i = 1; i <= 15; i++) {
      await storesRepository.create({
        name: `Store ${i}`,
        ownerName: `Owner ${i}`,
      });
    }

    const response = await app.inject({
      method: 'GET',
      url: '/stores?page=2&limit=5',
    });

    const body = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(body.page).toBe(2);
    expect(body.limit).toBe(5);
    expect(body.data.length).toBe(5);
    expect(body.hasNextPage).toBe(true);
  });

  it('should filter stores by name', async () => {
    await storesRepository.create({ name: 'Super Store', ownerName: 'Alice' });
    await storesRepository.create({ name: 'Other Shop', ownerName: 'Bob' });

    const response = await app.inject({
      method: 'GET',
      url: '/stores?name=super',
    });

    const body = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(body.totalCount).toBe(1);
    expect(body.data[0].name).toBe('Super Store');
  });

  it('should sort stores by name ascending', async () => {
    await storesRepository.create({ name: 'Zeta Store', ownerName: 'Zoe' });
    await storesRepository.create({ name: 'Alpha Store', ownerName: 'Anna' });

    const response = await app.inject({
      method: 'GET',
      url: '/stores?order=asc',
    });

    const body = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(body.data[0].name).toBe('Alpha Store');
    expect(body.data[1].name).toBe('Zeta Store');
  });

  it('should sort stores by name descending', async () => {
    await storesRepository.create({ name: 'Zeta Store', ownerName: 'Zoe' });
    await storesRepository.create({ name: 'Alpha Store', ownerName: 'Anna' });

    const response = await app.inject({
      method: 'GET',
      url: '/stores?order=desc',
    });

    const body = JSON.parse(response.body);
    expect(response.statusCode).toBe(200);
    expect(body.data[0].name).toBe('Zeta Store');
    expect(body.data[1].name).toBe('Alpha Store');
  });
});
