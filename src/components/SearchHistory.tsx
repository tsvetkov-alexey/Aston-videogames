import close from '../assets/img/close.png';
import { useAuth } from '../hooks/useAuth';
import { setSearchValue } from '../redux/filter/slice';
import { HistoryQueryParams, removeHistoryQuery } from '../redux/history/slice';
import { useAppDispatch } from '../redux/store';
import { MiniLoader } from './UI/MiniLoader';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const SearchHistory = ({ searchTitle, timestamp }: HistoryQueryParams) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const location = useLocation();
  const { id: userId } = useAuth();

  const titleHandler = () => {
    const params = new URLSearchParams(location.search);
    params.set('title', searchTitle);
    navigate({ pathname: '/', search: params.toString() });
    dispatch(setSearchValue(searchTitle));
  };
  const removeHandler = () => {
    setIsProcessing(true);
    if (userId) {
      dispatch(removeHistoryQuery({ searchTitle, userId, timestamp }))
        .then(() => setIsProcessing(false))
        .catch((error) => alert(`Error occurred while removing game: ${error}`));
    }
  };

  return (
    <div className="history__info__block">
      <div className="wrapper">
        <span onClick={titleHandler}>{searchTitle}</span>
      </div>

      {isProcessing ? (
        <div className="loaderPosition">
          <MiniLoader />
        </div>
      ) : (
        <img src={close} alt="close" className="close" onClick={removeHandler} />
      )}
    </div>
  );
};
