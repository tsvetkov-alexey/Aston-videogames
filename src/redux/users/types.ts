export interface userSliceState {
  email: string | null;
  token: string | null;
  id: string | null;
}

export type Game = {
  id: string;
  title: string;
  imageUrl: string;
  releaseDate: string;
  genre: string;
  description: string;
  ageRate: number;
};

export type favouriteGame = {
  id: string;
  title: string;
  imageUrl: string;
};

export interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}
