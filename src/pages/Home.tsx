import { ErrorBlock } from '../components/ErrorBlock';
import { GameCard } from '../components/GameCard';
import { GameCardSkeleton } from '../components/GameCardSkeleton';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { Search } from '../components/Search';
import { selectFilter } from '../redux/filter/selectors';
import { setCurrentPage } from '../redux/filter/slice';
import { fetchGames } from '../redux/games/asyncActions';
import { selectGameData } from '../redux/games/selectors';
import { useAppDispatch } from '../redux/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items, status } = useSelector(selectGameData);

  const { currentPage } = useSelector(selectFilter);
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    const getGames = async () => {
      await dispatch(fetchGames({ currentPage }));
    };
    getGames();
  }, [dispatch, currentPage]);

  const games =
    items && items.length > 0 ? items.map((obj) => <GameCard key={obj.id} {...obj} />) : null;

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
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};
