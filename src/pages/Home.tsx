import { ErrorBlock } from '../components/ErrorBlock';
import { GameCard } from '../components/GameCard';
import { GameCardSkeleton } from '../components/GameCardSkeleton';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { Search } from '../components/Search';
import { selectFilter } from '../redux/filter/selectors';
import { setCurrentPage } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { gameApi } from '../services/GameService';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useSelector(selectFilter);

  const [isLoading, setIsLoading] = useState(true); // Добавил локальный стейт isLoading, т.к без него isLoading из RTK Query не обновляется при смене страниц и нет плавности появления

  const { data: games, isError } = gameApi.useFetchAllGamesQuery({ page: currentPage, limit: 4 });

  const onChangePage = (page: number) => {
    setIsLoading(true);
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    if (games) {
      setIsLoading(false);
    }
  }, [games]);

  const items = Array.isArray(games) && games.map((obj) => <GameCard key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <GameCardSkeleton key={index} />);

  return (
    <>
      <Header></Header>
      <div className="main-block">
        <Search />
        <div className="cards">{isError ? <ErrorBlock /> : isLoading ? skeletons : items}</div>
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};
