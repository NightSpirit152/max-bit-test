import type { TAppRoute } from "../types";
import { flatMapDeep } from "lodash";

export const getAllRoutes = (routes: TAppRoute[]) => {
  return flatMapDeep(routes, (route) => [route, ...(route.children || [])]);
};
