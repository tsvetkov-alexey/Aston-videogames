import { Game } from '../redux/games/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://65df3541ff5e305f32a1bd83.mockapi.io' }),
  endpoints: (build) => ({
    fetchAllGames: build.query<Game, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 4 }) => ({
        url: '/games',
        params: {
          page,
          limit,
        },
      }),
    }),
    fetchGameById: build.query<Game, string>({
      query: (id) => ({
        url: `games/${id}`,
      }),
    }),
  }),
});
