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

  async findByStoreId(
    storeId: string,
    {
      page,
      limit,
      order = 'desc',
    }: { page: number; limit: number; order?: 'asc' | 'desc' },
  ) {
    const offset = (page - 1) * limit;

    const [data, totalCount] = await Promise.all([
      prisma.transaction.findMany({
        where: { storeId },
        orderBy: { transactionAt: order },
        skip: offset,
        take: limit,
      }),
      prisma.transaction.count({ where: { storeId } }),
    ]);

    return {
      data,
      totalCount,
      hasNextPage: offset + data.length < totalCount,
    };
  }
}
