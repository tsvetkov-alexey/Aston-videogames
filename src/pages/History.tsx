import { Empty } from '../components/Empty';
import { SearchHistory } from '../components/SearchHistory';
import { selectAllHistories } from '../redux/history/slice';
import { useSelector } from 'react-redux';

export const History = () => {
  const history = useSelector(selectAllHistories);

  if (history.length === 0)
    return (
      <div className="history">
        <h1>Your search queries</h1>
        <Empty />
      </div>
    );

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
      <div className="history">
        <h1>Your search queries</h1>
        <div className="history__info">{historyInfo}</div>
      </div>
    </>
  );
};
