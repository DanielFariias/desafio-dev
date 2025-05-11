import { prisma } from '../../libs/prisma';
import {
  CreateTransactionParams,
  FindTransactionByUniqueKeyParams,
} from '../../types/transaction';
import { TransactionsRepository } from '../transactions.repository';

export class PrismaTransactionsRepository implements TransactionsRepository {
  async findByUniqueKey({
    storeId,
    transactionAt,
    card,
    cpf,
    type,
  }: FindTransactionByUniqueKeyParams) {
    return prisma.transaction.findFirst({
      where: {
        storeId,
        transactionAt,
        card,
        cpf,
        type,
      },
    });
  }

  async create(data: CreateTransactionParams) {
    return prisma.transaction.create({ data });
  }
}
