import like from '../assets/svg/like.svg';
import { Header } from '../components/Header';
import { Loader } from '../components/UI/Loader';
import { Game } from '../redux/games/types';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const FullGameInfo: React.FC = () => {
  const [gameInfo, setGameInfo] = useState<Game>();

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getFullInfo() {
      try {
        const { data } = await axios.get(`https://81a99b1e3f23d819.mokky.dev/videogames?id=` + id);
        setGameInfo(data[0]);
        return data;
      } catch (err) {
        alert('Something went wrong, sorry :/');
        navigate('/');
      }
    }

    getFullInfo();
  }, []);

  if (!gameInfo) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <div className="full-info">
        <div className="front-block">
          <div className="image">
            <img src={gameInfo.imageUrl} alt="game" className="main-picture" />
            <div className="like">
              <img src={like} alt="like" />
            </div>
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
