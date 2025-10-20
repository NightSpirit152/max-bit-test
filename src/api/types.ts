export type TMovie = {
  id: number;
  title: string;
  year: number;
  rating: number;
  posterImage: string;
  lengthMinutes: number;
  description: string;
};

export type TSession = {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
};

export type TCinema = {
  id: number;
  name: string;
  address: string;
};
