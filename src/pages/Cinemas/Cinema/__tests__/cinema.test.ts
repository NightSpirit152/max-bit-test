import { describe, it, expect } from "vitest";
import { groupCinemaSessions } from "../utils/groupCinemaSessions";
import type { TMovie, TSession } from "../../../../api/types";

const movies: TMovie[] = [
  {
    id: 1,
    title: "A",
    year: 2020,
    rating: 8,
    posterImage: "a.jpg",
    lengthMinutes: 100,
    description: "",
  },
  {
    id: 2,
    title: "B",
    year: 2021,
    rating: 7,
    posterImage: "b.jpg",
    lengthMinutes: 110,
    description: "",
  },
];

describe("groupCinemaSessions", () => {
  it("returns empty array when no sessions", () => {
    const res = groupCinemaSessions({ sessions: [], movies });
    expect(res).toEqual([]);
  });

  it("groups by date then movie, sorts times & dates", () => {
    const sessions: TSession[] = [
      // 22.10
      { id: 1, movieId: 1, cinemaId: 1, startTime: "2025-10-22T21:00:00Z" },
      { id: 2, movieId: 1, cinemaId: 1, startTime: "2025-10-22T18:00:00Z" },
      // 23.10
      { id: 3, movieId: 2, cinemaId: 1, startTime: "2025-10-23T15:00:00Z" },
      { id: 4, movieId: 1, cinemaId: 1, startTime: "2025-10-23T17:00:00Z" },
    ];

    const grouped = groupCinemaSessions({ sessions, movies });

    console.log(grouped);

    expect(grouped).toHaveLength(2);
    expect(grouped[0].date).toBe("23.10");
    expect(grouped[1].date).toBe("22.10");

    const day22 = grouped[1];
    expect(day22.movies).toHaveLength(1);
    expect(day22.movies[0].movieTitle).toBe("A");
    expect(day22.movies[0].posterImage).toBe("a.jpg");
    expect(day22.movies[0].sessions.map((s) => s.time)).toEqual(["21:00"]);

    const day23 = grouped[0];
    expect(day23.movies.map((m) => m.movieTitle)).toEqual(["A", "B"]);
  });

  it("handles unknown movieId", () => {
    const sessions: TSession[] = [
      { id: 1, movieId: 999, cinemaId: 1, startTime: "2025-10-22T12:00:00Z" },
    ];
    const res = groupCinemaSessions({ sessions, movies });
    expect(res[0].movies[0].movieTitle).toBe("Фильм #999");
    expect(res[0].movies[0].posterImage).toBeUndefined();
  });
});
