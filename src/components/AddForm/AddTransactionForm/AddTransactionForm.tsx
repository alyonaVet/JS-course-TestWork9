import ButtonSpinner from '../../Spinners/ButtonSpiner';
import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectCategories} from '../../../features/category/categorySlice';
import {createTransaction, fetchTransaction} from '../../../features/transaction/transactionThunk';
import {useNavigate} from 'react-router-dom';

interface Props {
  isLoading?: boolean;
}



const AddTransactionForm: React.FC<Props> = ({isLoading}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const categories = useAppSelector(selectCategories);

  const [categoryType, setCategoryType] = useState<string>('expense');

  const [categoryId, setCategoryId] = useState<string>('');

  useEffect(() => {
    const initialCategoryId = categories.filter((category) => category.type === categoryType)[0]?.id
    setCategoryId(initialCategoryId);
  }, [categoryType]);

  const [amount, setAmount] = useState<string>('');


  const changeCategoryType = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategoryType(event.target.value);
  };

  const changeCategoryId = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategoryId(event.target.value);
  };


  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTransaction = {
      category: categoryId,
      amount: parseInt(amount) || 0,
      createdAt: new Date().toISOString(),
    };
    try {
      await dispatch(createTransaction(newTransaction));
      await dispatch(fetchTransaction());
      navigate('/');
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4 className="mt-3">Add</h4>
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
          onChange={(event)=>setAmount(event.target.value)}
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