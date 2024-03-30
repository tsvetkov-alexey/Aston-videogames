import close from '../assets/img/close.png';
import { useAuth } from '../hooks/useAuth';
import { removeFavouriteGame } from '../redux/favourite/slice';
import { likedGame } from '../redux/favourite/slice';
import { useAppDispatch } from '../redux/store';
import { MiniLoader } from './UI/MiniLoader';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const LikedGame = ({ gameId, title, imageUrl }: likedGame) => {
  const dispatch = useAppDispatch();
  const { id: userId } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const removeLikedGame = () => {
    setIsProcessing(true);
    if (userId) {
      dispatch(removeFavouriteGame({ gameId, userId }))
        .then(() => setIsProcessing(false))
        .catch((error) => alert(`Error occurred while removing game: ${error}`));
    }
  };

  return (
    <div className="card-position">
      <div className="card">
        <Link to={`/${gameId}`}>
          <img src={imageUrl} alt="game" />
        </Link>
        <h3> {title} </h3>
      </div>
      {isProcessing ? (
        <MiniLoader />
      ) : (
        <img src={close} alt="close" className="close" onClick={removeLikedGame} />
      )}
    </div>
  );
};
