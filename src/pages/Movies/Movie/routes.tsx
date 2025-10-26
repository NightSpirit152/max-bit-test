import type { TAppRoute } from "../../../complex/AppRouter/types";
import { Suspense } from "../../../complex/AppRouter/components/Suspense.tsx";
import { Movie } from "./Movie.tsx";

export const MOVIE_INFO_ROUTES: TAppRoute = {
  url: `/movies/movie`,
  title: "Фильм",
  component: (
    <Suspense>
      <Movie />
    </Suspense>
  ),
};
