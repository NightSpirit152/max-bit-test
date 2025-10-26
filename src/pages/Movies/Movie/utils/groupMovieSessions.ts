import type { TCinema, TSession } from "../../../../api/types.ts";
import { groupBy, sortBy, map } from "lodash";
import dayjs from "dayjs";

export const groupMovieSessions = ({
  sessions,
  cinemas,
}: {
  sessions: TSession[];
  cinemas: TCinema[];
}) => {
  const cinemaDict = Object.fromEntries(cinemas.map((c) => [c.id, c.name]));
  const byDate = groupBy(sessions, (s) => dayjs(s.startTime).format("DD.MM"));

  return map(byDate, (dateSessions, date) => {
    const byCinema = groupBy(dateSessions, "cinemaId");

    const cinemas = map(byCinema, (list, cinemaIdStr) => {
      const cinemaId = Number(cinemaIdStr);
      const sessions = sortBy(
        list.map((s) => ({
          id: s.id,
          time: dayjs(s.startTime).format("HH:mm"),
        })),
        "time",
      );

      return {
        cinemaId,
        cinemaName: cinemaDict[cinemaId],
        sessions,
      };
    });

    /* сортировка кинотеатров внутри дня (по имени) */
    return { date, cinemas: sortBy(cinemas, "cinemaName") };
  }).sort((a, b) => a.date.localeCompare(b.date));
};
