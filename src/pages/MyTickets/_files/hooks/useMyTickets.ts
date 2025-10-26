import { useCallback, useEffect, useState } from "react";
import { clone } from "lodash";
import type {
  TBookingInfo,
  TCinema,
  TDefaultResponse,
  TMovie,
  TPaymentInput,
  TSessionInfo,
} from "../../../../api/types.ts";
import { apiGet, apiPost } from "../../../../api";
import type { TTicketInfo } from "../types/types.ts";
import { useAuth } from "../../../../auth/hooks/useAuth.ts";
import { useHistory } from "react-router-dom";

export const useMyTickets = () => {
  const history = useHistory();
  const { isAuth } = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingInfo, setBookingInfo] = useState<TBookingInfo[]>();
  const [movies, setMovies] = useState<TMovie[]>();
  const [cinemas, setCinemas] = useState<TCinema[]>();
  const [tickets, setTickets] = useState<TTicketInfo[]>([]);

  useEffect(() => {
    if (!isAuth) {
      history.push({
        pathname: "/login",
      });
    }
  }, [isAuth]);

  useEffect(() => {
    apiGet<TBookingInfo[]>("/me/bookings")
      .then(setBookingInfo)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (bookingInfo && bookingInfo.length > 0) {
      apiGet<TMovie[]>("/movies")
        .then(setMovies)
        .finally(() => setLoading(false));
    }
  }, [bookingInfo]);

  useEffect(() => {
    if (bookingInfo && bookingInfo.length > 0) {
      apiGet<TCinema[]>("/cinemas")
        .then(setCinemas)
        .finally(() => setLoading(false));
    }
  }, [bookingInfo]);

  useEffect(() => {
    if (bookingInfo && bookingInfo.length > 0 && movies && cinemas) {
      bookingInfo?.map((info) => {
        apiGet<TSessionInfo>(`/movieSessions/${info?.movieSessionId}`).then(
          (session) => {
            const newTickets = clone(tickets);

            const movie = movies?.find(
              (m) => m?.id === session?.movieId,
            ) as TMovie;
            const cinema = cinemas?.find(
              (c) => c?.id === session?.cinemaId,
            ) as TCinema;

            if (!newTickets.some((t) => t?.id === info?.id)) {
              newTickets.push({
                id: info?.id,
                movieName: movie?.title,
                cinemaName: cinema?.name,
                bookedAt: info?.bookedAt,
                startTime: session?.startTime,
                seats: info?.seats,
                isPaid: info?.isPaid,
              });

              setTickets(newTickets);
            }
          },
        );
      });
    }
  }, [bookingInfo, movies, cinemas, tickets]);

  const handlePay = useCallback((id: string) => {
    apiPost<TPaymentInput, TDefaultResponse>(`/bookings/${id}/payments`).then(
      () => window.location.reload(),
    );
  }, []);

  return { tickets, handlePay, loading };
};
