import { Transaction } from '@prisma/client';
import {
  CreateTransactionParams,
  FindTransactionByUniqueKeyParams,
} from '../types/transaction';

export interface TransactionsRepository {
  findByUniqueKey(
    data: FindTransactionByUniqueKeyParams,
  ): Promise<Transaction | null>;

  create(data: CreateTransactionParams): Promise<Transaction>;
}
