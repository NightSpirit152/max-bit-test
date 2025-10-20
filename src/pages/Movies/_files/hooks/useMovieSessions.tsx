import { useEffect, useState } from "react";
import { apiGet } from "../../../../api";
import type { TCinema, TSession } from "../../../../api/types.ts";
import { notification } from "antd";
import { groupMovieSessions } from "../components/Movie/utils/groupMovieSessions.ts";

export const useMovieSessions = ({ id }: { id?: string | null }) => {
  const [sessions, setSessions] = useState<TSession[]>([]);
  const [cinemas, setCinemas] = useState<TCinema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<TSession[]>(`/movies/${id}/sessions`)
      .then(setSessions)
      .catch((e) =>
        notification.error({ message: e.message, description: e.description }),
      )
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    apiGet<TCinema[]>(`/cinemas`)
      .then(setCinemas)
      .catch((e) =>
        notification.error({ message: e.message, description: e.description }),
      )
      .finally(() => setLoading(false));
  }, []);

  return {
    sessions: groupMovieSessions({ sessions, cinemas }),
    loading,
  };
};
