export interface CategoryType {
  id: string;
  type: string;
  name: string;
}

export type ApiCategoryType = Omit<CategoryType, 'id'>;

export interface ApiCategories {
  [id: string]: ApiCategoryType;
}