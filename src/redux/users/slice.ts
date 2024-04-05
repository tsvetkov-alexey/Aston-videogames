import { RootState } from '../store';
import { userSliceState } from './types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: userSliceState = {
  email: null,
  token: null,
  id: null,
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
  },
});

export const { setUser, removeUser } = userSlice.actions;

export const selectUserData = (state: RootState) => state.user;

export default userSlice.reducer;
