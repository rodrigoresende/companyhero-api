import { expect, test, describe } from "vitest";
import RecommendationService from "./index";

const recommendation = new RecommendationService();

describe("RecommendationService", async () => {
  test("Should - return valid response", async () => {
    const list = await recommendation.get("São Paulo");
    expect(list?.city).toBeDefined();
  });

  test("Should - return invalid response", async () => {
    expect(
      async () => await recommendation.get("Tremmm")
    ).rejects.toThrowError();
  });
});
