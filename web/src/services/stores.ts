import { api } from './api';

export interface Store {
  id: string;
  name: string;
  ownerName: string;
  balance: number;
}

interface StoreResponse {
  page: number;
  limit: number;
  totalCount: number;
  hasNextPage: boolean;
  data: Store[];
}

export async function fetchStores(): Promise<StoreResponse> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await api.get<StoreResponse>('/stores');

  return response.data;
}
