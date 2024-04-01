import { LikeButton } from '../components/LikeButton';
import { PageLoader } from '../components/UI/PageLoader';
import { useAuth } from '../hooks/useAuth';
import { gameApi } from '../services/GameService';
import { useNavigate, useParams } from 'react-router-dom';

export const FullGameInfo = () => {
  const { id } = useParams();
  const { isAuth } = useAuth();
  const navigate = useNavigate();

  const { data: gameInfo, isError } = gameApi.useFetchGameByIdQuery(id || '');

  if (isError) {
    navigate('/NotFound');
    return null;
  }

  if (!gameInfo) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="full-info">
        <div className="front-block">
          <div className="image">
            <img src={gameInfo.imageUrl} alt="game" className="main-picture" />
            {isAuth ? (
              <LikeButton
                gameId={gameInfo.id}
                title={gameInfo.title}
                imageUrl={gameInfo.imageUrl}
              />
            ) : null}
          </div>
          <div className="game-info">
            <h2>{gameInfo.title}</h2>
            <ul>
              <li>Release date: {gameInfo.releaseDate}</li>
              <li>Genre: {gameInfo.genre}</li>
              <li>Age rate: {gameInfo.ageRate}+</li>
            </ul>
          </div>
        </div>
        <h3>Description</h3>
        <p>{gameInfo.description}</p>
      </div>
    </>
  );
};
