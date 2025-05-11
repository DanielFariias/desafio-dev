import { Store } from '@prisma/client';
import { randomUUID } from 'crypto';
import { FindAllWithBalanceParams } from '../../types/store';
import { StoresRepository } from '../stores.repository';

export class InMemoryStoresRepository implements StoresRepository {
  private stores: Store[] = [];

  async findByNameAndOwner(name: string, ownerName: string) {
    return (
      this.stores.find(
        (store) => store.name === name && store.ownerName === ownerName,
      ) ?? null
    );
  }

  async create(data: { name: string; ownerName: string }) {
    const store: Store = {
      id: randomUUID(),
      name: data.name,
      ownerName: data.ownerName,
    };

    this.stores.push(store);

    return store;
  }

  async findAllWithBalance({
    limit,
    name,
    order = 'asc',
    offset = 0,
  }: FindAllWithBalanceParams) {
    let filtered = this.stores;

    if (name?.text) {
      const filterValue = name.text.toLowerCase().replace(/%/g, '');
      filtered = filtered.filter((store) =>
        store.name.toLowerCase().includes(filterValue),
      );
    }

    const totalCount = filtered.length;

    filtered.sort((a, b) =>
      order.toLowerCase() === 'desc'
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name),
    );

    const paginated = filtered.slice(offset, offset + limit);

    return {
      data: paginated.map((store) => ({
        id: store.id,
        name: store.name,
        ownerName: store.ownerName,
        balance: 0,
      })),
      totalCount,
      hasNextPage: offset + paginated.length < totalCount,
    };
  }
}
