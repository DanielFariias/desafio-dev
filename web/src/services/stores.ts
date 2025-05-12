import type { StoreResponse } from '../types/store';

import { sleep } from '../utils/sleep';

import { api } from './api';

export async function fetchStores(): Promise<StoreResponse> {
  await sleep();

  const response = await api.get<StoreResponse>('/stores');

  return response.data;
}
