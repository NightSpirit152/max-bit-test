import { useEffect, useState } from "react";
import { apiGet } from "../../../../api";
import type { TMovie, TSession } from "../../../../api/types.ts";
import { notification } from "antd";
import { groupCinemaSessions } from "../utils/groupCinemaSessions.ts";

export const useCinemaSessions = ({ id }: { id?: string | null }) => {
  const [sessions, setSessions] = useState<TSession[]>([]);
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<TSession[]>(`/cinemas/${id}/sessions`)
      .then(setSessions)
      .catch((e) =>
        notification.error({ message: e.message, description: e.description }),
      )
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    apiGet<TMovie[]>(`/movies`)
      .then(setMovies)
      .catch((e) =>
        notification.error({ message: e.message, description: e.description }),
      )
      .finally(() => setLoading(false));
  }, []);

  return {
    sessions: groupCinemaSessions({ sessions, movies }),
    loading,
  };
};
