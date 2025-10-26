export const getPosterPath = (path?: string) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  return `${apiUrl}${path}`;
};

export const getMovieDuration = (lengthMinutes: number) => {
  const hours = Math.floor(lengthMinutes / 60);
  const minutes = lengthMinutes % 60;

  return `${hours}:${minutes}`;
};
