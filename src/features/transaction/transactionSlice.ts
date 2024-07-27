import {TransactionType} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {createTransaction} from './transactionThunk';

export interface TransactionState {
  transactions: TransactionType[];
  createLoading: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  createLoading: false,
}


const transactionSlice = createSlice({
  name: 'transactions',
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
  },
  selectors: {
    selectTransactions: (state) => state.transactions,
    selectCreatTransactionsLoading: (state) => state.createLoading,
  }
});

export const transactionReducer = transactionSlice.reducer;

export const {
  selectTransactions,
  selectCreatTransactionsLoading,
} = transactionSlice.selectors;




