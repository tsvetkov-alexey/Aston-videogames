export type Game = {
  id: number;
  title: string;
  imageUrl: string;
  releaseDate: string;
  genre: string;
  description: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface GameSliceState {
  items: Game[];
  status: Status;
}
