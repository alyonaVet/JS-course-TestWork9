import {createAsyncThunk} from '@reduxjs/toolkit';
import {ApiTransactions, TransactionType, UpdateTransactionType} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';

export const createTransaction =  createAsyncThunk<void, TransactionType, { state: RootState }>(
  'transactions/create',
  async (apiTransaction: TransactionType) => {
    await axiosApi.post('/transactions.json', apiTransaction);
  },
);

export const fetchTransaction = createAsyncThunk<ApiTransactions, void, { state: RootState }>(
  'transactions/fetch',
  async () => {
    const {data: transactions} = await axiosApi.get<ApiTransactions | null>('transactions.json');

    if (transactions === null) {
      return {};
    }
    return transactions;
  }
);

export const deleteTransaction =  createAsyncThunk<void, string, { state: RootState }>(
  'transactions/delete',
  async (transactionID) => {
    await axiosApi.delete('/transactions/' + transactionID + '.json');
  },
);

export const updateTransaction = createAsyncThunk<void, UpdateTransactionType, { state: RootState }>(
  'transactions/update',
   async ({id, transaction}) => {
    await axiosApi.put(`/transactions/${id}.json`, transaction);
  }
);