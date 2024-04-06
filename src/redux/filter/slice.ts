import { RootState } from '../store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface filterSliceState {
  totalGames: number;
  currentPage: number;
  searchValue: string;
  suggestionTitle: string;
  loginLoading: boolean;
  registrationLoading: boolean;
}

const initialState: filterSliceState = {
  totalGames: 0,
  currentPage: 1,
  searchValue: '',
  suggestionTitle: '',
  loginLoading: false,
  registrationLoading: false,
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
    setTotalGames(state, action: PayloadAction<number>) {
      state.totalGames = action.payload;
    },
    setLoginLoading(state, action: PayloadAction<boolean>) {
      state.loginLoading = action.payload;
    },
    setRegistrationLoading(state, action: PayloadAction<boolean>) {
      state.registrationLoading = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setSearchValue,
  setSuggestionTitle,
  setTotalGames,
  setLoginLoading,
  setRegistrationLoading,
} = filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;

export default filterSlice.reducer;
