import React from 'react';

import searchIcon from '../assets/img/search-icon.png';

export const Search: React.FC = () => {
  return (
    <div className="search">
      <input type="text" placeholder="Type in smth..." />
      <img src={searchIcon} alt="searchIcon" />
    </div>
  );
};
