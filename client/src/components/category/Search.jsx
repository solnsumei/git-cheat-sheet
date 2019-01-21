import React from 'react';

const Search = ({ onSearch }) => (
  <div className="row justify-content-md-center">
    <div className="form-group col-sm-6 col-lg-5 search-form">
      <input
        id="search"
        className="form-control form-control-lg"
        name="search"
        onChange={onSearch} required />
      <label htmlFor="search" className="text-lg">
        <i className="fa fa-search"></i> Awesome Git Cheatsheet
      </label>
    </div>
  </div>
);

export default Search;
