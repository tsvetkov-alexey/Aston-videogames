import { Game, suggestedGame } from '../redux/users/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://65df3541ff5e305f32a1bd83.mockapi.io' }),
  endpoints: (build) => ({
    fetchAllGames: build.query<Game, { page?: number; limit?: number; title?: string }>({
      query: ({ page = 1, limit = 4, title = '' }) => ({
        url: 'games',
        params: {
          page,
          limit,
          title,
        },
      }),
    }),
    fetchGameById: build.query<Game, string>({
      query: (id) => ({
        url: `games/${id}`,
      }),
    }),
    fetchGameTitle: build.query<suggestedGame[], string>({
      query: (title) => ({
        url: `games/?title=${encodeURIComponent(title)}`,
      }),
      transformResponse: (response: suggestedGame[]) =>
        response.map((game) => ({
          id: game.id,
          title: game.title,
        })),
    }),
  }),
});
