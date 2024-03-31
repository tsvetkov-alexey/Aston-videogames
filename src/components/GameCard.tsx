import { useAuth } from '../hooks/useAuth';
import { fetchFavouriteGames } from '../redux/favourite/slice';
import { fetchHistoryQuery } from '../redux/history/slice';
import { useAppDispatch } from '../redux/store';
import { Game } from '../redux/users/types';
import { LikeButton } from './LikeButton';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const GameCard = ({ id: gameId, title, imageUrl, releaseDate, genre }: Game) => {
  const dispatch = useAppDispatch();
  const { id: userId, isAuth } = useAuth();

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavouriteGames(userId));
      dispatch(fetchHistoryQuery(userId));
    }
  }, []);

  return (
    <div className="card-block">
      <div className="main-image">
        <img src={imageUrl} alt="game" />
        {isAuth && <LikeButton gameId={gameId} title={title} imageUrl={imageUrl} />}
      </div>
      <div className="info">
        <h3>{title}</h3>
        <ul className="game-info">
          <li>Release date: {releaseDate}</li>
          <li>{genre}</li>
        </ul>
        <Link to={`/${gameId}`}>
          <button>Learn more</button>
        </Link>
      </div>
    </div>
  );
};
