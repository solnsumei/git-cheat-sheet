import React from 'react';

const CategoryForm = ({
  onChange, onSave, category, error
}) => (
    <div className="row justify-content-sm-center">
      <div className="form-group col-sm-8 col-lg-6">
        <div className="row">
          <div className="col-9 col-sm-11">
            <input
              className="form-control form-control-lg"
              name="name" placeholder="Add new category"
              onChange={onChange} value={category.name} />
              {error !== null
                && <small className="form-text text-danger">{error}</small>
              }
          </div>
          <div className="col-3 col-sm-1">
            <button title="save category"
              onClick={onSave} className="btn btn-primary btn-lg"><i className="fa fa-save"></i></button>
            <div className="margin-2x"></div>
          </div>
        </div>
      </div>
    </div>
);

export default CategoryForm;
