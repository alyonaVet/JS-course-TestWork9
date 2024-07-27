import Toolbar from './components/Toolbar/Toolbar';
import {Route, Routes} from 'react-router-dom';
import MainPage from './containers/MainPage/MainPage';
import Categories from './containers/Categories/Categories';
import AddTransaction from './containers/AddTransaction/AddTransaction';
import {useEffect} from 'react';
import {useAppDispatch} from './app/hooks';
import {fetchCategories} from './features/category/categoryThunk';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

    return (
        <>
          <header>
            <Toolbar />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/add-transaction" element={<AddTransaction />} />
            </Routes>
          </main>
        </>
    );
};

export default App;
