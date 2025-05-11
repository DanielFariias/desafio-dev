import { StoreQueryParams } from '../types/store';

export function getPaginationParams(params: StoreQueryParams) {
  const { page = 1, limit = 10 } = params;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);

  const safePage = !isNaN(pageNumber) && pageNumber > 0 ? pageNumber : 1;
  const safeLimit = !isNaN(limitNumber) && limitNumber > 0 ? limitNumber : 10;

  const offset = (safePage - 1) * safeLimit;

  return { page: safePage, limit: safeLimit, offset };
}
