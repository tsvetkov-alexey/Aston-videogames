import searchIcon from '../assets/img/search-icon.png';
import React from 'react';

export const Search: React.FC = () => {
  return (
    <div className="search">
      <input type="text" placeholder="Type in smth..." />
      <img src={searchIcon} alt="searchIcon" />
    </div>
  );
};
