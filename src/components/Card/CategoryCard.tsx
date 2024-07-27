import React from 'react';
import {CategoryType} from '../../types';
import ButtonSpinner from '../Spinners/ButtonSpiner';

interface Props {
  category: CategoryType;
  onEdit: VoidFunction;
  onDelete: VoidFunction;
  deleteLoading: false | string;
}

const CategoryCard: React.FC<Props> = ({category, onEdit, onDelete, deleteLoading}) => {

  return (
    <div className="d-flex mb-2 px-3 py-2 border rounded-2 py-3">
        <div className="col-10 d-flex align-items-center justify-content-between me-3">
          <h5 className="mt-0 mb-0">{category.name}</h5>
          <span>{category.type}</span>
        </div>
      <div className="me-4">
        <div className="col-4">
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={onEdit}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={onDelete}
              disabled={deleteLoading ? deleteLoading === category.id : false}
            >
              {deleteLoading && deleteLoading === category.id && (<ButtonSpinner/>)}
              Delete
            </button>
          </div>
        </div>
      </div>

    </div>

  );
};

export default CategoryCard;