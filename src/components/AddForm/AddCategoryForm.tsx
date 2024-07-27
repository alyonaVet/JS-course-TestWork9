import {ApiCategoryType} from '../../types';
import React, {useState} from 'react';
import ButtonSpinner from '../Spinners/ButtonSpiner';

interface CategoryProps {
  onSubmit: (category: ApiCategoryType) => void;
  existingCategory?: ApiCategoryType;
  isLoading?: boolean;
}
const emptyState: ApiCategoryType = {
  type: '',
  name: '',
};

const AddCategoryForm: React.FC<CategoryProps> = ({onSubmit, existingCategory, isLoading}) => {

  const [category, setCategory] = useState<ApiCategoryType>(emptyState);

  const changeCategory = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCategory((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit({
      ...category,
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <h4 className="mt-3">{existingCategory ? 'Edit category' : 'Add new category'}</h4>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          className="form-select w-50 mb-3 mt-2"
          id="type"
          name="type"
          required
          onChange={changeCategory}
          value={category.type}
        >
          <option value="" disabled>Select Category</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          required
          className="form-control w-50 mb-3"
          onChange={changeCategory}
          value={category.name}
        />
      </div>
      <div className="mt-2 mb-3 text-end me-3">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading && <ButtonSpinner/>}
          {existingCategory ? 'Update' : 'Create'}
        </button>
      </div>

    </form>
  );
};

export default AddCategoryForm;