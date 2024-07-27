import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories} from '../../features/category/categorySlice';
import CategoryCard from '../../components/Card/CategoryCard';
import {useEffect, useState} from 'react';
import Modal from '../../components/Modal/Modal';
import AddCategoryForm from '../../components/AddForm/AddCategoryForm';
import {ApiCategoryType} from '../../types';
import {createCategory, fetchCategories, updateCategory} from '../../features/category/categoryThunk';
import {useParams} from 'react-router-dom';

const Categories = () => {
  const categories = useAppSelector(selectCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();

  const onEditSubmit = async (category: ApiCategoryType) => {
    try {
      await dispatch(updateCategory({ id, category })).unwrap();
    } catch (error) {
      console.error('Could not update category!', error);
    }
  };
  const deleteHandler = () => {
  };

  const onSubmit = async (category: ApiCategoryType) => {
    try {
      await dispatch(createCategory(category));
      await dispatch(fetchCategories());
      setShowAddModal(false);
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
          <button type="button" className="btn btn-outline-primary" onClick={() => setShowAddModal(true)}>Add Category
          </button>
        </div>
      </div>
      <div className="mt-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={() => setShowEditModal(true)}
            onDelete={deleteHandler}
            deleteLoading={false}/>
        ))}
      </div>
      <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
        <div className="ms-3">
          <AddCategoryForm onSubmit={onSubmit}/>
        </div>
      </Modal>
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <div className="ms-3">
          <AddCategoryForm onSubmit={onEditSubmit}/>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;