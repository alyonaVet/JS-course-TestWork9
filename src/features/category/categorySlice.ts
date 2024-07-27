import {CategoryType} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createCategory, deleteCategory, fetchCategories, updateCategory} from './categoryThunk';

export interface CategoryState {
  categories: CategoryType[];
  createLoading: boolean;
  fetchLoading: boolean;
  updateLoading: boolean;
  deleteLoading: false | string;
}

const initialState: CategoryState = {
  categories: [],
  createLoading: false,
  fetchLoading: false,
  updateLoading: false,
  deleteLoading: false,
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
    builder
      .addCase(updateCategory.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateCategory.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateCategory.rejected, (state) => {
        state.updateLoading = false;
      });
    builder
      .addCase(deleteCategory.pending, (state, { meta: { arg: category } }) => {
        state.deleteLoading = category;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.deleteLoading = false;
      });

  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectCreatCategoriesLoading: (state) => state.createLoading,
    selectFetchCategoriesLoading: (state) => state.fetchLoading,
    selectUpdateCategoryLoading: (state) => state.updateLoading,
    selectDeleteCategoryLoading: (state) => state.deleteLoading,
  }
});

export const categoryReducer = categorySlice.reducer;

export const {
  selectCategories,
  selectCreatCategoriesLoading,
  selectFetchCategoriesLoading,
  selectUpdateCategoryLoading,
  selectDeleteCategoryLoading
} = categorySlice.selectors;


