import React from 'react';
import Command from './Command';

const CategoryListItem = ({
  category, user,
  deleteCommand,
  copyCommand,
  showEditCategoryForm,
  onDelete,
  showCommandForm
}) => (
  <div className="col-sm-6 col-lg-4">
    <div className="card border-dark bg-33 text-grey mb-3">
        <div className="card-header">{category.name.toUpperCase()}
          {user && user.isAdmin
            && <span className="btn-span">
            <span onClick={() => showEditCategoryForm(category)} className="btn-link"><i className="fa fa-edit"></i></span>
            {(!category.commands || category.commands.length === 0)
            && <span onClick={() => onDelete(category)}
              className="btn-link text-danger"><i className="fa fa-times"></i></span>
            }
          </span>
          }
        </div>
      <div className="card-body">
        {category.commands !== undefined && category.commands.length > 0
          ? category.commands.map(
            command => <Command
              canEdit={user && user._id === command.user}
              onEditClick={showCommandForm}
              onDelete={deleteCommand}
              copyCmd={copyCommand}
              category={category}
              key={command._id}
              command={command}
              />
          )
          : <p>No command added to this category</p>}
          <p>
            {user && <span onClick={() => showCommandForm(category)}
              className="btn-link"><i className="fa fa-plus"></i> Add new command to this category</span>
            }
          </p>
      </div>
    </div>
  </div>
);

export default CategoryListItem;
