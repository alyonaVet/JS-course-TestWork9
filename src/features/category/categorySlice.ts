import {CategoryType} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createCategory, fetchCategories} from './categoryThunk';

export interface CategoryState {
  categories: CategoryType[];
  createLoading: boolean;
  fetchLoading: boolean;
}

const initialState: CategoryState = {
  categories: [],
  createLoading: false,
  fetchLoading: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createCategory.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createCategory.rejected, (state) => {
        state.createLoading = false;
      });
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectFetchCategoriesLoading: (state) => state.fetchLoading,
  }
});

export const categoryReducer = categorySlice.reducer;

export const {
  selectCategories,
  selectFetchCategoriesLoading
} = categorySlice.selectors;


