import { db } from '../../firebase';
import { RootState } from '../store';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
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

const historyAdapter = createEntityAdapter({
  selectId: (history: HistoryQueryParams) => history.timestamp.seconds.toString(),
  sortComparer: (a, b) => a.timestamp.seconds - b.timestamp.seconds,
});

const historySearchSlice = createSlice({
  name: 'historySearch',
  initialState: historyAdapter.getInitialState(),
  reducers: {
    addHistory: historyAdapter.addOne,
    removeHistory: historyAdapter.removeOne,
    clearHistory: historyAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHistoryQuery.fulfilled, (state, action) => {
      historyAdapter.setAll(state, action.payload);
    });
    builder.addCase(addHistoryQuery.fulfilled, (state, action) => {
      historyAdapter.addOne(state, action.payload);
    });
    builder.addCase(removeHistoryQuery.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload && payload.timestamp !== undefined) {
        historyAdapter.removeOne(state, payload.timestamp.seconds.toString());
      }
    });
  },
});

export const { clearHistory } = historySearchSlice.actions;

export const {
  selectAll: selectAllHistories,
  selectById: selectHistoryById,
  selectIds: selectHistoryIds,
} = historyAdapter.getSelectors((state: RootState) => state.historySearch);

export default historySearchSlice.reducer;
