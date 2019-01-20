import React from 'react';
import CommandForm from './CommandForm';
import Command from './Command';

const ManageCategory = ({
  category,
  command,
  cancelEdit,
  onSaveCommand,
  showEditCategoryForm,
  showCommandForm,
  onCommandFormChange,
  error
}) => (
    <div className="row justify-content-sm-center">
      <div className="col-sm-8 col-lg-6">
        <div className="card border-dark bg-33 text-grey mb-3 edit-card">
          <div className="card-header">
            {showEditCategoryForm
              ? 'COMMANDS ADDED TO THIS CATEGORY'
              : category.name.toUpperCase()}
            <span className="btn-span" title="close">
              <i onClick={cancelEdit} className="fa fa-times text-primary"></i>
            </span>
          </div>

          <div className="card-body">
            {showCommandForm
              && <CommandForm command={command}
                onChange={onCommandFormChange}
                onSave={onSaveCommand}
                error={error} />
            }

            {!showCommandForm
              && category.commands !== undefined
              && category.commands.length > 0
              ? category.commands.map(
                commandItem => <Command
                  canEdit={false}
                  disableCopy={true}
                  key={commandItem._id}
                  command={commandItem}
                />
              )
              : <p>{!showCommandForm && 'No command added to this category'} </p>}
          </div>
        </div>
      </div>
    </div>
);

export default ManageCategory;
