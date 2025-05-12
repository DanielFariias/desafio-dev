import { FastifyRequest, FastifyReply } from 'fastify';
import { pipeline } from 'stream/promises';
import split2 from 'split2';

import { TransactionsRepository } from '../repositories/transactions.repository';
import { StoresRepository } from '../repositories/stores.repository';

import { getPaginationParams } from '../helpers/getPaginationParams';
import { parseCNABLine } from '../helpers/parseCNABLine';

import { isPrismaDuplicateError } from '../utils/isPrismaDuplicateError';

import { StoreQueryParams } from '../types/store';

export function uploadTransactionsController(
  storesRepository: StoresRepository,
  transactionsRepository: TransactionsRepository,
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ error: 'File is required' });
    }

    let totalTransactions = 0;
    let duplicatedTransactions = 0;
    let invalidLines = 0;

    await pipeline(data.file, split2(), async (source) => {
      for await (const line of source) {
        if (!line) continue;

        let parsed;
        try {
          parsed = parseCNABLine(line.toString());
        } catch {
          invalidLines++;
          continue;
        }

        let store = await storesRepository.findByNameAndOwner(
          parsed.storeName,
          parsed.storeOwner,
        );

        if (!store) {
          store = await storesRepository.create({
            name: parsed.storeName,
            ownerName: parsed.storeOwner,
          });
        }

        try {
          await transactionsRepository.create({
            type: parsed.type,
            transactionAt: parsed.transactionAt,
            value: parsed.value,
            cpf: parsed.cpf,
            card: parsed.card,
            storeId: store.id,
          });

          totalTransactions++;
        } catch (error) {
          if (isPrismaDuplicateError(error)) {
            duplicatedTransactions++;
          } else {
            throw error;
          }
        }
      }
    });

    return reply.status(201).send({
      message: 'File processed successfully',
      inserted: totalTransactions,
      duplicates: duplicatedTransactions,
      invalid: invalidLines,
    });
  };
}

export function listTransactionsByStoreController(
  transactionsRepository: TransactionsRepository,
) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { storeId } = request.params as { storeId: string };

    const query = request.query as StoreQueryParams;
    const { page, limit } = getPaginationParams(query);

    const result = await transactionsRepository.findByStoreId(storeId, {
      page: Number(page),
      limit: Number(limit),
      order: query.order === 'asc' ? 'asc' : 'desc',
    });

    return reply.send({
      page: Number(page),
      limit: Number(limit),
      totalCount: result.totalCount,
      hasNextPage: result.hasNextPage,
      data: result.data,
    });
  };
}
