import type { TAppRoute } from "../../complex/AppRouter/types";
import { Suspense } from "../../complex/AppRouter/components/Suspense.tsx";
import Movies from "./index.tsx";
import { Movie } from "./_files/components/Movie/Movie.tsx";

export const MOVIES_ROUTES: TAppRoute = {
  url: "/movies",
  title: "Фильмы",
  component: (
    <Suspense>
      <Movies />
    </Suspense>
  ),
};

export const MOVIE_INFO_ROUTES: TAppRoute = {
  url: `${MOVIES_ROUTES.url}/movie`,
  title: "Фильм",
  component: (
    <Suspense>
      <Movie />
    </Suspense>
  ),
};
