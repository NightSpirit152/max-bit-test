import { describe, it, expect } from "vitest";
import { getAllRoutes } from "../utils/getAllRoutes";
import type { TAppRoute } from "../types";

const mockComp = null;

describe("getAllRoutes", () => {
  it("returns empty array for empty input", () => {
    expect(getAllRoutes([])).toEqual([]);
  });

  it("flattens single level", () => {
    const routes: TAppRoute[] = [
      { url: "/a", title: "A", component: mockComp },
      { url: "/b", title: "B", component: mockComp },
    ];
    expect(getAllRoutes(routes)).toEqual(routes);
  });

  it("flattens nested children", () => {
    const child1: TAppRoute = { url: "/c1", title: "C1", component: mockComp };
    const child2: TAppRoute = { url: "/c2", title: "C2", component: mockComp };
    const parent: TAppRoute = {
      url: "/p",
      title: "P",
      component: mockComp,
      children: [child1, child2],
    };

    const result = getAllRoutes([parent]);
    expect(result).toEqual([parent, child1, child2]);
  });

  it("preserves duplicates if they exist", () => {
    const route: TAppRoute = {
      url: "/same",
      title: "Same",
      component: mockComp,
    };
    const parent: TAppRoute = {
      url: "/parent",
      title: "Parent",
      component: mockComp,
      children: [route],
    };
    const result = getAllRoutes([parent, route]);
    expect(result).toEqual([parent, route, route]);
  });

  it("handles deep nesting", () => {
    const middle: TAppRoute = {
      url: "/mid",
      title: "Mid",
      component: mockComp,
    };
    const top: TAppRoute = {
      url: "/top",
      title: "Top",
      component: mockComp,
      children: [middle],
    };
    expect(getAllRoutes([top])).toEqual([top, middle]);
  });
});
