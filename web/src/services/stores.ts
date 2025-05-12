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

export interface Transaction {
  id: string;
  type: string;
  value: number;
  card: string;
  cpf: string;
  date: string;
  transactionAt: string;
}

interface TransactionResponse {
  page: number;
  limit: number;
  totalCount: number;
  hasNextPage: boolean;
  data: Transaction[];
}

export async function fetchStores(): Promise<StoreResponse> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await api.get<StoreResponse>('/stores');

  return response.data;
}

export async function fetchStoreTransactions(
  storeId: string
): Promise<TransactionResponse> {
  const response = await api.get<TransactionResponse>(
    `/stores/${storeId}/transactions`
  );
  return response.data;
}
