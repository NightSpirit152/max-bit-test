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

export type TLoginInput = {
  username: string;
  password: string;
};

export type TRegistrationInput = {
  username: string;
  password: string;
  _confirmPassword?: string;
};

export type TBookingInput = {
  seats: TBookedSeat[];
};

export type TPaymentInput = {
  bookingId: string;
};

export type TDefaultResponse = {
  message?: string;
  error?: string;
};

export type TLoginResponse = TDefaultResponse & {
  token: string;
};

export type TBookingResponse = TDefaultResponse & {
  bookingId: string;
};

export type TBookedSeat = {
  rowNumber: number;
  seatNumber: number;
};

export type TSessionInfo = {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
  seats: {
    rows: number;
    seatsPerRow: number;
  };
  bookedSeats: TBookedSeat[];
};

export type TBookingInfo = {
  id: string;
  userId: number;
  movieSessionId: number;
  sessionId: number;
  bookedAt: string;
  seats: TBookedSeat[];
  isPaid: boolean;
};
