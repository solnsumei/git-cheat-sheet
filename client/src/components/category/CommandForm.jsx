import React from 'react';

const CommandForm = ({
  command, onChange, onSave, error
}) => (
  <form onSubmit={onSave}>
    <p className="text-warning">
      {command._id !== null ? 'Edit command' : 'Add command to this category'}
    </p>
    <div className="margin-2x"></div>
    <div className="form-group">
      <label htmlFor="email">Git Command Snippet</label>
      <input name="snippet" className="form-control" id="snippet"
        onChange={onChange} placeholder="Enter git command"
        value={command.snippet} required />
      {error !== null && error.snippet !== undefined && error.snippet !== null
        && <small className="form-text text-danger">{error.snippet}</small>
      }
    </div>

    <div className="form-group">
      <label htmlFor="action">Command Action</label>
      <input name="action" className="form-control" id="action"
        onChange={onChange} placeholder="Enter action"
        value={command.action} required />
        {error !== null && error.action !== undefined && error.action !== null
          && <small className="form-text text-danger">{error.action}</small>
      }
    </div>

    <div className="form-group">
      <button className="btn btn-primary btn-lg">Save</button>
    </div>
  </form>
);

export default CommandForm;
