import type { TMovie, TSession } from "../../../../api/types.ts";
import { groupBy, sortBy, map } from "lodash";
import dayjs from "dayjs";

export const groupCinemaSessions = ({
  sessions,
  movies,
}: {
  sessions: TSession[];
  movies: TMovie[];
}) => {
  const movieDict = Object.fromEntries(movies.map((m) => [m.id, m.title]));
  const byDate = groupBy(sessions, (s) => dayjs(s.startTime).format("DD.MM"));

  return map(byDate, (dateSessions, date) => {
    const byMovie = groupBy(dateSessions, "movieId");

    const groupMovies = map(byMovie, (list, movieIdStr) => {
      const movieId = Number(movieIdStr);

      const sessions = sortBy(
        list.map((s) => ({
          id: s.id,
          time: dayjs(s.startTime).format("HH:mm"),
        })),
        "time",
      );

      return {
        movieId,
        movieTitle: movieDict[movieId] ?? `Фильм #${movieId}`,
        posterImage: movies?.find((m) => m.id === movieId)?.posterImage,
        sessions,
      };
    });

    return {
      date,
      movies: sortBy(groupMovies, (m) => m.movieTitle),
    };
  }).sort((a, b) => dayjs(a.date, "DD.MM").diff(dayjs(b.date, "DD.MM")));
};
