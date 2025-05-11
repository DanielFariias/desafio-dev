import { FastifyRequest, FastifyReply } from 'fastify';
import { Prisma } from '@prisma/client';

import { getPaginationParams } from '../helpers/getPaginationParams';
import { StoreQueryParams, StoreWithBalance } from '../types/store';
import { prisma } from '../libs/prisma';
import { buildNameFilter } from '../helpers/buildNameFilter';
import { getOrderDirection } from '../helpers/getOrderDirection';

export async function listStoresController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const query = request.query as StoreQueryParams;

  const { page, limit, offset } = getPaginationParams(query);

  const nameFilter = buildNameFilter(query.name);
  const orderDirection = getOrderDirection(query.order);

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
    ${nameFilter}
    GROUP BY s.id
    ORDER BY s.name ${Prisma.raw(orderDirection)}
    OFFSET ${Prisma.raw(String(offset))}
    LIMIT ${Prisma.raw(String(limit))}
  `);

  const countResult = await prisma.$queryRaw<
    Array<{ count: bigint }>
  >(Prisma.sql`
  SELECT COUNT(*)::bigint as count
  FROM "Store" s
  ${nameFilter}
`);

  const totalCount = Number(countResult[0]?.count ?? 0);
  const hasNextPage = page * limit < totalCount;

  const sanitizedStores = result.map((store) => ({
    ...store,
    balance: Number(store.balance ?? 0),
  }));

  return reply.status(200).send({
    page,
    limit,
    totalCount,
    hasNextPage,
    data: sanitizedStores,
  });
}
