import close from '../assets/img/close.png';
import { useAuth } from '../hooks/useAuth';
import { likedGame, removeFavouriteGame } from '../redux/favourite/slice';
import { useAppDispatch } from '../redux/store';

export const LikedGame = ({ gameId, title, imageUrl }: likedGame) => {
  const dispatch = useAppDispatch();
  const { id: userId } = useAuth();

  const removeLikedGame = () => {
    if (userId) {
      dispatch(removeFavouriteGame({ gameId, userId }));
    }
  };

  return (
    <div className="card-position">
      <div className="card">
        <img src={imageUrl} alt="game" />
        <h3> {title} </h3>
      </div>
      <img src={close} alt="close" className="close" onClick={removeLikedGame} />{' '}
    </div>
  );
};
