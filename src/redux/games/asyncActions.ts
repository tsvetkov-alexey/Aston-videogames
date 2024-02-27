import { Game } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGames = createAsyncThunk<Game[]>('game/fetchGamesStatus', async () => {
  const { data } = await axios.get<Game[]>('https://81a99b1e3f23d819.mokky.dev/videogames');

  return data;
});
