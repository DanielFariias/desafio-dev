import { Store } from '@prisma/client';
import { FindAllWithBalanceParams, StoreWithBalance } from '../types/store';

export interface StoresRepository {
  create(data: { name: string; ownerName: string }): Promise<Store>;
  findAllWithBalance(params: FindAllWithBalanceParams): Promise<{
    data: StoreWithBalance[];
    totalCount: number;
    hasNextPage: boolean;
  }>;
}
