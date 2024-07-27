import ButtonSpinner from '../../Spinners/ButtonSpiner';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectCategories} from '../../../features/category/categorySlice';
import {createTransaction, fetchTransaction, updateTransaction} from '../../../features/transaction/transactionThunk';
import {useNavigate, useParams} from 'react-router-dom';
import {selectTransactions} from '../../../features/transaction/transactionSlice';

interface Props {
  isLoading?: boolean;
}


const AddTransactionForm: React.FC<Props> = ({isLoading}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {transactionId} = useParams();


  const categories = useAppSelector(selectCategories);
  const transactions = useAppSelector(selectTransactions);


  const [categoryType, setCategoryType] = useState<string>('expense');

  const [categoryId, setCategoryId] = useState<string>('');

  const [amount, setAmount] = useState<string>('');

  const [date, setDate] = useState<string>(new Date().toISOString());


  useEffect(() => {
    const initialCategoryId = categories.filter((category) => category.type === categoryType)[0]?.id;
    setCategoryId(initialCategoryId);
  }, [categoryType]);

  useEffect(() => {
    if (transactionId) {

      const currentTransaction = transactions[transactionId];
      const currentCategory = categories.find((category) => category.id === currentTransaction.category);

      setCategoryId(currentTransaction.category);
      setCategoryType(currentCategory.type);
      setAmount(currentTransaction.amount.toString());
      setDate(currentTransaction.createdAt);

    }

  }, [transactionId]);


  const changeCategoryType = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategoryType(event.target.value);
  };

  const changeCategoryId = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategoryId(event.target.value);
  };


  const onAddFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTransaction = {
      category: categoryId,
      amount: parseInt(amount) || 0,
      createdAt: date,
    };
    try {
      await dispatch(createTransaction(newTransaction));
      await dispatch(fetchTransaction());
      navigate('/');
    } catch (error) {
      console.error(error);
    }

  };


  const onEditFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const editTransaction = {
      id: transactionId,
      transaction: {
        category: categoryId,
        amount: parseInt(amount) || 0,
        createdAt: date,
      }};
    try {
      await dispatch(updateTransaction(editTransaction));
      await dispatch(fetchTransaction());
      navigate('/');
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <form onSubmit={transactionId ? onEditFormSubmit : onAddFormSubmit}>
      <h4 className="mt-3">{transactionId ? 'Edit transaction' : 'Add transaction'}</h4>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          className="form-select w-50 mb-3 mt-2"
          id="type"
          name="type"
          required
          onChange={changeCategoryType}
          value={categoryType}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          className="form-select w-50 mb-3 mt-2"
          id="category"
          name="category"
          required
          onChange={changeCategoryId}
          value={categoryId}
        >
          {
            categories
              .filter((category) => category.type === categoryType)
              .map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
          }

        </select>
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          required
          className="form-control w-50 mb-3"
          onChange={(event) => setAmount(event.target.value)}
          value={amount}
        />
      </div>
      <div className="mt-3 mb-3 me-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading && <ButtonSpinner/>}
          Add transaction
        </button>
      </div>

    </form>

  );
};

export default AddTransactionForm;