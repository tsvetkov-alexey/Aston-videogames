import searchIcon from '../assets/img/search-icon.png';
import { selectFilter } from '../redux/filter/selectors';
import { setSearchValue, setSuggestionTitle } from '../redux/filter/slice';
import { useAppDispatch } from '../redux/store';
import { gameApi } from '../services/GameService';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

export const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const { suggestionTitle } = useSelector(selectFilter);
  const [searchParams, setSearchParams] = useSearchParams();

  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const updateSuggestionTitle = useCallback(
    debounce((str) => {
      dispatch(setSuggestionTitle(str));
    }, 300),
    [],
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const titleParam = params.get('title');
    if (titleParam) {
      setValue(titleParam);
      dispatch(setSearchValue(titleParam));
    } else {
      setValue('');
    }
  }, [searchParams]);

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSuggestionTitle(e.target.value);
    setSuggestionsVisible(true);
  };

  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setSearchValue(value));
    setSuggestionsVisible(false);
    setSearchParams({ title: value });
  };

  const { data: title } = gameApi.useFetchGameTitleQuery(suggestionTitle);

  return (
    <form className="search">
      <input
        type="text"
        placeholder="Type in smth..."
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
      />
      <img src={searchIcon} alt="searchIcon" />
      <button onClick={buttonHandler}>Search</button>
      <div
        className="dropdown-block"
        style={{ display: value && suggestionsVisible ? 'block' : 'none' }}>
        {value &&
          suggestionsVisible &&
          title &&
          Array.isArray(title) &&
          title.slice(0, 7).map((item) => (
            <Link to={`/${item.id}`} key={item.id}>
              <p>{item.title}</p>
            </Link>
          ))}
      </div>
    </form>
  );
};
