import { useCallback, useEffect, useState } from "react";
import type {
  TBookingInput,
  TBookingResponse,
  TCinema,
  TMovie,
  TSessionInfo,
} from "../../../../api/types.ts";
import { apiGet, apiPost } from "../../../../api";
import { isNil } from "lodash";
import type { TSelectedSeats } from "../types/types.ts";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../../auth/hooks/useAuth.ts";

export const useBookingInfo = (id: string | null) => {
  const history = useHistory();
  const { isAuth } = useAuth();
  const [sessionInfo, setSessionInfo] = useState<TSessionInfo>();
  const [movie, setMovie] = useState<TMovie>();
  const [cinema, setCinema] = useState<TCinema>();
  const [loading, setLoading] = useState<boolean>();
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    apiGet<TSessionInfo>(`/movieSessions/${id}`)
      .then(setSessionInfo)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!isNil(sessionInfo)) {
      apiGet<TMovie[]>(`/movies`)
        .then((res) =>
          setMovie(res?.find((m) => m.id === sessionInfo?.movieId)),
        )
        .finally(() => setLoading(false));
    }
  }, [sessionInfo]);

  useEffect(() => {
    if (!isNil(sessionInfo)) {
      apiGet<TCinema[]>(`/cinemas`)
        .then((res) =>
          setCinema(res?.find((m) => m.id === sessionInfo?.cinemaId)),
        )
        .finally(() => setLoading(false));
    }
  }, [sessionInfo]);

  const handleBookSeats = useCallback(
    (selected: TSelectedSeats[]) => {
      if (!isAuth) {
        history.push({
          pathname: "/login",
        });
      }

      const seatsToBook = {
        seats: selected?.map((s) => ({
          rowNumber: s?.row,
          seatNumber: s?.seat,
        })),
      };

      apiPost<TBookingInput, TBookingResponse>(
        `/movieSessions/${id}/bookings`,
        seatsToBook,
      ).then((res) => {
        if (res?.message) {
          const newErrors = [];
          newErrors.push(res.message);

          setErrors(newErrors);
        } else {
          history.push({
            pathname: "/my-tickets",
          });
        }
      });
    },
    [isAuth],
  );

  return { sessionInfo, movie, cinema, handleBookSeats, errors, loading };
};
