import type { TAppRoute } from "../../complex/AppRouter/types";
import { Suspense } from "../../complex/AppRouter/components/Suspense.tsx";
import Movies from "./index.tsx";
import { MOVIE_INFO_ROUTES } from "./Movie/routes.tsx";

export const MOVIES_ROUTES: TAppRoute = {
  url: "/movies",
  title: "Фильмы",
  children: [MOVIE_INFO_ROUTES],
  component: (
    <Suspense>
      <Movies />
    </Suspense>
  ),
};
