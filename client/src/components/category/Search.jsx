import React from 'react';

const Search = ({ onSearch }) => (
  <div className="row justify-content-md-center">
    <div className="form-group col-sm-6 col-lg-4">
      <input
        className="form-control form-control-lg"
        name="search" placeholder="Awesome Git Cheatsheet"
        onChange={onSearch} />
    </div>
  </div>
);

export default Search;
