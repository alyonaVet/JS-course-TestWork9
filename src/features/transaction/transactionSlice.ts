import {ApiTransactions} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createTransaction, deleteTransaction, fetchTransaction} from './transactionThunk';

export interface TransactionState {
  transactions: ApiTransactions;
  createLoading: boolean;
  fetchLoading: boolean;
  deleteLoading: false | string;

}

const initialState: TransactionState = {
  transactions: {},
  createLoading: false,
  fetchLoading: false,
  deleteLoading: false,

}


const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.createLoading = true;
      })
      .addCase(createTransaction.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createTransaction.rejected, (state) => {
        state.createLoading = false;
      });
    builder
      .addCase(fetchTransaction.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransaction.rejected, (state) => {
        state.fetchLoading = false;
      });
    builder
      .addCase(deleteTransaction.pending, (state, { meta: { arg: category } }) => {
        state.deleteLoading = category;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.deleteLoading = false;
      });
  },
  selectors: {
    selectTransactions: (state) => state.transactions,
    selectDeleteTransactionsLoading: (state) => state.deleteLoading,
    selectCreatTransactionsLoading: (state) => state.createLoading,
    selectFetchTransactionsLoading: (state) => state.fetchLoading,

  }

});

export const transactionReducer = transactionSlice.reducer;

export const {
  selectTransactions,
  selectDeleteTransactionsLoading,
  selectCreatTransactionsLoading,
  selectFetchTransactionsLoading,
} = transactionSlice.selectors;






