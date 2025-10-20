import type { TCinema, TSession } from "../../../../../../api/types.ts";
import { groupBy, sortBy, find } from "lodash";
import dayjs from "dayjs";

export const groupMovieSessions = ({
  sessions,
  cinemas,
}: {
  sessions: TSession[];
  cinemas: TCinema[];
}) => {
  const groups = groupBy(sessions, "cinemaId");

  return Object.entries(groups).map(([cinemaIdStr, list]) => {
    const cinemaId = Number(cinemaIdStr);
    const timesSorted = sortBy(
      list.map((s) => ({
        id: s.id,
        time: dayjs(s.startTime).format("DD.MM, HH:mm"),
      })),
      "time",
    );

    return {
      cinemaId,
      cinemaName: find(cinemas, (cinema) => cinema.id === cinemaId)?.name,
      times: timesSorted,
    };
  });
};
