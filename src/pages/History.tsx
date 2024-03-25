import { Header } from '../components/Header';
import { SearchHistory } from '../components/SearchHistory';

export const History = () => {
  return (
    <>
      <Header />
      <div className="history">
        <h1>Your search queries</h1>
        <div className="history__info">
          <SearchHistory />
          <SearchHistory />
          <SearchHistory />
          <SearchHistory />
          <SearchHistory />
        </div>
      </div>
    </>
  );
};
