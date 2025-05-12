import { FastifyRequest, FastifyReply } from 'fastify';

import { StoresRepository } from '../repositories/stores.repository';

import { getPaginationParams } from '../helpers/getPaginationParams';
import { getOrderDirection } from '../helpers/getOrderDirection';
import { buildNameFilter } from '../helpers/buildNameFilter';

import { StoreQueryParams } from '../types/store';

export function listStoresController(storesRepository: StoresRepository) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const query = request.query as StoreQueryParams;
    const { page, limit, offset } = getPaginationParams(query);

    const nameFilter = buildNameFilter(query.name);
    const orderDirection = getOrderDirection(query.order);

    const result = await storesRepository.findAllWithBalance({
      limit,
      offset,
      name: nameFilter,
      order: orderDirection,
    });

    return reply.send({
      page,
      limit,
      totalCount: result.totalCount,
      hasNextPage: result.hasNextPage,
      data: result.data,
    });
  };
}
