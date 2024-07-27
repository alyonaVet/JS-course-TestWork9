import {createAsyncThunk} from '@reduxjs/toolkit';
import {TransactionType} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';

export const createTransaction =  createAsyncThunk<void, TransactionType, { state: RootState }>(
  'transactions/create',
  async (apiTransaction: TransactionType) => {
    await axiosApi.post('/transactions.json', apiTransaction);
  },
);