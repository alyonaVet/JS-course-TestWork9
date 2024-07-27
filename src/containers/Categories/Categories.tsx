import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories} from '../../features/category/categorySlice';
import CategoryCard from '../../components/Card/CategoryCard';
import {useEffect, useState} from 'react';
import Modal from '../../components/Modal/Modal';
import AddCategoryForm from '../../components/AddForm/AddCategoryForm';
import {ApiCategoryType, CategoryType} from '../../types';
import {createCategory, deleteCategory, fetchCategories, updateCategory} from '../../features/category/categoryThunk';

const Categories = () => {
  const categories = useAppSelector(selectCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [existingCategory, setExistingCategory] = useState<CategoryType | undefined>(undefined);


  const dispatch = useAppDispatch();

  const onEditSubmit = async (category: CategoryType) => {
    const categoryId = category.id;
    const categoryData = {type: category.type, name: category.name};
    try {
      await dispatch(updateCategory({id: categoryId, category: categoryData})).unwrap();
      await dispatch(fetchCategories());
      setExistingCategory(undefined);
      setShowEditModal(false);
    } catch (error) {
      console.error('Could not update category!', error);
    }
  };
  const deleteHandler = async (categoryId: string) => {
    try {
      await dispatch(deleteCategory(categoryId));
      await dispatch(fetchCategories());
    } catch (error) {
      console.error('Could not delete category!', error);
    }
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
            onEdit={() => {
              setExistingCategory(category);
              setShowEditModal(true);
            }}
            onDelete={() => deleteHandler(category.id)}
            deleteLoading={false}/>


        ))}
      </div>
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
        <div className="ms-3">
          <AddCategoryForm onSubmit={onEditSubmit} existingCategory={existingCategory}/>
        </div>
      </Modal>
      <Modal show={showAddModal} onClose={() => setShowAddModal(false)}>
        <div className="ms-3">
          <AddCategoryForm onSubmit={onSubmit}/>
        </div>
      </Modal>

    </div>
  );
};

export default Categories;