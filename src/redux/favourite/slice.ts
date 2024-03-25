import { RootState } from '../store';
import { addFavouriteGame, fetchFavouriteGames, removeFavouriteGame } from './asyncActions';
import { createSlice } from '@reduxjs/toolkit';

export type likedGame = {
  gameId: string;
  title: string;
  imageUrl: string;
  timestamp?: { seconds: number; nanoseconds: number };
};

interface FavouriteState {
  favouriteGames: likedGame[];
}

const initialState: FavouriteState = {
  favouriteGames: [],
};

const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    clearFavourite: (state) => {
      state.favouriteGames = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFavouriteGames.fulfilled, (state, action) => {
      state.favouriteGames = action.payload;
    });
    builder.addCase(addFavouriteGame.fulfilled, (state, action) => {
      state.favouriteGames.push(action.payload);
    });
    builder.addCase(removeFavouriteGame.fulfilled, (state, action) => {
      state.favouriteGames = state.favouriteGames.filter((game) => game.gameId !== action.payload);
    });
  },
});

export const { clearFavourite } = favouriteSlice.actions;

export const selectFavouriteGames = (state: RootState) => state.favourite.favouriteGames;

export default favouriteSlice.reducer;
