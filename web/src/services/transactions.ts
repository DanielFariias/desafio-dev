import type { TransactionResponse } from '../types/transaction';

import { api } from './api';

export async function fetchStoreTransactions(
  storeId: string
): Promise<TransactionResponse> {
  const response = await api.get<TransactionResponse>(
    `/stores/${storeId}/transactions`
  );
  return response.data;
}
