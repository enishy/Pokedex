import { describe, expect, test } from "vitest";
import { Cache } from "./pokecache.js";

describe("Cache", () => {
  test("can add and retrieve values", () => {
    const cache = new Cache(1000);

    cache.add("foo", "bar");

    expect(cache.get<string>("foo")).toBe("bar");

    cache.stopReapLoop();
  });

  test("returns undefined for missing keys", () => {
    const cache = new Cache(1000);

    expect(cache.get<string>("missing")).toBeUndefined();

    cache.stopReapLoop();
  });

  test("reaps expired entries", async () => {
    const cache = new Cache(50);

    cache.add("foo", "bar");

    expect(cache.get<string>("foo")).toBe("bar");

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(cache.get<string>("foo")).toBeUndefined();

    cache.stopReapLoop();
  });
});
