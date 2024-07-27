import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiCategories, ApiCategoryType, CategoryType} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';

export const createCategory = createAsyncThunk<void, ApiCategoryType, { state: RootState }>(
  'categories/create',
  async (apiCategory : ApiCategoryType) => {
    await axiosApi.post('/categories.json', apiCategory);
  },
);

export const fetchCategories = createAsyncThunk<CategoryType[], void, { state: RootState }>(
  'categories/fetch',
  async () => {
    const {data: categories} = await axiosApi.get<ApiCategories | null>('categories.json');

    if (categories === null) {
      return [];
    }
    return Object.keys(categories).map((id) => ({
      id,
      ...categories[id],
    }))
  }
);