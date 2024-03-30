import { Header } from '../components/Header';
import { PageLoader } from '../components/UI/PageLoader';
import { gameApi } from '../services/GameService';
import { useNavigate, useParams } from 'react-router-dom';

export const FullGameInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: gameInfo, isError } = gameApi.useFetchGameByIdQuery(id || '');

  if (isError) {
    alert('Something went wrong, sorry :/');
    navigate('/');
    return null;
  }

  if (!gameInfo) {
    return <PageLoader />;
  }

  return (
    <>
      <Header />
      <div className="full-info">
        <div className="front-block">
          <div className="image">
            <img src={gameInfo.imageUrl} alt="game" className="main-picture" />
          </div>
          <div className="game-info">
            <h2>{gameInfo.title}</h2>
            <ul>
              <li>Release date: {gameInfo.releaseDate}</li>
              <li>{gameInfo.genre}</li>
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
