import { Empty } from '../components/Empty';
import { GameCard } from '../components/GameCard';
import { GameCardSkeleton } from '../components/GameCardSkeleton';
import { Pagination } from '../components/Pagination';
import { Search } from '../components/Search';
import { selectFilter, setCurrentPage, setTotalGames } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { gameApi } from '../services/GameService';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Home = () => {
  const dispatch = useAppDispatch();
  const { currentPage, searchValue, totalGames } = useSelector(selectFilter);

  const {
    data: games,
    isError,
    isFetching,
  } = gameApi.useFetchAllGamesQuery({
    page: currentPage,
    limit: 4,
    title: searchValue,
  });

  const { data: gamesCount } = gameApi.useFetchGameTitleQuery(searchValue);

  useEffect(() => {
    if (Array.isArray(gamesCount) && gamesCount) {
      dispatch(setTotalGames(gamesCount.length));
    }
  }, [gamesCount, searchValue]);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const items = Array.isArray(games) && games.map((obj) => <GameCard key={obj.id} {...obj} />);
  const skeletons = [...new Array(4)].map((_, index) => <GameCardSkeleton key={index} />);

  return (
    <>
      <div className="main-block">
        <Search />
        {searchValue ? (
          <h3 className="search-results">
            Search results for the query: <span>{searchValue}</span>
          </h3>
        ) : null}
        <div className="cards">{isError ? <Empty /> : isFetching ? skeletons : items}</div>
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={onChangePage}
        totalGames={!isError ? totalGames : 0}
        pageSize={4}
      />
    </>
  );
};
