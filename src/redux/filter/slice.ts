import { filterSliceState } from './types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: filterSliceState = {
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
