import like from '../assets/svg/like.svg';
import liked from '../assets/svg/liked.svg';
import { useAuth } from '../hooks/useAuth';
import {
  addFavouriteGame,
  removeFavouriteGame,
  selectFavouriteGames,
} from '../redux/favourite/slice';
import { useAppDispatch } from '../redux/store';
import { MiniLoader } from './UI/MiniLoader';
import { useState } from 'react';
import { useSelector } from 'react-redux';

type LikeButtonType = {
  gameId: string;
  title: string;
  imageUrl: string;
};

export const LikeButton = ({ gameId, title, imageUrl }: LikeButtonType) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { id: userId } = useAuth();

  const dispatch = useAppDispatch();
  const favouriteGames = useSelector(selectFavouriteGames);
  const isFavourite = favouriteGames.some((game) => game.gameId === gameId);

  const toggleFavourite = () => {
    if (isProcessing) {
      return;
    }

    const updatedIsFavourite = !isFavourite;
    setIsProcessing(true);

    if (updatedIsFavourite && userId) {
      dispatch(addFavouriteGame({ gameId, title, imageUrl, userId }))
        .then(() => setIsProcessing(false))
        .catch(() => setIsProcessing(false));
    } else {
      userId &&
        dispatch(removeFavouriteGame({ gameId, userId }))
          .then(() => setIsProcessing(false))
          .catch(() => setIsProcessing(false));
    }
  };

  return (
    <div className="like" onClick={toggleFavourite}>
      {isProcessing ? (
        <MiniLoader />
      ) : isFavourite ? (
        <img src={liked} alt="like" />
      ) : (
        <img src={like} alt="like" />
      )}
    </div>
  );
};
