import React from 'react';

const Command = ({
  command, category,
  copyCmd, onEditClick,
  onDelete, canEdit, disableCopy
}) => {
  const code = disableCopy === undefined
    ? <code onClick={() => copyCmd(command.snippet)}>$ {command.snippet}</code>
    : <code>$ {command.snippet}</code>;

  return (
    <p className="card-text">
        {code}
        {canEdit
          && <span className="btn-span">
            <span onClick={() => onEditClick(category, command)} className="btn-link"><i className="fa fa-edit"></i></span>
            <span onClick={() => onDelete(command)} className="btn-link text-danger"><i className="fa fa-times"></i></span>
          </span>}
        <br /> {command.action}
    </p>
  );
};

export default Command;
