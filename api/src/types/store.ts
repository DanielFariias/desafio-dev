export type StoreWithBalance = {
  id: string;
  name: string;
  ownerName: string;
  balance: number | null;
};

export type StoreQueryParams = {
  name?: string;
  order?: string;
  page?: number;
  limit?: number;
};
