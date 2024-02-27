import { fetchGames } from './asyncActions';
import { GameSliceState, Status } from './types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: GameSliceState = {
  items: [],
  status: Status.LOADING,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
      if (action.payload.length === 0) {
        state.status = Status.ERROR;
      }
    });
    builder.addCase(fetchGames.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export default gameSlice.reducer;
