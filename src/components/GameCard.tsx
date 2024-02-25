import tlou from '../assets/img/tlou1.jpg';
import like from '../assets/svg/like.svg';
import React from 'react';

export const GameCard: React.FC = () => {
  return (
    <div className="card-block">
      <div className="main-image">
        <img src={tlou} alt="tlou1" />
        <div className="like">
          <img src={like} alt="like" />
        </div>
      </div>
      <div className="info">
        <h3>The Last Of Us: Part 1</h3>
        <ul className="game-info">
          <li>Release date: 02/09/2022</li>
          <li>Shooter, Adventure, Action</li>
        </ul>
        <button>Learn more</button>
      </div>
    </div>
  );
};
