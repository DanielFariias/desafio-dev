import { FastifyRequest, FastifyReply } from 'fastify';
import { pipeline } from 'stream/promises';
import split2 from 'split2';

import { parseCNABLine } from '../helpers/parseCNABLine';

import { prisma } from '../libs/prisma';

export async function uploadTransactionsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = await request.file();

  if (!data) {
    return reply.status(400).send({ error: 'File is required' });
  }

  let totalTransactions = 0;

  await pipeline(data.file, split2(), async (source) => {
    for await (const line of source) {
      if (!line) continue;

      const parsed = parseCNABLine(line.toString());

      let store = await prisma.store.findFirst({
        where: {
          name: parsed.storeName,
          ownerName: parsed.storeOwner,
        },
      });

      if (!store) {
        store = await prisma.store.create({
          data: {
            name: parsed.storeName,
            ownerName: parsed.storeOwner,
          },
        });
      }

      await prisma.transaction.create({
        data: {
          type: parsed.type,
          transactionAt: parsed.transactionAt,
          value: parsed.value,
          cpf: parsed.cpf,
          card: parsed.card,
          storeId: store.id,
        },
      });

      totalTransactions++;
    }
  });

  return reply.status(201).send({
    message: 'File processed successfully',
    totalTransactions,
  });
}
