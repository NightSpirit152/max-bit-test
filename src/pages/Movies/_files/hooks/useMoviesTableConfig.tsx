import { useCallback, useEffect, useMemo, useState } from "react";
import { apiGet } from "../../../../api";
import type { TMovie } from "../../../../api/types.ts";
import type { TableProps } from "antd";
import { notification } from "antd";
import { getMoviesColumns } from "../constants/columns.tsx";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

export const useMoviesTableConfig = (): TableProps<TMovie> => {
  const history = useHistory();
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<TMovie[]>("/movies")
      .then(setMovies)
      .catch((e) =>
        notification.error({ message: e.message, description: e.description }),
      )
      .finally(() => setLoading(false));
  }, []);

  const openMovieInfo = useCallback(
    (id: number, data: TMovie) => {
      history.push({
        pathname: "/movies/movie",
        search: queryString.stringify({ id }),
        state: { movie: data },
      });
    },
    [history],
  );

  const config = useMemo(
    () => ({
      columns: getMoviesColumns({ openMovieInfo }),
      loading,
      dataSource: movies,
    }),
    [loading, movies, openMovieInfo],
  );

  return config;
};
