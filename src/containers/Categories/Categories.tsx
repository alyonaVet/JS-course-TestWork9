import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories} from '../../features/category/categorySlice';
import CategoryCard from '../../components/Card/CategoryCard';
import {useEffect, useState} from 'react';
import Modal from '../../components/Modal/Modal';
import AddCategoryForm from '../../components/AddForm/AddCategoryForm';
import {ApiCategoryType} from '../../types';
import {createCategory, fetchCategories} from '../../features/category/categoryThunk';

const Categories = () => {
  const categories = useAppSelector(selectCategories);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const editHandler = () => {
  };
  const deleteHandler = () => {
  };

  const onSubmit = async (category: ApiCategoryType) => {
    try {
      await dispatch(createCategory(category));
    } catch (error) {
      console.error('Could not create category!');
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Categories</h3>
        <div>
          <button type="button" className="btn btn-outline-primary" onClick={() => setShowModal(true)}>Add Category
          </button>
        </div>
      </div>
      <div className="mt-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={editHandler}
            onDelete={deleteHandler}
            deleteLoading={false}/>
        ))}
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div className="ms-3">
          <AddCategoryForm onSubmit={onSubmit}/>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;