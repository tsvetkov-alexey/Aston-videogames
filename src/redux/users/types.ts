export interface userSliceState {
  email: string | null;
  token: string | null;
  id: string | null;
  likedGames: Record<string, favouriteGame>;
}

export type favouriteGame = {
  id: number;
  title: string;
  imageUrl: string;
};

export interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}
