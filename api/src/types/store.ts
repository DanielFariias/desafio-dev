import { Prisma } from '@prisma/client';

export type StoreWithBalance = {
  id: string;
  name: string;
  ownerName: string;
  balance: number | null;
};

export type StoreQueryParams = {
  name?: string;
  order?: string;
  page?: number;
  limit?: number;
};

export type FindAllWithBalanceParams = {
  name: Prisma.Sql;
  order: string;
  limit: number;
  offset: number;
};
