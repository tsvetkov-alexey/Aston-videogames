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
import React from 'react';
import { useSelector } from 'react-redux';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentPage, searchValue } = useSelector(selectFilter);

  const {
    data: games,
    isError,
    isFetching,
  } = gameApi.useFetchAllGamesQuery({
    page: currentPage,
    limit: 4,
    title: searchValue,
  });

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const items = Array.isArray(games) && games.map((obj) => <GameCard key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <GameCardSkeleton key={index} />);

  return (
    <>
      <Header></Header>
      <div className="main-block">
        <Search />
        <div className="cards">{isError ? <ErrorBlock /> : isFetching ? skeletons : items}</div>
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};
