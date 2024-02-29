import like from '../assets/svg/like.svg';
import { Game } from '../redux/games/types';
import React from 'react';
import { Link } from 'react-router-dom';

export const GameCard: React.FC<Game> = ({ id, title, imageUrl, releaseDate, genre }) => {
  return (
    <div className="card-block">
      <div className="main-image">
        <img src={imageUrl} alt="tlou1" />
        <div className="like">
          <img src={like} alt="like" />
        </div>
      </div>
      <div className="info">
        <h3>{title}</h3>
        <ul className="game-info">
          <li>Release date: {releaseDate}</li>
          <li>{genre}</li>
        </ul>
        <Link to={`/${id}`}>
          <button>Learn more</button>
        </Link>
      </div>
    </div>
  );
};
