import { TransactionsRepository } from '../transactions.repository';
import { Transaction } from '@prisma/client';
import { randomUUID } from 'crypto';
import {
  CreateTransactionParams,
  FindTransactionByUniqueKeyParams,
} from '../../types/transaction';

export class InMemoryTransactionsRepository implements TransactionsRepository {
  private transactions: Transaction[] = [];

  async findByUniqueKey({
    storeId,
    transactionAt,
    card,
    cpf,
    type,
  }: FindTransactionByUniqueKeyParams) {
    return (
      this.transactions.find(
        (tx) =>
          tx.storeId === storeId &&
          tx.transactionAt.getTime() === transactionAt.getTime() &&
          tx.card === card &&
          tx.cpf === cpf &&
          tx.type === type,
      ) ?? null
    );
  }

  async create(data: CreateTransactionParams) {
    const exists = await this.findByUniqueKey({
      storeId: data.storeId,
      transactionAt: data.transactionAt,
      card: data.card,
      cpf: data.cpf,
      type: data.type,
    });

    if (exists) {
      throw { code: 'P2002' };
    }

    const transaction: Transaction = {
      id: randomUUID(),
      storeId: data.storeId,
      type: data.type,
      transactionAt: data.transactionAt,
      value: data.value,
      cpf: data.cpf,
      card: data.card,
    };

    this.transactions.push(transaction);
    return transaction;
  }
}
