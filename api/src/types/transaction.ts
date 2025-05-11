import { TransactionType } from '@prisma/client';

export type FindTransactionByUniqueKeyParams = {
  storeId: string;
  transactionAt: Date;
  card: string;
  cpf: string;
  type: TransactionType;
};

export type CreateTransactionParams = {
  type: TransactionType;
  transactionAt: Date;
  value: number;
  cpf: string;
  card: string;
  storeId: string;
};
