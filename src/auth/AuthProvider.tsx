import { type FC, type PropsWithChildren, useMemo, useState } from "react";
import { getToken, removeToken, setAuthToken } from "./utils/token.ts";
import type { TAuthContext } from "./types/types.ts";
import { AuthContext } from "./components/AuthContext.ts";
import { isNil } from "lodash";

export const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getToken);
  const [isAuth, setIsAuth] = useState<boolean>(!isNil(token));

  const login = (token: string) => {
    setAuthToken(token);
    setToken(token);
    setIsAuth(true);
  };

  const logout = () => {
    removeToken();
    setToken(null);
    setIsAuth(false);
  };

  const context = useMemo<TAuthContext>(
    () => ({
      token,
      isAuth,
      login,
      logout,
    }),
    [isAuth, token],
  );

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
