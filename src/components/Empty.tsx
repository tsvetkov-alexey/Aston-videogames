import tumbleWeed from '../assets/img/tumbleweed.png';
import React from 'react';

export const Empty: React.FC = () => {
  return (
    <div className="empty">
      <img src={tumbleWeed} alt="tumbleweed" />
      <h2>For this moment this page is empty, but its content is all up to you</h2>
    </div>
  );
};
