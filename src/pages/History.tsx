import { Empty } from '../components/Empty';
import { Header } from '../components/Header';
import { SearchHistory } from '../components/SearchHistory';
import { selectAllHistories } from '../redux/history/slice';
import { useSelector } from 'react-redux';

export const History = () => {
  const history = useSelector(selectAllHistories);

  // if (history.length === 0) return <Empty />;

  const sortedHistory = history
    ? history.concat().sort((a, b) => {
        if (a.timestamp && b.timestamp) {
          return a.timestamp.seconds - b.timestamp.seconds;
        }
        return 0;
      })
    : null;

  const historyInfo =
    sortedHistory && sortedHistory.map((obj, i) => <SearchHistory key={i} {...obj} />);

  return (
    <>
      <Header />
      <div className="history">
        <h1>Your search queries</h1>
        {history && history.length > 0 ? (
          <div className="history__info">{historyInfo}</div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};
