import { db } from '../../firebase';
import { RootState } from '../store';
import { createSlice } from '@reduxjs/toolkit';
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

export type HistoryQueryParams = {
  searchTitle: string;
  timestamp: { seconds: number };
};

type HistoryActionParams = {
  searchTitle: string;
  userId: string;
  timestamp?: { seconds: number };
};

const HistoryQueryConverter: FirestoreDataConverter<HistoryQueryParams> = {
  toFirestore: (history: HistoryQueryParams) => {
    return { searchTitle: history.searchTitle, timestamp: history.timestamp };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return { searchTitle: data.searchTitle, timestamp: data.timestamp };
  },
};

export const fetchHistoryQuery = createAsyncThunk(
  'history/fetchHistoryQuery',
  async (userId: string) => {
    const userHistoryRef = collection(db, 'users', userId, 'history').withConverter(
      HistoryQueryConverter,
    );
    const querySnapshot = await getDocs(userHistoryRef);
    const historyQueries = querySnapshot.docs.map((doc) => doc.data());

    return historyQueries;
  },
);

export const addHistoryQuery = createAsyncThunk(
  'history/addHistoryQuery',
  async (params: HistoryActionParams) => {
    const { searchTitle, userId } = params;
    const userHistoryRef = collection(db, 'users', userId, 'history').withConverter(
      HistoryQueryConverter,
    );

    const timestamp = { seconds: Math.floor(Date.now() / 1000) };
    await addDoc(userHistoryRef, { searchTitle, timestamp });

    return { searchTitle, timestamp };
  },
);

export const removeHistoryQuery = createAsyncThunk(
  'history/removeHistoryQuery',
  async (params: HistoryActionParams) => {
    const { searchTitle, userId, timestamp } = params;
    const userHistoryRef = collection(db, 'users', userId, 'history').withConverter(
      HistoryQueryConverter,
    );

    const querySnapshot = await getDocs(userHistoryRef);
    const historyQueryDocs = querySnapshot.docs.filter(
      (doc) => doc.data().timestamp?.seconds === timestamp?.seconds,
    );

    if (historyQueryDocs.length > 0) {
      await deleteDoc(historyQueryDocs[0].ref);
      return { searchTitle, timestamp };
    } else {
      return null;
    }
  },
);

interface HistoryState {
  history: HistoryQueryParams[];
}

const initialState: HistoryState = {
  history: [],
};

const historyQuerySlice = createSlice({
  name: 'historyQuery',
  initialState,
  reducers: {
    clearHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistoryQuery.fulfilled, (state, action) => {
      state.history = action.payload;
    });
    builder.addCase(addHistoryQuery.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload) {
        const { timestamp } = payload;
        state.history = state.history.filter(
          (history) => history.timestamp?.seconds !== timestamp?.seconds,
        );
        state.history.push(action.payload);
      }
    });
    builder.addCase(removeHistoryQuery.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload) {
        const { timestamp } = payload;
        state.history = state.history.filter(
          (history) => history.timestamp?.seconds !== timestamp?.seconds,
        );
      }
    });
  },
});

export const { clearHistory } = historyQuerySlice.actions;

export const selectHistory = (state: RootState) => state.historyQuery.history;

export default historyQuerySlice.reducer;
