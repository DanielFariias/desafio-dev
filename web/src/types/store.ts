export interface Store {
  id: string;
  name: string;
  ownerName: string;
  balance: number;
}

export interface StoreResponse {
  page: number;
  limit: number;
  totalCount: number;
  hasNextPage: boolean;
  data: Store[];
}
