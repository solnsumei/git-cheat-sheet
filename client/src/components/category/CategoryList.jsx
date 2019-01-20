import React from 'react';
import CategoryListItem from './CategoryListItem';

const CategoryList = ({
  categories, user,
  deleteCommand,
  copyCommand,
  showEditCategoryForm,
  onDeleteCategory,
  showCommandForm
}) => (
    <div className="row">
      {categories.length > 0
        ? categories.map(
          category => <CategoryListItem
            key={category._id}
            category={category}
            onDelete={onDeleteCategory}
            showEditCategoryForm={showEditCategoryForm}
            showCommandForm={showCommandForm}
            deleteCommand={deleteCommand}
            copyCommand={copyCommand}
            user={user} />
        )
        : <div><p className="text-center">No item found!</p></div>}
    </div>
);

export default CategoryList;
