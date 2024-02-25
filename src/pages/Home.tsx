import React from 'react';
import { Header } from '../components/Header';
import { Search } from '../components/Search';
import { GameCard } from '../components/GameCard';
// import { GameCardSkeleton } from '../components/GameCardSkeleton';

export const Home: React.FC = () => {
  return (
    <>
      <Header></Header>
      <div className="main-block">
        <Search />
        <div className="cards">
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          {/* <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton />
          <GameCardSkeleton /> */}
        </div>
      </div>
    </>
  );
};
