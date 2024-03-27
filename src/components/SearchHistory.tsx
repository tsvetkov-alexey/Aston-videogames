import close from '../assets/img/close.png';
import { useAuth } from '../hooks/useAuth';
import { setSearchValue } from '../redux/filter/slice';
import { HistoryQueryParams, removeHistoryQuery } from '../redux/history/slice';
import { useAppDispatch } from '../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';

export const SearchHistory = ({ searchTitle, timestamp }: HistoryQueryParams) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const { id: userId } = useAuth();

  const titleHandler = () => {
    const params = new URLSearchParams(location.search);
    params.set('title', searchTitle);
    navigate({ pathname: '/', search: params.toString() });
    dispatch(setSearchValue(searchTitle));
  };

  const removeHandler = () => {
    if (userId) {
      dispatch(removeHistoryQuery({ searchTitle, userId, timestamp }));
    }
  };

  return (
    <div className="history__info__block">
      <div className="wrapper">
        <span onClick={titleHandler}>{searchTitle}</span>
      </div>
      <img src={close} alt="close" className="close" onClick={removeHandler} />
    </div>
  );
};
