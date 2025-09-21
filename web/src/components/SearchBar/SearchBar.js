import React, { useState } from 'react';
import './SearchBar.scss';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search posts by title, author, tags, or content..."
        value={searchTerm}
        onChange={handleChange}
        className="search-input"
      />
      {searchTerm && (
        <button onClick={() => {
          setSearchTerm('');
          onSearch('');
        }} className="clear-search-btn">×</button>
      )}
    </div>
  );
};

export default SearchBar;
