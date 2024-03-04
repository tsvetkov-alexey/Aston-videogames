import { favouriteGame, userSliceState } from './types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: userSliceState = {
  email: null,
  token: null,
  id: null,
  likedGames: {},
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userSliceState>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
    setLikedGame(state, action: PayloadAction<favouriteGame>) {
      const { id } = action.payload;
      if (id) {
        state.likedGames[id] = action.payload;
      }
    },
    removeLikedGame(state, action: PayloadAction<string>) {
      delete state.likedGames[action.payload];
    },
  },
});

export const { setUser, removeUser, setLikedGame, removeLikedGame } = userSlice.actions;

export default userSlice.reducer;
