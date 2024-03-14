import { filterSliceState } from './types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: filterSliceState = {
  currentPage: 1,
  searchValue: '',
  suggestionTitle: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSuggestionTitle(state, action: PayloadAction<string>) {
      state.suggestionTitle = action.payload;
    },
  },
});

export const { setCurrentPage, setSearchValue, setSuggestionTitle } = filterSlice.actions;

export default filterSlice.reducer;
