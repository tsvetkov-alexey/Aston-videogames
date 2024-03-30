import { db } from '../../firebase';
import { RootState } from '../store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

export type likedGame = {
  gameId: string;
  title: string;
  imageUrl: string;
  timestamp?: { seconds: number };
};

type AddFavouriteGameParams = {
  gameId: string;
  title: string;
  imageUrl: string;
  userId: string;
};

type RemoveFavouriteGameParams = {
  gameId: string;
  userId: string;
};

const likedGameConverter: FirestoreDataConverter<likedGame> = {
  toFirestore: (likedGame: likedGame) => {
    return {
      gameId: likedGame.gameId,
      title: likedGame.title,
      imageUrl: likedGame.imageUrl,
      timestamp: likedGame.timestamp,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return {
      gameId: data.gameId,
      title: data.title,
      imageUrl: data.imageUrl,
      timestamp: data.timestamp,
    };
  },
};

export const fetchFavouriteGames = createAsyncThunk(
  'favourite/fetchFavouriteGames',
  async (userId: string) => {
    const userLikedGamesRef = collection(db, 'users', userId, 'likedGames').withConverter(
      likedGameConverter,
    );
    const querySnapshot = await getDocs(userLikedGamesRef);
    const favouriteGames = querySnapshot.docs.map((doc) => doc.data());

    return favouriteGames;
  },
);

export const addFavouriteGame = createAsyncThunk(
  'favourite/addFavouriteGame',
  async (params: AddFavouriteGameParams) => {
    const { gameId, title, imageUrl, userId } = params;
    const userLikedGamesRef = collection(db, 'users', userId, 'likedGames').withConverter(
      likedGameConverter,
    );

    const timestamp = { seconds: Math.floor(Date.now() / 1000) };
    await addDoc(userLikedGamesRef, { gameId, title, imageUrl, timestamp });

    return { gameId, title, imageUrl, timestamp };
  },
);

export const removeFavouriteGame = createAsyncThunk(
  'favourite/removeFavouriteGame',
  async (params: RemoveFavouriteGameParams) => {
    const { gameId, userId } = params;
    const userLikedGamesRef = collection(db, 'users', userId, 'likedGames').withConverter(
      likedGameConverter,
    );
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
