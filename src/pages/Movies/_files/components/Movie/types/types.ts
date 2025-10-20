export type TMovieSessions = {
  cinemaId: number;
  cinemaName: string;
  sessions: { id: number; time: string }[];
};
