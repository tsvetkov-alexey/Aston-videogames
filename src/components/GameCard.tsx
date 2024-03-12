import like from '../assets/svg/like.svg';
import liked from '../assets/svg/liked.svg';
import { Game } from '../redux/games/types';
import { useAppDispatch } from '../redux/store';
import { selectUserData } from '../redux/users/selectors';
import { removeLikedGame, setLikedGame } from '../redux/users/slice';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const GameCard: React.FC<Game> = ({ id, title, imageUrl, releaseDate, genre }) => {
  const [favourite, setFavourite] = useState(false);

  const dispatch = useAppDispatch();
  const { likedGames } = useSelector(selectUserData);

  const handleLike = () => {
    setFavourite(!favourite);

    if (!likedGames[id]) {
      dispatch(setLikedGame({ id, title, imageUrl }));
    } else {
      dispatch(removeLikedGame(id.toString()));
    }
  };

  console.log(Object.values(likedGames));

  return (
    <div className="card-block">
      <div className="main-image">
        <img src={imageUrl} alt="game" />
        <div className="like" onClick={handleLike}>
          {favourite ? <img src={liked} alt="like" /> : <img src={like} alt="like" />}
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
