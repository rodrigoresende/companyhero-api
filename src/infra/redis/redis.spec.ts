import { expect, test, describe } from "vitest";
import { RedisClient } from "@/infra";

const redis = new RedisClient();

describe("Redis", async () => {
  test("redis - set", async () => {
    const cache = await redis.set("test", "test");
    expect(cache).toBeDefined();
  });

  test("redis - get", async () => {
    const cache = await redis.get("test");
    expect(cache).toBe("test");
  });
});
