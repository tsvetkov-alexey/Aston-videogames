import { filterSliceState } from '../filter/types';
import { Game } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGames = createAsyncThunk<Game[], filterSliceState>(
  'game/fetchGamesStatus',
  async (params) => {
    const { currentPage } = params;
    const { data } = await axios.get<Game[]>(
      `https://65df3541ff5e305f32a1bd83.mockapi.io/games/?page=${currentPage}&limit=4`,
    );
    return data;
  },
);
