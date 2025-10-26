import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiGet, apiPost } from "../index";
import type { TLoginResponse, TMovie } from "../types.ts";

// мокаем токен
vi.mock("../../auth/utils/token", () => ({
  getToken: vi.fn(() => "test-jwt"),
}));

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("API module", () => {
  beforeEach(() => mockFetch.mockReset());

  describe("apiGet", () => {
    it("returns parsed JSON on 200", async () => {
      const movies: TMovie[] = [
        {
          id: 1,
          title: "T",
          year: 2000,
          rating: 9,
          posterImage: "img",
          lengthMinutes: 120,
          description: "d",
        },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => movies,
      } as Response);

      const res = await apiGet<TMovie[]>("/movies");
      expect(res).toEqual(movies);
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3022/movies", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-jwt",
        },
      });
    });

    it("throws on non-ok response", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      } as Response);

      await expect(apiGet("/wrong")).rejects.toThrow("API 404 Not Found");
    });
  });

  describe("apiPost", () => {
    it("sends body and returns JSON", async () => {
      const body = { username: "u", password: "p" };
      const resp: TLoginResponse = { token: "jwt", message: "ok" };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => JSON.stringify(resp),
      } as Response);

      const res = await apiPost<typeof body, TLoginResponse>("/login", body);
      expect(res).toEqual(resp);
      expect(mockFetch).toHaveBeenCalledWith("http://localhost:3022/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer test-jwt",
        },
        body: JSON.stringify(body),
      });
    });

    it("returns null on empty body", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => "",
      } as Response);

      const res = await apiPost("/register");
      expect(res).toBeNull();
    });
  });
});
