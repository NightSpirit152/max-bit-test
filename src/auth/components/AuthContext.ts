import { createContext } from "react";
import type { TAuthContext } from "../types/types.ts";
import { noop } from "lodash";

const DEFAULT_VALUE: TAuthContext = {
  token: null,
  login: noop,
  logout: noop,
  isAuth: false,
};

export const AuthContext = createContext<TAuthContext>(DEFAULT_VALUE);
