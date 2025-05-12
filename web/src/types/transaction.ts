export interface Transaction {
  id: string;
  type: string;
  value: number;
  card: string;
  cpf: string;
  date: string;
  transactionAt: string;
}

export interface TransactionResponse {
  page: number;
  limit: number;
  totalCount: number;
  hasNextPage: boolean;
  data: Transaction[];
}
