import type { TBookedSeat } from "../../../../api/types.ts";

export type TTicketInfo = {
  id: string;
  movieName: string;
  cinemaName: string;
  startTime: string;
  bookedAt: string;
  isPaid: boolean;
  seats: TBookedSeat[];
};
