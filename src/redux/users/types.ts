export interface userSliceState {
  email: string | null;
  token: string | null;
  id: string | null;
}

export interface FormProps {
  title: string;
  handleClick: (email: string, password: string) => void;
}
