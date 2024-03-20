import { db } from '../../firebase';
import { RootState } from '../store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDoc, collection, deleteDoc, getDocs } from 'firebase/firestore';

export type likedGame = {
  gameId: string;
  title: string;
  imageUrl: string;
  timestamp?: { seconds: number; nanoseconds: number };
};

export type AddFavouriteGameParams = {
  gameId: string;
  title: string;
  imageUrl: string;
  userId: string;
};

export type RemoveFavouriteGameParams = {
  gameId: string;
  userId: string;
};

interface FavouriteState {
  favouriteGames: likedGame[];
}

const initialState: FavouriteState = {
  favouriteGames: [],
};

export const fetchFavouriteGames = createAsyncThunk(
  'favourite/fetchFavouriteGames',
  async (userId: string) => {
    const userLikedGamesRef = collection(db, 'users', userId, 'likedGames');
    const querySnapshot = await getDocs(userLikedGamesRef);

    const favouriteGames = querySnapshot.docs.map((doc) => {
      const data = doc.data() as likedGame; // Иначе не получилось типизировать
      return {
        id: doc.id,
        gameId: data.gameId,
        title: data.title,
        imageUrl: data.imageUrl,
      };
    });

    return favouriteGames;
  },
);

export const addFavouriteGame = createAsyncThunk(
  'favourite/addFavouriteGame',
  async (params: AddFavouriteGameParams) => {
    const { gameId, title, imageUrl, userId } = params;
    const userLikedGamesRef = collection(db, 'users', userId, 'likedGames');

    const timestamp = new Date();
    await addDoc(userLikedGamesRef, { gameId, title, imageUrl, timestamp });

    return { gameId, title, imageUrl };
  },
);

export const removeFavouriteGame = createAsyncThunk(
  'favourite/removeFavouriteGame',
  async (params: RemoveFavouriteGameParams) => {
    const { gameId, userId } = params;
    const userLikedGamesRef = collection(db, 'users', userId, 'likedGames');
    const querySnapshot = await getDocs(userLikedGamesRef);
    const likedGameDoc = querySnapshot.docs.find((doc) => doc.data().gameId === gameId);

    if (likedGameDoc) {
      await deleteDoc(likedGameDoc.ref);
      return gameId;
    } else {
      return null;
    }
  },
);

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
