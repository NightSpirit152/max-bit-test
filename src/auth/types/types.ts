export type TAuthContext = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuth: boolean;
};
