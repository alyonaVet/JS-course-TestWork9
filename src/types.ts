export interface CategoryType {
  id: string;
  type: string;
  name: string;
}

export type ApiCategoryType = Omit<CategoryType, 'id'>;

export interface ApiCategories {
  [id: string]: ApiCategoryType;
}

export interface UpdateCategoryType {
  id: string;
  category: ApiCategoryType;
}

export interface TransactionType {
  category: string;
  amount: number;
  createdAt: string;
}

export interface ApiTransactions {
  [id: string]: TransactionType;
}

export interface UpdateTransactionType {
  id: string;
  transaction: TransactionType;
}