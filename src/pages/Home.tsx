import { ErrorBlock } from '../components/ErrorBlock';
import { GameCard } from '../components/GameCard';
import { GameCardSkeleton } from '../components/GameCardSkeleton';
import { Header } from '../components/Header';
import { Search } from '../components/Search';
import { fetchGames } from '../redux/games/asyncActions';
import { selectGameData } from '../redux/games/selectors';
import { useAppDispatch } from '../redux/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchGames());
  }, []);

  const { items, status } = useSelector(selectGameData);

  const games = items.map((obj) => <GameCard key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <GameCardSkeleton key={index} />);

  return (
    <>
      <Header></Header>
      <div className="main-block">
        <Search />
        <div className="cards">
          {status === 'error' ? <ErrorBlock /> : status === 'loading' ? skeletons : games}
        </div>
      </div>
    </>
  );
};
