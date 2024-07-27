import AddTransactionForm from '../../components/AddForm/AddTransactionForm/AddTransactionForm';
import {useEffect} from 'react';
import {fetchCategories} from '../../features/category/categoryThunk';
import {useAppDispatch} from '../../app/hooks';

const AddTransaction = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="container">
      <AddTransactionForm isLoading={false}/>
    </div>
  );
};

export default AddTransaction;