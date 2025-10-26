import { useCallback, useEffect, useMemo, useState } from "react";
import { apiGet } from "../../../../api";
import type { TCinema } from "../../../../api/types.ts";
import type { TableProps } from "antd";
import { notification } from "antd";
import { getCinemasColumns } from "../constants/columns.tsx";
import { useHistory } from "react-router-dom";
import queryString from "query-string";

export const useCinemasTableConfig = (): TableProps<TCinema> => {
  const history = useHistory();
  const [cinemas, setCinemas] = useState<TCinema[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet<TCinema[]>("/cinemas")
      .then(setCinemas)
      .catch((e) =>
        notification.error({ message: e.message, description: e.description }),
      )
      .finally(() => setLoading(false));
  }, []);

  const openCinemaSessions = useCallback(
    (id: number, data: TCinema) => {
      history.push({
        pathname: "/cinemas/cinema",
        search: queryString.stringify({ id }),
        state: { cinema: data },
      });
    },
    [history],
  );

  const config = useMemo(
    () => ({
      columns: getCinemasColumns({ openCinemaSessions }),
      loading,
      dataSource: cinemas,
    }),
    [loading, cinemas, openCinemaSessions],
  );

  return config;
};
