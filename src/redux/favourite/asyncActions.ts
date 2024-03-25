import { db } from '../../firebase';
import { likedGame } from './slice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  deleteDoc,
  getDocs,
} from 'firebase/firestore';

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
    return { gameId: likedGame.gameId, title: likedGame.title, imageUrl: likedGame.imageUrl };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return { gameId: data.gameId, title: data.title, imageUrl: data.imageUrl };
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

    const timestamp = { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 };
    await addDoc(userLikedGamesRef, { gameId, title, imageUrl, timestamp });

    return { gameId, title, imageUrl };
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
