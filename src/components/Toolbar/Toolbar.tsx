import {NavLink} from 'react-router-dom';
import {
  selectCreatTransactionsLoading,
  selectDeleteTransactionsLoading, selectFetchTransactionsLoading, selectUpdateTransactionLoading
} from '../../features/transaction/transactionSlice';
import {useAppSelector} from '../../app/hooks';
import {
  selectCreatCategoriesLoading, selectDeleteCategoryLoading,
  selectFetchCategoriesLoading,
  selectUpdateCategoryLoading
} from '../../features/category/categorySlice';

const Toolbar = () => {
  const transactionsLoading = useAppSelector(selectDeleteTransactionsLoading);
  const creatTransactionsLoading = useAppSelector(selectCreatTransactionsLoading);
  const fetchTransactionsLoading = useAppSelector(selectFetchTransactionsLoading);
  const updateTransactionLoading = useAppSelector(selectUpdateTransactionLoading);

  const creatCategoriesLoading = useAppSelector(selectCreatCategoriesLoading);
  const fetchCategoriesLoading = useAppSelector(selectFetchCategoriesLoading);
  const updateCategoryLoading = useAppSelector(selectUpdateCategoryLoading);
  const deleteCategoryLoading = useAppSelector(selectDeleteCategoryLoading);

  const somethingLoading =
    transactionsLoading ||
    creatTransactionsLoading ||
    fetchTransactionsLoading ||
    updateTransactionLoading ||
    creatCategoriesLoading ||
    fetchCategoriesLoading ||
    updateCategoryLoading ||
    deleteCategoryLoading;


  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <NavLink to="/" className="navbar-brand">Finance Tracker{somethingLoading ? " loading..." : ""}</NavLink>
        </div>
        <ul className="navbar-nav d-flex flex-row gap-3 flex-nowrap">
          <li className="nav-item">
            <NavLink to="/categories" className="nav-link">Categories</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add-transaction" className="nav-link">Add transaction</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;