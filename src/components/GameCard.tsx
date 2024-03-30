import like from '../assets/svg/like.svg';
import liked from '../assets/svg/liked.svg';
import { useAuth } from '../hooks/useAuth';
import {
  addFavouriteGame,
  fetchFavouriteGames,
  removeFavouriteGame,
} from '../redux/favourite/slice';
import { selectFavouriteGames } from '../redux/favourite/slice';
import { fetchHistoryQuery } from '../redux/history/slice';
import { useAppDispatch } from '../redux/store';
import { Game } from '../redux/users/types';
import { MiniLoader } from './UI/MiniLoader';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const GameCard = ({ id: gameId, title, imageUrl, releaseDate, genre }: Game) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { id: userId, isAuth } = useAuth();

  const dispatch = useAppDispatch();
  const favouriteGames = useSelector(selectFavouriteGames);

  const isFavourite = favouriteGames.some((game) => game.gameId === gameId);
  const [favourite, setFavourite] = useState(isFavourite);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavouriteGames(userId));
      dispatch(fetchHistoryQuery(userId));
    }
  }, []);

  useEffect(() => {
    const likeOnPage = favouriteGames.some((obj) => obj.gameId === gameId);
    setFavourite(likeOnPage);
  }, [favouriteGames]);

  const toggleFavourite = () => {
    if (isProcessing) {
      return;
    }

    const updatedIsFavourite = !favourite;
    setIsProcessing(true);

    if (updatedIsFavourite && userId) {
      dispatch(addFavouriteGame({ gameId, title, imageUrl, userId }))
        .then(() => setFavourite(updatedIsFavourite))
        .finally(() => {
          setIsProcessing(false);
        });
    } else {
      userId &&
        dispatch(removeFavouriteGame({ gameId, userId }))
          .then(() => setFavourite(updatedIsFavourite))
          .finally(() => {
            setIsProcessing(false);
          });
    }
  };

  return (
    <div className="card-block">
      <div className="main-image">
        <img src={imageUrl} alt="game" />
        {isAuth && (
          <div className="like" onClick={toggleFavourite}>
            {isProcessing ? (
              <MiniLoader />
            ) : favourite ? (
              <img src={liked} alt="like" />
            ) : (
              <img src={like} alt="like" />
            )}
          </div>
        )}
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
