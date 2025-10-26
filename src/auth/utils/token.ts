const KEY = "token";

export const getToken = (): string | null => localStorage.getItem(KEY);
export const setAuthToken = (token: string): void =>
  localStorage.setItem(KEY, token);
export const removeToken = (): void => localStorage.removeItem(KEY);
