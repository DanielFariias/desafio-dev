import { prisma } from '../../libs/prisma';
import { FindAllWithBalanceParams, StoreWithBalance } from '../../types/store';
import { StoresRepository } from '../stores.repository';
import { Prisma } from '@prisma/client';

export class PrismaStoresRepository implements StoresRepository {
  async findByNameAndOwner(name: string, ownerName: string) {
    return prisma.store.findFirst({
      where: {
        name,
        ownerName,
      },
    });
  }

  async create(data: { name: string; ownerName: string }) {
    return prisma.store.create({ data });
  }

  async findAllWithBalance({
    limit,
    name,
    order = 'asc',
    offset = 0,
  }: FindAllWithBalanceParams) {
    const result = await prisma.$queryRaw<StoreWithBalance[]>(Prisma.sql`
      SELECT
        s.id,
        s.name,
        s."ownerName",
        COALESCE(SUM(CASE 
          WHEN t.type IN ('DEBIT','CREDIT','LOAN_RECEIPT','SALE','TED_RECEIPT','DOC_RECEIPT') THEN t.value
          WHEN t.type IN ('BANK_SLIP','FINANCING','RENT') THEN -t.value
          ELSE 0
        END), 0) AS balance
      FROM "Store" s
      LEFT JOIN "Transaction" t ON t."storeId" = s.id
      ${name}
      GROUP BY s.id
      ORDER BY s.name ${Prisma.raw(order)}
      OFFSET ${Prisma.raw(String(offset))}
      LIMIT ${Prisma.raw(String(limit))}
    `);

    const totalCountResult = await prisma.$queryRaw<{ count: bigint }[]>`
      SELECT COUNT(*)::bigint as count FROM "Store" s ${name}
    `;

    const totalCount = Number(totalCountResult[0]?.count ?? 0);
    const hasNextPage = offset + result.length < totalCount;

    return {
      data: result.map((store) => ({
        ...store,
        balance: Number(store.balance ?? 0),
      })),
      totalCount,
      hasNextPage,
    };
  }
}
