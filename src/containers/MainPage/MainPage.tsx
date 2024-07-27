import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectTransactions} from '../../features/transaction/transactionSlice';
import {useEffect} from 'react';
import {deleteTransaction, fetchTransaction} from '../../features/transaction/transactionThunk';
import {selectCategories} from '../../features/category/categorySlice';
import {TransactionType} from '../../types';
import dayjs from 'dayjs';

const MainPage = () => {

    const transactions = useAppSelector(selectTransactions);
    const categories = useAppSelector(selectCategories);

    const dispatch = useAppDispatch();

    const deleteHandler = async (transactionId: string) => {
      try {
        await dispatch(deleteTransaction(transactionId));
        await dispatch(fetchTransaction());
      } catch (error) {
        console.error('Could not delete transaction!', error);
      }
    };

    useEffect(() => {
      dispatch(fetchTransaction());
    }, [dispatch]);

    const getTransactionCategory = (transaction: TransactionType) => categories.find((c) => c.id === transaction.category);

    let totalAmount = 0;


    return (
      <div className="container mt-5">

        {
          Object.entries(transactions)
            .map(
              ([transactionId, transaction]) => {
                const category = getTransactionCategory(transaction);

                if (category === undefined) {
                  return null;
                }

                const isNegative = category.type === 'expense';

                const sign = isNegative ? '-' : '+';
                const color = isNegative ? 'text-danger' : 'text-success';

                if (sign === '+') {
                  totalAmount += transaction.amount;
                } else {
                  totalAmount -= transaction.amount;
                }


                return (
                  <div className="d-flex justify-content-between border rounded-3 mb-3 p-3" key={transactionId}>
                    <div>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</div>
                    <div>{category.name}</div>
                    <div className={`${color}`}>{sign}{transaction.amount}</div>
                    <div className="d-flex gap-3">
                      <button type="button" className="btn btn-secondary">Edit</button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteHandler(transactionId)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>);
              }
            )
        }
        <div className="w-25 border rounded-1 p-3 text-center">Total: <span
          className={totalAmount < 0 ? 'text-danger' : 'text-success'}>{totalAmount}</span></div>

      </div>
    )
      ;
  }
;

export default MainPage;